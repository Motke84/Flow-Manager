import { LitElement, html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

// This element is connected to the Redux store.
import { store } from '../store.js';


import { SharedStyleSuAll } from './styles/shared-styles-su-all';
import * as joint from 'jointjs';

//import * as  $  from '../../node_modules/jquery'; 

class InnerGraph extends connect(store)(LitElement) {


    firstUpdated() {

        this.isEditMode = false;
        try {
            const graph = new joint.dia.Graph;
            this.graph = graph;

            const paper = new joint.dia.Paper({
                el: this.shadowRoot.getElementById('myholder'),
                model: graph,
                width: this.width,
                height: this.height,
                gridSize: 50,
                drawGrid: {
                    name: 'mesh',
                    args:
                        { color: 'white', thickness: 1 } // settings for the primary mesh
                }
            });


            this.paper = paper;

            this.paper.setInteractivity({ elementMove: false });
            paper.drawGrid(false);


            paper.on('cell:pointerdown',
                (cellView, evt, x, y) => {

                    if (this.isEditMode)
                        return;

                    var shape = this.graph.getCell(cellView.model.id);

                    console.log(shape.id, shape.exception);

                    this.selectedShape =
                        {
                            id: shape.id,
                            name: shape.attributes.attrs.label.text,
                            exception: shape.exception
                        };

                    this.dispatchEvent(new CustomEvent('onShapeSelected', { detail: { selectedShape: this.selectedShape } }));
                }
            );
        }
        catch (err) {

        }

    }

    render() {

        return html`
  
    ${SharedStyleSuAll}
    
    <div>
        <div class="ui segment ${this.activateLoader(this.isGraphLoading())} " style="overflow: overlay;">
            <div id="myholder"></div>
        </div>
    </div>
    `;
    }

    activateLoader(isLoading) {
        return isLoading ? 'loading disabled' : '';
    }


    static get properties() {
        return {
            graphItems: { type: Object },
            graph: { type: Object },
            paper: { type: Object },
            graphLoading: { type: Boolean, },
            selectedShape: { type: Object },
            width: { type: Number },
            height: { type: Number },
            isEditMode: { type: Boolean },
            statusColors: { type: Object }
        }
    }




    isGraphLoading() {
        if (this.graphLoading)
            return true;
    }


    onSave() {

        var elem = this.graph.getElements().map((e) => {
            return {
                title: e.attributes.attrs.label.text,
                type: e.attributes.type == 'standard.Rectangle' ? 'action' : 'event',
                posX: e.attributes.position.x,
                posY: e.attributes.position.y,
                id: +e.attributes.id,
                status: e.status
            };
        });


        var lnks = this.graph.getLinks().map((e) => {
            return {
                source: +e.attributes.source.id,
                destination: +e.attributes.target.id
            };
        });

        var newGraphItems = {
            nodes: elem,
            connections: lnks
        };


        setTimeout(() => {
            this.graph.clear();
            this.graphItems = undefined;
            this.dispatchEvent(new CustomEvent('onSaveReady', { detail: { newGraphItems } }));
        }, 1);

    }

    // This is called every time something is updated in the store.
    stateChanged(state) {

        this.graphLoading = state.graphReducer.isGraphLoading;
        //   this.isSaveMode = state.graphReducer.isSaveMode;

        if (!this.graph || !this.paper)
            return;

        if (this.isSaveMode != state.graphReducer.isSaveMode) {
            this.isSaveMode = state.graphReducer.isSaveMode;
            if (this.isSaveMode) {
                this.onSave();
            }
        }


        if (this.isEditMode != state.graphReducer.isEditMode) {

            this.isEditMode = state.graphReducer.isEditMode;
            if (this.isEditMode) {
                this.paper.drawGrid({ color: 'gray' });
                this.paper.setInteractivity({ elementMove: true })
            }
            else {
                this.paper.drawGrid({ color: 'white' });
                this.paper.setInteractivity({ elementMove: false });
            }

            return;
        }


        const graphItems = state.graphReducer.graphItems;

        if (JSON.stringify(graphItems) === JSON.stringify(this.graphItems))
            return;

        this.graph.clear();

        this.graphItems = state.graphReducer.graphItems;


        if (!this.graphItems || !this.graphItems.nodes || !this.graphItems.connections) {
            return;
        }

        this.graphItems.nodes.forEach((elem) => {
            const rect = this.createNode(elem);
            rect.addTo(this.graph);
        });

        const elems = this.graph.getElements();

        this.graphItems.connections.forEach((con) => {
            const link = this.createLink(con, elems);
            link.addTo(this.graph);
        });
    }


    createNode(elem) {

        const shape = elem.type == 'event' ?
            new joint.shapes.standard.Path() :
            new joint.shapes.standard.Rectangle()


        const size = elem.title.length;


        shape.tagName = 'rect'

        shape.attributes.id = elem.id.toString();
        shape.position(+elem.posX, +elem.posY);

        shape.resize(280, 40);
        shape.attr({
            body: {
                fill: this.getColor(elem.status), //elem.type == 'event' ? '#218545' : '#2185d0',
                refD: 'M 150 150 Q 50 150 50 250 Q 50 350 150 350 L 300 350 Q 375 350 450 350 Q 550 350 550 250 Q 550 150 450 150 L 300 150 Z'
            },
            label: {
                text: elem.title,
                fill: 'white'
            }
        });

        shape.status = elem.status;
        shape.exception = elem.exception;

        return shape;
    }

    getColor(status) {        
       return this.statusColors[+status];
    }

    createLink(con, elems) {

        const link = new joint.shapes.standard.Link()
        link.smooth = true;
        const rect1 = elems.find(e => e.attributes.id == con.source.toString());
        const rect2 = elems.find(e => e.attributes.id == con.destination.toString());

        link.source(rect1);
        link.target(rect2);

        return link;
    }

}


window.customElements.define('inner-graph', InnerGraph);
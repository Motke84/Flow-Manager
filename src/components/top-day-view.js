import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { store } from '../store.js';
// These are the shared styles needed by this element.
import { SharedStyleSuAll } from './styles/shared-styles-su-all';


import { getAllFlowItems, saveFlowItems } from '../actions/top-day-actions';
import { setEditMode, fillGraphItems, setSaveMode, setGraphLoading } from '../actions/graph-actions';



import './header-button';
import './header-toggle-button';
import './date-picker';
import './error-message-modal';
import './inner-graph';

class TopDayView extends connect(store)(PageViewElement) {

  constructor() {
    super();

  }

  firstUpdated() {

    this.isEditMode = false;

    // let today = new Date().toISOString().slice(0, 10)
    let today = "2018-02-14";

    this.date = today;
    store.dispatch(getAllFlowItems(this.date));
    store.dispatch(setGraphLoading(true));

    setInterval(() => {

      const interval = process.env.REFRESH_INTERVAL;

      if (interval > 0 && this.active && !this.isEditMode && !this.graphLoading)
        store.dispatch(getAllFlowItems(this.date));
    }, process.env.REFRESH_INTERVAL);

  }


  render() {

    return html`
          ${SharedStyleSuAll}
          
          <error-message-modal color='blue' icon='bullhorn' ?opened="${this.selectedShape}" .data="${this.selectedShape}"
            @onModalClick="${this._onModalClick}">
          </error-message-modal>
          
          <section>
            <div class="ui grid">
              <div class="row">
                <div class="column">
                  ${this.renderMenu()}
                </div>
              </div>
          
              <div class="row">
                <div class="column">
                  <inner-graph width="${3500}" height="${800}" @onSaveReady="${this._saveReady}" @onShapeSelected="${this._onShapeSelected}"
                    .statusColors="${this.getStatusColors()}">
                  </inner-graph>
                </div>
              </div>
            </div>
          </section>
    `;
  }


  renderMenu() {
    return html`
      <div class="ui stackable menu" ?disabled="${this.graphLoading}">
      
        <div class="item">
          <header-button name="Refresh" color='blue' icon='refresh' ?disabled="${this.isEditMode || this.isRefreshLoading}"
            ?loading="${this.isRefreshLoading}" @onClick="${this._onRefresh}">
          </header-button>
        </div>
      
        <div class="item">
          <header-button name="Save" color='blue' icon='save' ?disabled="${!this.isEditMode || this.isRefreshLoading}"
            ?loading="${this.isSaveLoading}" @onClick="${this._onSave}">
          </header-button>
        </div>
      
        <div class="item">
          <date-picker name="Valuation Date" color='blue' icon='calendar' ?disabled="${this.isEditMode || this.isRefreshLoading || this.isSaveLoading}"
            ?readonly="${true}" date="${this.date}" @onDateChanged="${this._onDateChange}">
          </date-picker>
        </div>
      
        <div class="item">
          <header-toggle-button on_name='Edit Mode' off_name='View Mode' color='blue' ?disabled="${this.isSaveLoading || this.isRefreshLoading}"
            icon='arrows alternate' @onChange="${this._onEditModeToggleChange}" ?on="${this.isEditMode}">
          </header-toggle-button>
        </div>
      
      </div>
      `;
  }

  _onModalClick() {
    this.selectedShape = undefined;
  }


  static get properties() {
    return {
      flowItems: { type: Object },
      isRefreshLoading: { type: Boolean },
      isSaveLoading: { type: Boolean },
      isEditMode: { type: Boolean },
      date: { type: String },
      selectedShape: { type: Object },

    }
  }


  _onRefresh() {

    this.isRefreshLoading = true;
    this.graphLoading = true;

    store.dispatch(getAllFlowItems(this.date));
    store.dispatch(setGraphLoading(true));
  }


  _onDateChange(e) {

    this.date = e.detail.date;
  }

  _onEditModeToggleChange(e) {

    this.isEditMode = e.detail.checked;
    console.log(this.isEditMode);

    store.dispatch(setEditMode(this.isEditMode));
  }




  _saveReady(e) {

    const newFlowItems = e.detail.newGraphItems;

    store.dispatch(saveFlowItems(newFlowItems));
    store.dispatch(setGraphLoading(true));
  }

  _onShapeSelected(e) {

    if (e.detail.selectedShape.exception && e.detail.selectedShape.exception != null)
      this.selectedShape = e.detail.selectedShape;
  }

  _onSave() {

    store.dispatch(setSaveMode(true));
  }


  /*
   New = 1,
   InProgess = 2,
   Success = 3,
   Failed = 4,
   Waiting/Cancel = 5,
   SuccessWithErrors = 6,*/
  getStatusColors() {
    return {
      0: '#2185d0',
      1: '#247172',
      2: '#27A579',
      3: '#218545',
      4: '#BE2828',
      5: '#44001A',
      6: '#E05323',
    }
  }


  // This is called every time something is updated in the store.
  stateChanged(state) {
    this.isRefreshLoading = state.topDayReducer.isRefreshLoading;
    this.isSaveLoading = state.topDayReducer.isSaveLoading;
    this.graphLoading = state.topDayReducer.isGraphLoading;
    this.date = state.topDayReducer.date;
    this.flowItems = state.topDayReducer.flowItems;

  }
}


window.customElements.define('top-day-view', TopDayView);
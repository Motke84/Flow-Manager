import { LitElement, html } from '@polymer/lit-element';
import { SharedStyleSuAll } from './styles/shared-styles-su-all';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker-light';

class DatePicker extends LitElement {


    render() {
        return html`
        ${SharedStyleSuAll}
        <vaadin-date-picker-light ?readonly="${true}" id="dater" 
            @value-changed="${this._onDateChange}">
            <div class="ui labeled input ${this.color}">
                <div class="ui label ${this.color}">
                    <i class="${this.icon} icon"></i>
                    ${this.name}
                </div>
                <input ?readonly="${this.readonly}" type="text" placeholder="Date" value="${this.date ? this.date.toString() : ""}">
            </div>
        </vaadin-date-picker-light>
    `;
    }


    _onDateChange(e) {
        this.date = e.detail.value;
        this.dispatchEvent(new CustomEvent('onDateChanged', { detail: { date: this.date } }));
    }

    static get properties() {
        return {
            name: { type: String },
            color: { type: String },
            icon: { type: String },
            disabled: { type: Boolean },
            loading: { type: Boolean },
            readonly: { type: Boolean },
            date: { type: String }
        }
    }



}

window.customElements.define('date-picker', DatePicker);

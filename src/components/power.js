import { css, html, LitElement } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import sharedStyle from '../sharedStyle';
import './button';

class PowerButton extends LitElement {
  constructor() {
    super();
    this._isOn = false;
    this.timer = undefined;
  }

  static get properties() {
    return {
      power: { type: Object },
      hass: { type: Object },
    };
  }

  render() {
    if (this.power.hide)
      return '';

    if (this.power.type === 'toggle') {
      return html`
          <ha-entity-toggle
            style=${styleMap(this.power.style)}
            .stateObj=${this.power.entity}
            .hass=${this.hass}>
          </ha-entity-toggle>
      `;
    }

    return html`
       <mh-button
         .button=${this.power}>
        </mh-button>
    `;
  }

  updated(changedProps) {
    if (changedProps.has('power')) {
      this._isOn = this.power.isOn;
    }
  }

  static get styles() {
    return [
      sharedStyle,
      css`
     :host {
        position: relative;
        box-sizing: border-box;
        min-width: 0;
        font-weight: var(--mh-info-font-weight);
      }
    `];
  }
}

customElements.define('mh-power', PowerButton);

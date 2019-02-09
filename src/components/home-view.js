import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyleSuAll } from './styles/shared-styles-su-all.js';

class HomeView extends PageViewElement {
  render() {
    return html`
      ${SharedStyleSuAll}
      
      <h2 class="ui center aligned icon header">
        <i class="home icon"></i>
        <div class="content">
          Home View
          <div class="sub header">
            <p>Welcome to Flow Manager</p>
          </div>
        </div>
      </h2>
      
   
    `
  }
}

window.customElements.define('home-view', HomeView);

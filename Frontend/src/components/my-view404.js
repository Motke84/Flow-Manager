import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';

// These are the shared styles needed by this element.
import { SharedStyleSuAll } from './styles/shared-styles-su-all.js';

class MyView404 extends PageViewElement {
  render() {
    return html`
      ${SharedStyleSuAll}
      
      <h2 class="ui center aligned icon header">
        <i class="minus circle icon"></i>
        <div class="content">
          Oops! You hit a 404
          <div class="sub header">
            <p> The page you're looking for doesn't seem to exist. Head back
              <a href="/home">home</a> and try again...</p>
          </div>
        </div>
      </h2>
      
   
    `
  }
}

window.customElements.define('my-view404', MyView404);

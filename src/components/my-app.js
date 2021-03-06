import { LitElement, html } from '@polymer/lit-element';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline,
  updateDrawerState,
  Pages
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import './poly-toaster.js'

class MyApp extends connect(store)(LitElement) {
  render() {
    // Anything that's related to rendering should be done in here.
    return html`

    ${this.renderStyling()}
    
    
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
    
        <div class="ui grid">
          <div class="row">
    
            <div class="left floated column">
              <button class="menu-btn" title="Menu" @click="${this._menuButtonClicked}">
                <i class="bars icon"> </i>
              </button>
            </div>
    
            <div class="column">
              <h2 class="ui header main-header">
                <i class="settings icon"></i>
                <div class="content">
                  ${this.appTitle}
                </div>
              </h2>
            </div>
    
          </div>
        </div>
    
      </app-toolbar>
    
      <!-- This gets hidden on a small screen-->
      <nav class="toolbar-list">
        <a ?selected="${this._page === Pages.Home}" href="${Pages.Home}">Home</a>
        <a ?selected="${this._page === Pages.TopDayFlow}" href="/${Pages.TopDayFlow}">Top-Day Flow</a>
      </nav>
    </app-header>
    
    
    
    <!-- Main content -->
    <main role="main" class="main-content">
      <top-day-view class="page" ?active="${this._page === Pages.TopDayFlow}"></top-day-view>
      <home-view class="page" ?active="${this._page === Pages.Home}"></home-view>
      <my-view404 class="page" ?active="${this._page === Pages.Page404}"></my-view404>
    </main>
    
    <footer>
      <h3>Made by Moti-Matatyahu (IRM-Team).</h3>
    </footer>
    
    <!-- Drawer content -->
    <app-drawer .opened="${this._drawerOpened}" @opened-changed="${this._drawerOpenedChanged}">
      <nav class="drawer-list">
        <a ?selected="${this._page === Pages.Home}" href="${Pages.Home}">Home</a>
        <a ?selected="${this._page === Pages.TopDayFlow}" href="${Pages.TopDayFlow}">Top-Day Flow</a>
      </nav>
    </app-drawer>
    
    <poly-toaster ?opened="${this._snackbarOpened}" message="${this._snackbarMessage}" ?isError="${this._snackbarIsError}" />

    `;

  }


  renderStyling() {

    return html`
    <style>
        @import '../../../public/Semantic-UI-CSS-master/semantic.min.css';
        @import '../../../public/joint.min.css';

        :host {
          --app-drawer-width: 256px;
          display: block;

          --app-primary-color: #E91E63;
          --app-secondary-color: #293237;
          --app-dark-text-color: var(--app-secondary-color);
          --app-light-text-color: white;
          --app-section-even-color: #f7f7f7;
          --app-section-odd-color: white;

          --app-header-background-color: white;
          --app-header-text-color: var(--app-dark-text-color);
          --app-header-selected-color: var(--app-primary-color);

          --app-drawer-background-color: var(--app-secondary-color);
          --app-drawer-text-color: var(--app-light-text-color);
          --app-drawer-selected-color: #78909C;
        }

        app-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          text-align: center;
          background-color: var(--app-header-background-color);
          color: var(--app-header-text-color);
          border-bottom: 1px solid #eee;
        }

        .toolbar-top {
          background-color: var(--app-header-background-color);
        }

        [main-title] {
          font-family: 'Arial';
  
          font-size: 30px;
          /* In the narrow layout, the toolbar is offset by the width of the
          drawer button, and the text looks not centered. Add a padding to
          match that button */
          padding-right: 44px;
        }

        .toolbar-list {
          display: none;
        }

        .toolbar-list > a {
          display: inline-block;
          color: var(--app-header-text-color);
          text-decoration: none;
          line-height: 30px;
          padding: 4px 24px;
        }

        .toolbar-list > a[selected] {
          color: #2185d0;
          border-bottom: 4px solid #2185d0;
        }

        .menu-btn {
          background: none;
          border: none;
          fill: var(--app-header-text-color);
          cursor: pointer;
          height: 44px;
          width: 44px;
        }

        .drawer-list {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          padding: 24px;
          background: var(--app-drawer-background-color);
          position: relative;
        }

        .drawer-list > a {
          display: block;
          text-decoration: none;
          color: var(--app-drawer-text-color);
          line-height: 40px;
          padding: 0 24px;
        }

        .drawer-list > a[selected] {
          color: var(--app-drawer-selected-color);
        }

        /* Workaround for IE11 displaying <main> as inline */
        main {
          display: block;
        }

        .main-content {
          padding-top: 64px;
          min-height: 100vh;
        }

        .page {
          display: none;
        }

        .page[active] {
          display: block;
        }

        footer {       
          padding: 24px;
          background: var(--app-drawer-background-color);
          color: var(--app-drawer-text-color);
          text-align: center;
        }

        .main-header {
          position: fixed;
  
          bottom: 20%;
        }

        /* Wide layout: when the viewport width is bigger than 460px, layout
        changes to a wide layout. */
        @media (min-width: 460px) {
          .toolbar-list {
            display: block;
          }

          .menu-btn {
            display: none;
          }

          .main-content {
            padding-top: 107px;
          }

          .main-header {
            right: 45%;
            bottom: 10%;
           }

          /* The drawer button isn't shown in the wide layout, so we don't
          need to offset the title */
          [main-title] {
            padding-right: 0px;
          }
        }

        .toast-succses {
          --paper-toast-background-color: #51a351;
          --paper-toast-color: white;
          position:fixed;
          right: 0;
          left:unset!important;
          border-radius: 3px;
        }

        .centered{
          text-align: center;
          position: fixed;
          right: 45%;
          bottom: 10%;
        }
    </style>`;
  }

  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean },
      _isError: { type: Boolean }
    }
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
    setPassiveTouchGestures(true);
  }

  firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    //  installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`,
      () => store.dispatch(updateDrawerState(false)));
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }

  _drawerOpenedChanged(e) {
    store.dispatch(updateDrawerState(e.target.opened));
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._snackbarOpened = state.app.snackbarOpened;
    this._snackbarMessage = state.app.snackbarMessage;
    this._drawerOpened = state.app.drawerOpened;
    this._snackbarIsError = state.app.snackbarIsError;
  }
}

window.customElements.define('my-app', MyApp);

import React, { Component } from 'react';
import './App.css';
import './material.css'
import RadarPage from './RadarPage'
import {RadarSettingDialog, dialog} from './components/RadarSettingDialog'

class App extends Component {
  render() {
    return (
      <div>
        <header className="mdc-toolbar">
          <div className="mdc-toolbar__row">
            <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
              {/* <i className="material-icons mdc-toolbar__icon--menu">menu</i> */}
              <span className="mdc-toolbar__title">雷達回波</span>
            </section>
            <section className="mdc-toolbar__section mdc-toolbar__section--align-end">
              <i className="material-icons mdc-toolbar__icon--menu" onClick={() => {dialog.show()}}>settings</i>
            </section>
          </div>
        </header>
        <RadarPage />
        <RadarSettingDialog />
      </div>
    );
  }
}

export default App;

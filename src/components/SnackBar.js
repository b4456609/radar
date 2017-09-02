import React, { Component } from 'react';
const MDCSnackbar = window.mdc.snackbar.MDCSnackbar;
let snackbar = null;

class SnackBar extends Component {
  componentDidMount() {
    snackbar = new MDCSnackbar(this.refs.snackbar);
  }
  
  render() {
    return (
      <div ref="snackbar" className="mdc-snackbar mdc-snackbar--align-start"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden="true">
        <div className="mdc-snackbar__text"></div>
        <div className="mdc-snackbar__action-wrapper">
          <button type="button" className="mdc-button mdc-snackbar__action-button"></button>
        </div>
      </div>
    );
  }
}

function showSnackBar(msg, retryCallback){
  if(snackbar.root_.className.indexOf('active') !== -1) return;
  const dataObj = {
    message: msg,
    actionText: 'Retry',
    timeout: 30000,
    actionHandler: retryCallback
  };
  snackbar.show(dataObj);
}

export default SnackBar;
export {showSnackBar};
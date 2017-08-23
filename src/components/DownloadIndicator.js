import React, { Component } from 'react';
import { connect } from 'react-redux'
const MDCLinearProgress = window.mdc.linearProgress.MDCLinearProgress;
let linearProgress = null;

function getProgress(number, currentNumber, loaded, total) {
  return currentNumber / number + (loaded / total) / number
}
function getBuffer(number, currentNumber) {
  return (currentNumber + 1) / number
}

class DownloadIndicator extends Component {
  componentDidMount() {
    linearProgress = new MDCLinearProgress(this.refs.bar);
    linearProgress.progress = 0;
    linearProgress.buffer = 0;
    // linearProgress.close();
    let { number, currentNumber, loaded, total, isLoading } = this.props;
    if (isLoading) {
      linearProgress.progress = getProgress(number, currentNumber, loaded, total);
      linearProgress.buffer = getBuffer(number, currentNumber);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let { number, currentNumber, loaded, total, isLoading } = nextProps;
    if (this.props.isLoading && !isLoading) {
      linearProgress.close();
    }

    if (!this.props.isLoading && isLoading) {
      linearProgress.open();
    }
    if (isLoading) {
      linearProgress.progress = getProgress(number, currentNumber, loaded, total);
      linearProgress.buffer = getBuffer(number, currentNumber);
    }

  }


  render() {
    return (
      <div ref="bar" role="progressbar" className="mdc-linear-progress mdc-linear-progress--accent">
        <div className="mdc-linear-progress__buffering-dots"></div>
        <div className="mdc-linear-progress__buffer"></div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
          <span className="mdc-linear-progress__bar-inner"></span>
        </div>
        <div className="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span className="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  let { isLoading,
    number,
    currentNumber,
    loaded,
    total } = state.saveImage;
  return {
    isLoading,
    number,
    currentNumber,
    loaded,
    total
  }
})(DownloadIndicator);
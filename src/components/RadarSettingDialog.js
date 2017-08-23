import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRadarConfig } from '../actions'
const MDCDialog = window.mdc.dialog.MDCDialog;

let dialog = null;
class RadarSettingDialog extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
    console.log(props)
  }
  componentDidMount() {
    dialog = new MDCDialog(this.refs.radarSetting);
  }

  onSubmit() {
    let duration = document.querySelector('input[name="duration-radio"]:checked').value
    let interval = document.querySelector('input[name="interval"]:checked').value
    this.props.dispatch(setRadarConfig(Number(duration), Number(interval)))
  }

  render() {
    return (
      <aside ref="radarSetting"
        className="mdc-dialog"
        role="alertdialog"
        aria-labelledby="my-mdc-dialog-label"
        aria-describedby="my-mdc-dialog-description">
        <div className="mdc-dialog__surface">
          <header className="mdc-dialog__header">
            <h2 id="my-mdc-dialog-label" className="mdc-dialog__header__title">
              雷達回波圖設定
          </h2>
          </header>
          <section id="my-mdc-dialog-description" className="mdc-dialog__body">
            <div>
              <h3>動態顯示</h3>
              <div className="mdc-form-field">
                <div className="mdc-radio">
                  <input className="mdc-radio__native-control" type="radio" id="duration-1" name="duration-radio" value="1"
                  defaultChecked={this.props.duration === 1} />
                  <div className="mdc-radio__background">
                    <div className="mdc-radio__outer-circle"></div>
                    <div className="mdc-radio__inner-circle"></div>
                  </div>
                </div>
                <label id="duration-1-label" htmlFor="duration-1">1小時</label>

                <div className="mdc-radio">
                  <input className="mdc-radio__native-control" type="radio" id="duration-2" name="duration-radio" value="2"
                  defaultChecked={this.props.duration === 2} />
                  <div className="mdc-radio__background">
                    <div className="mdc-radio__outer-circle"></div>
                    <div className="mdc-radio__inner-circle"></div>
                  </div>
                </div>
                <label id="duration-2-label" htmlFor="duration-2">2小時</label>

                <div className="mdc-radio">
                  <input className="mdc-radio__native-control" type="radio" id="duration-3" name="duration-radio" value="3"
                  defaultChecked={this.props.duration === 3} />
                  <div className="mdc-radio__background">
                    <div className="mdc-radio__outer-circle"></div>
                    <div className="mdc-radio__inner-circle"></div>
                  </div>
                </div>
                <label id="duration-3-label" htmlFor="duration-3">3小時</label>
              </div>
            </div>

            <div>
              <h3>間隔</h3>
              <div className="mdc-form-field">
                <div className="mdc-radio">
                  <input className="mdc-radio__native-control" type="radio" id="interval-1" name="interval" value="0.1" 
                  defaultChecked={this.props.interval === 0.1} />
                  <div className="mdc-radio__background">
                    <div className="mdc-radio__outer-circle"></div>
                    <div className="mdc-radio__inner-circle"></div>
                  </div>
                </div>
                <label id="interval-1-label" htmlFor="interval-1">0.1秒</label>

                <div className="mdc-radio">
                  <input className="mdc-radio__native-control" type="radio" id="interval-2" name="interval" value="0.5" 
                  defaultChecked={this.props.interval === 0.5}  />
                  <div className="mdc-radio__background">
                    <div className="mdc-radio__outer-circle"></div>
                    <div className="mdc-radio__inner-circle"></div>
                  </div>
                </div>
                <label id="interval-2-label" htmlFor="interval-2">0.5秒</label>

                <div className="mdc-radio">
                  <input className="mdc-radio__native-control" type="radio" id="interval-3" name="interval" value="1" 
                  defaultChecked={this.props.interval === 1}  />
                  <div className="mdc-radio__background">
                    <div className="mdc-radio__outer-circle"></div>
                    <div className="mdc-radio__inner-circle"></div>
                  </div>
                </div>
                <label id="interval-3-label" htmlFor="interval-3">1秒</label>
              </div>
            </div>
          </section>
          <footer className="mdc-dialog__footer">
            <button type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">取消</button>
            <button type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept"
              onClick={this.onSubmit}>確定</button>
          </footer>
        </div>
        <div className="mdc-dialog__backdrop"></div>
      </aside>
    );
  }
}

RadarSettingDialog = connect(state=>({interval: state.radar.interval, duration: state.radar.duration}))(RadarSettingDialog);
export { dialog, RadarSettingDialog };
export default RadarSettingDialog;
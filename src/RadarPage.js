import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getList } from './actions'
import ImageContainer from './components/ImageContainer'
import DownloadIndicator from './components/DownloadIndicator'

const REFRESH_LIST_INTERVAL = 1000 * 60 * 5

function getAppbarHeight() {
  return window.innerWidth < 600 ? 60 : 68
}

function getListInterval(dispatch) {
  return setInterval(() => {
    dispatch(getList());
  }, REFRESH_LIST_INTERVAL)
}

let interval = null

class RadarPage extends Component {
  componentDidMount() {
    this.refs.container.style.height = window.innerHeight - getAppbarHeight() + 'px';
    this.props.dispatch(getList());
    interval = getListInterval(this.props.dispatch);
  }

  componentWillUnmount() {
    clearInterval(interval)
  }

  render() {
    return (
      <div ref="container" style={{
        position: 'relative'
      }}>
        <ImageContainer
          list={this.props.pic}
          duration={this.props.duration}
          interval={this.props.interval} />
        <div style={{
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
        }} > <DownloadIndicator />
        </div>
      </div>
    );
  }
}

function getDateFromString(time) {
  return new Date(time.substring(12, 16), time.substring(16, 18), time.substring(18, 20), time.substring(20, 22), time.substring(22, 24))
}

export default connect(state => {
  let pic = []
  for (let key in state.saveImage.image) {
    pic.push({
      name: key,
      url: state.saveImage.image[key]
    })
  }
  pic.sort((a, b) => getDateFromString(a.name) - getDateFromString(b.name))
  return {
    picList: state.picList,
    pic,
    duration: state.radar.duration,
    interval: state.radar.interval,
  }
})(RadarPage);
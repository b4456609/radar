import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getList } from './actions'
import ImageContainer from './components/ImageContainer'
import DownloadIndicator from './components/DownloadIndicator'
function getAppbarHeight() {
  return window.innerWidth < 600 ? 60 : 68
}
class RadarPage extends Component {
  componentDidMount() {
    this.refs.container.style.height = window.innerHeight - getAppbarHeight() + 'px';
    this.props.dispatch(getList());
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

export default connect(state => {
  let pic = []
  for (let key in state.saveImage.image) {
    pic.push({
      name: key,
      url: state.saveImage.image[key]
    })
  }
  return {
    picList: state.picList,
    pic,
    duration: state.radar.duration,
    interval: state.radar.interval,
  }
})(RadarPage);
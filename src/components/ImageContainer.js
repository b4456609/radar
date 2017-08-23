import React, { Component } from 'react';
const d3 = window.d3;

const PIC_PIXEL = 540;
function centerX() {
  return (window.innerWidth - imageSize()) / 2
}
function centerY() {
  return (window.innerHeight - 64 - imageSize()) / 2
}

function imageSize() {
  let size = Math.min(window.innerWidth, window.innerHeight - 64)
  return Math.min(size, PIC_PIXEL)
}

function cycleNext(list, index) {
  if (list.length - 1 > index) return index + 1;
  return 0;
}

function getDisplayList(list, duration) {
  if (list.length === 0) return [];
  return list.filter((item, i) => (list.length - i) < duration * 6)
}

function getInterval(svg, i) {
  return setInterval(function () {
    if (list.length > i) {
      svg.select('image').attr("xlink:href", list[i].url)
      let time = list[i].name.substring(20, 24);
      root.select('text').text(time.slice(0,2) + ':' + time.slice(2,4))
      i = cycleNext(list, i);
    }
  }, picInterval * 1000);
}

let list = [];
let root = null;
let svg = null;
let interval = null;
let picInterval = 0.5;
let i = 0;

class ImageContainer extends Component {
  componentDidMount() {
    root = d3.select("#image-container")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")

    svg = root.call(d3.zoom().on("zoom", function () {
      svg.attr("transform", d3.event.transform)
    }))
      .append("g")

    svg.append("image")
      .attr("x", centerX())
      .attr("y", centerY())
      .attr("xlink:href", "")
      .attr('height', imageSize())
      // .attr('width', '100%')
      .attr('id')

    root.append('text')
      .attr('x', window.innerWidth - 90)
      .attr('y', 40)
      .style('fill', '#E91E63')
      .style('font-size', '24px')
      .style('font-weight', '600')
      .style('stroke', '#fff')
      .style('stroke-width', '1px');

    list = getDisplayList(this.props.list, this.props.duration)
    picInterval = this.props.interval;
    interval = getInterval(svg, i)
  }

  componentWillUpdate(nextProps, nextState) {
    list = getDisplayList(nextProps.list, nextProps.duration)
    picInterval = nextProps.interval;
    clearInterval(interval)
    interval = getInterval(svg, i)

  }

  componentWillUnmount() {
    clearInterval(interval)
  }

  render() {
    return (
      <div id="image-container" style={{ height: '100%', width: '100%' }} />
    );
  }
}

export default ImageContainer;
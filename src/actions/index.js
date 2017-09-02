import { getImgurListApi, fetchImg } from '../api/Server'
import { showSnackBar } from '../components/SnackBar'

export function getList() {
  return function (dispatch, getState) {
    getImgurListApi()
      .then((data) => data.map(item => {
        if (item.link.indexOf('https') === -1)
          item.link = item.link.replace('http', 'https')
        return item
      }))
      .then((data) => {
        dispatch({
          type: 'GET_PICLIST_SUCCESS',
          data
        })
        dispatch(getImage())
      })
  }
}

export const setRadarConfig = (duration, interval) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_RADARCONFIG',
      duration, interval
    })
    dispatch(getImage())
  }
}

function getDateFromString(time) {
  return new Date(time.substring(12, 16), time.substring(16, 18), time.substring(18, 20), time.substring(20, 22), time.substring(22, 24))
}

function duration2ImageNumber(duration) {
  return duration * 6;
}

function isExistInState(image, item) {
  return Object.keys(image).indexOf(item.name) === -1
}

export function getImage() {
  return async (dispatch, getState) => {
    let downloadList = getState().picList
      .slice()
      .reverse()
      .sort((a, b) => getDateFromString(b.name) - getDateFromString(a.name))
      .slice(0, duration2ImageNumber(getState().radar.duration))
      .filter((item) => isExistInState(getState().saveImage.image, item))

    if (downloadList.length === 0) return;

    dispatch({
      type: 'SET_DOWONLOAD_OVERVIEW',
      number: downloadList.length
    })

    for (let item of downloadList) {
      await fetchImg(item.link)
        .then((url) => { dispatch({ type: 'ADD_IMAGE_URL', url, item }) })
        .catch(reason => {
          showSnackBar('Error Downlaod Image', () => { dispatch(getImage()) });
        })
    }

    dispatch({
      type: 'FINISH_LOAD_IMAGE',
      number: downloadList.length
    })
  }
}
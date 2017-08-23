import { getListApi, getImg } from '../api/Server'

export function getList() {
  return function (dispatch, getState) {
    getListApi()
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

export function getImage() {
  return async (dispatch, getState) => {
    let downloadList = getState().picList
      .slice()
      .reverse()
      .slice(0, getState().radar.duration * 6)
      .filter((item) => Object.keys(getState().saveImage.image).indexOf(item) === -1);

    if (downloadList.length === 0) return;

    dispatch({
      type: 'SET_DOWONLOAD_OVERVIEW',
      number: downloadList.length
    })

    for (let item of downloadList) {
      let url = await getImg(item, (loaded, total) => { dispatch(downloadStatus(loaded, total)) })
      dispatch({ type: 'ADD_IMAGE_URL', url, item })
    }

    dispatch({
      type: 'FINISH_LOAD_IMAGE',
      number: downloadList.length
    })
  }
}

function downloadStatus(loaded, total) {
  return {
    type: 'DOWNLOAD_STATUS',
    loaded, total
  }
}
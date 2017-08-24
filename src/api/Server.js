import axios from 'axios'

const SERVER = 'https://radar-backendb-radar.a3c1.starter-us-west-1.openshiftapps.com'
export function getListApi() {
  return fetch(`${SERVER}/list`)
    .then(res => res.json());
}

export function getPicUrl(filename) {
  return `${SERVER}/pic/${filename}`
}

export function getImg(filename, downloadStatus) {
  return fetchImg(getPicUrl(filename), downloadStatus)
}

export function fetchImg(url, downloadStatus){
  return axios.get(url, {
    responseType: 'blob',
    onDownloadProgress: function (progressEvent) {
      let { loaded, total } = progressEvent
      downloadStatus(loaded, total)
    },
  })
    .then((res) => res.data)
    .then(data => URL.createObjectURL(data))
}

export function getImgurListApi() {
  return fetch(`${SERVER}/listImgur`)
    .then(res => res.json());
}

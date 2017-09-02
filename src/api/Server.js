import axios from 'axios'

const SERVER = 'https://radar-backendb-radar.a3c1.starter-us-west-1.openshiftapps.com'
export function getListApi() {
  return fetch(`${SERVER}/list`)
    .then(res => res.json());
}

export function getPicUrl(filename) {
  return `${SERVER}/pic/${filename}`
}

export function getImg(filename) {
  return fetchImg(getPicUrl(filename))
}

export function fetchImg(url){
  return fetch(url)
    .then((res) => res.blob())
    .then(data => URL.createObjectURL(data))
}

export function getImgurListApi() {
  return fetch(`${SERVER}/listImgur`)
    .then(res => res.json());
}

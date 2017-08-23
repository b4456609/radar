import { combineReducers } from 'redux'
import picList from './picList'
import radar from './radar'
import saveImage from './saveImage'

const reducer = combineReducers({
  picList, radar, saveImage
})

export default reducer
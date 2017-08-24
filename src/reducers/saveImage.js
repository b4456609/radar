const saveImageInitialState = {
  isLoading: true,
  number: 0,
  currentNumber: 0,
  image: {},
  loaded: 0,
  total: 0
}
const saveImage = (state = saveImageInitialState, action) => {
  switch (action.type) {
    case 'ADD_IMAGE_URL':
      return { ...state, currentNumber: state.currentNumber + 1, loaded: 0,image: { [action.item.name]: action.url, ...state.image } }
    case 'SET_DOWONLOAD_OVERVIEW':
      return { ...state, number: action.number, currentNumber: 0, isLoading: true }
    case 'DOWNLOAD_STATUS':
      let { loaded, total } = action;
      return { ...state, loaded, total }
    case 'FINISH_LOAD_IMAGE':
      return { ...state, isLoading: false }
    default:
      return state
  }
}

export default saveImage;
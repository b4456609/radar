const picListInitialState = []
const picList = (state = picListInitialState, action) => {
  switch (action.type) {
    case 'GET_PICLIST_SUCCESS':
      return action.data
    default:
      return state
  }
}

export default picList;
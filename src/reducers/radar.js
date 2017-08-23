const radarInitialState = {
  duration: 1,
  interval: 0.5
}
const radar = (state = radarInitialState, action) => {
  switch (action.type) {
    case 'SET_RADARCONFIG':
      let { duration, interval } = action;
      return { ...state, duration, interval }
    default:
      return state
  }
}

export default radar;
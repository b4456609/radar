import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import './index.css';
import './materialIcon.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import reducer from './reducers'

let middleware = []
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}

let store = createStore(reducer,
  applyMiddleware(thunk, ...middleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();

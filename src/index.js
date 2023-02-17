import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from 'redux'
import tasksReducer from './store/reducers'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = (state = {}, action) => {
  return {
    tasks: tasksReducer(state.tasks, action)
  }
}
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}> <NextApp /> </Provider>,
      document.getElementById('root')
    )
  })
  module.hot.accept('./store/reducers', () => {
    const nextRootReducer = require('./store/reducers').default;
    store.replaceReducer(nextRootReducer);
  })
}
root.render(
  <Provider store={ store }>
    <App />
  </Provider>
);

/* Think of the Provider component as an enabler.
You won’t interact with it directly often, typically only in a file such as index.js,
which takes care of initially mounting the app to the DOM. Behind the scenes,
Provider ensures you can use connect to pass data from the store to one or more React components. */
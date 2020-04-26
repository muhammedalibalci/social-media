import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { Provider} from 'react-redux'
import './bootstrap-override.scss'
import configureStore from "./store/configureStore";
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


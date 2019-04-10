import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';

/* REDUX STORE */
import { Provider } from 'react-redux';
import {store} from './store';
//Redux-persist
import { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
/* REDUX STORE */

//App Component
class App extends Component {
  render() {
    return (
      <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
      </PersistGate>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;

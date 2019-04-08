import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';

/* REDUX STORE */
import { Provider } from 'react-redux';
import store from './store';
/* REDUX STORE */

//App Component
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
        <div>
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;

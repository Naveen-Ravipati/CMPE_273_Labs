import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';

/* REDUX STORE */
import { Provider } from 'react-redux';
import { store } from './store';
//Redux-persist
import { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
/* REDUX STORE *
/

/* GRAPHQL */
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: `http://localhost:3001/graphql`
})
/* GRAPHQL */

//App Component
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <PersistGate loading={null} persistor={persistor}>
          <Provider store={store}>
            <BrowserRouter>
              <div>
                <Main />
              </div>
            </BrowserRouter>
          </Provider>
        </PersistGate>
      </ApolloProvider>
    );
  }
}
//Export the App component so that it can be used in index.js
export default App;

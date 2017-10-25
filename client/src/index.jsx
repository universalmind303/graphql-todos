import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
// apollo
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

//redux
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {modal ,todos, user} from './reducers/main.jsx'



// graphql 
const networkInterface = createNetworkInterface({
    uri: "/graphql",
})

const client = new ApolloClient({
  networkInterface: networkInterface ,
});


// redux store 
const store = createStore(
  combineReducers({
    todos: todos,
    modal: modal,
    user: user,
    apollo: client.reducer()
}))

// imports bootstrap and main css sheet for all components

import './styles/bootstrap.scss';
import './styles/main.scss';

render(
  <ApolloProvider store={store} client={client}><App /></ApolloProvider>, 
  document.getElementById('app')
);

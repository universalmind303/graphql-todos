import React from 'react';
import './Header.scss';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const CodeQuery = gql`
query {
  User 
}
`
const Header = ({data: {User}}) => {
  return User ? (
  <nav className='navbar navbar-light bg-faded'>
    <a className='navbar-brand subcomponent' href='#'>Graphql-Todos-{User}</a>
  </nav>
  ) : <div>Loading</div>
}

export default graphql(CodeQuery)(Header)
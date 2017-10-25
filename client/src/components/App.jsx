import React, {Component} from 'react';
import Header from './Header.jsx';
import SubmitWithMutationAndData from './Submit.jsx';
import ListWithQuery from './List.jsx'
import Modal from './Modal.jsx'
import { connect } from 'react-redux';

const App = ({id}) => {
  return (
    <div>
    {id !== 0 ?  <Modal /> : null }
      <Header />
      <div className="container">
        <SubmitWithMutationAndData />
        <ListWithQuery/>
      </div>  
    </div>
  )
}
const mapState = ({modal}) => ({id: modal})

export default connect(mapState)(App)

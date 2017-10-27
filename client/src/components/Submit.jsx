import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './Submit.scss';
import { listQuery } from './List.jsx';
import { connect } from 'react-redux';
import {addTodo} from '../actions/index.jsx'

const Submit = ({todoClick,mutate, data, updateItem}) => {
  return (  
    <div className='buffer-bottom'>
    <span className='input-group input-group buffer-bottom '>
      <label className='h2'>New: </label>
      <input className='input-group'
        value={data}
        onKeyPress={(e) => {
          if(e.key === 'Enter' && data.length) {
            mutate({
              variables: {data: {data: data}},
              refetchQueries: [ {query: listQuery}],
            })
            todoClick()
          }}}
        onChange={todoClick}>
       </input>
     </span>
     
    <span>
      <button 
      className='btn btn-primary btn-block' 
      disabled={!data.length} 
      onClick={()=> {
        mutate({
          variables: {data: {data: data}},
          refetchQueries: [ {query: listQuery}],
        })
        todoClick()
      }}
      >Add!</button>
     </span>
   </div>
)}


const SubmitMutation = gql`
mutation($data: TodoMutation) {
  addItem(input:$data)
}
`
const SubmitWithMutation =  graphql(SubmitMutation)(Submit)

const mapState = ({todos}) => ({data: todos.add})
const mapDispatch = (dispatch) => ({todoClick: (e) => dispatch(addTodo(e))})

const SubmitWithMutationAndData = connect(mapState, mapDispatch)(SubmitWithMutation)

export default SubmitWithMutationAndData

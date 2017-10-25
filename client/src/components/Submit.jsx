import React, {Component} from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import "./Submit.scss"
import { listQuery } from "./List.jsx"
import { connect } from 'react-redux';
import {addTodo} from '../actions/index.jsx'

const Submit = ({todoClick,mutate, item, updateItem}) => {
  return (  
    <div className="buffer-bottom">
    <span className="input-group input-group buffer-bottom ">
      <label className="h2">New: </label>
      <input className="input-group"
        value={item}
        onKeyPress={(e) => {
          if(e.key === "Enter") {
            mutate({
              variables: {item: item},
              refetchQueries: [ {query: listQuery}],
            })
            todoClick()
          }}}
        onChange={(e)=> todoClick(e) }>
       </input>
     </span>
     
    <span>
      <button 
      className="btn btn-primary btn-block" 
      disabled={!item.length} 
      onClick={()=> {
        mutate({
          variables: {item: item},
          refetchQueries: [ {query: listQuery}],
        })
        todoClick()
      }}
      >Add!</button>
     </span>
   </div>
)}


const SubmitMutation = gql`
mutation($item: String!) {
  addItem(item:$item)
}
`
const SubmitWithMutation =  graphql(SubmitMutation)(Submit)

const mapState = ({todos}) => ({item: todos.add})
const mapDispatch = (dispatch) => ({todoClick: (e) => dispatch(addTodo(e))})

const SubmitWithMutationAndData = connect(mapState, mapDispatch)(SubmitWithMutation)

export default SubmitWithMutationAndData

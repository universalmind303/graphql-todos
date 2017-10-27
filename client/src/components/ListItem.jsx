import React from 'react'
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { listQuery } from './List.jsx'
import {triggerModal} from '../actions/index.jsx'

const listMutation = gql`
mutation($id: String!) {
  deleteItem(id: $id)
}
`

const ListItem =  ({modalClick, mutate, item, id}) => {
  return (
    <div className='list-group-item'>
      <span className= 'col-10'>Todo:{item}</span>
      <button 
      type='button' 
      className='btn btn-warning ' 
      data-toggle='modal' 
      data-target='#modal'
      onClick={() => modalClick(id)}>
        <i className='fa fa-pencil-square-o' aria-hidden='true'></i>
      </button>
      <span className=' '><button 
      className=' pull-right btn btn-danger'
      onClick={() => {
        mutate({
          variables: {id: id},
          refetchQueries: [ {query: listQuery}],
        })
      }}><i className='fa fa-trash' aria-hidden='true'></i>
      </button></span>
    </div>
  )
}

const ListItemWithMutations =  graphql(listMutation)(ListItem)

const mapDispatch = (dispatch) => ({modalClick: (id) => dispatch(triggerModal(id))})
const ListItemWithMutationsandDispatch = connect(null, mapDispatch)(ListItemWithMutations)

export default ListItemWithMutationsandDispatch
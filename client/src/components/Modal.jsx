import React, {Component} from 'react';
import { connect } from 'react-redux';
import {updateTodo} from '../actions/index.jsx'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { listQuery } from "./List.jsx"
import {triggerModal} from '../actions/index.jsx'

const ModalMutation = gql`
mutation($id: ID!, $item: String!) {
  modifyItem(id: $id, item: $item)
}
`


const Modal = ({mutate, modalClick,todoClick, item, id}) => (
  <div className="modal fade" id="modal">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Modify Todo</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
  <span className="input-group input-group buffer-bottom ">
    <label className="h2">Body: </label>
    <input 
      className="input-group"
      value={item}
      onChange={(e)=> todoClick(e)}
      onKeyPress={(e) => {
        if(e.key ==="Enter") {
          
          mutate({
              variables: {id: id, item: item},
              refetchQueries: [ {query: listQuery}],
          })
          todoClick()
          // there has to be a better way than jquery to hide this
          $('#modal').modal('hide')
        }
      }}></input>
   </span>
        </div>
        <div className="modal-footer">
          <button 
          type="button" 
          className="btn btn-primary" 
          onClick={()=> {
            mutate({
              variables: {id: id, item: item},
              refetchQueries: [ {query: listQuery}],
            })
            todoClick()
          }}
          data-dismiss="modal">Save changes</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
)

const ModalWithMutation = graphql(ModalMutation)(Modal)

const mapState = ({todos, modal}) => ({item: todos.update, id: modal})
const mapDispatch = (dispatch) => ({
  todoClick: (e) => dispatch(updateTodo(e)),
  modalClick: (id) => dispatch(triggerModal(id))
})



export default connect(mapState, mapDispatch)(ModalWithMutation)
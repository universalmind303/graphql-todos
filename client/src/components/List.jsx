import React from 'react';
import ListItemWithMutationsandDispatch from './ListItem.jsx';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ListQuery = gql`
query {
  Todos {
    id
    info
  }
}
`
const List =  ({data}) =>  {
  let {Todos} = data
  return Todos && Todos.length > 0 
    ? (<div className="list-group">{
        Todos.map( ({id,info}) => 
          <ListItemWithMutationsandDispatch 
            item={info} 
            id={id} 
            key={id} 
          />
        )}</div>)
    : (<div>Loading</div>)
}

export const listQuery = ListQuery
export default graphql(ListQuery)(List)

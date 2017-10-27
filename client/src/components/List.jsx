import React from 'react';
import ListItemWithMutationsandDispatch from './ListItem.jsx';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const ListQuery = gql`
query {
  Todos {
    id
    data
  }
}
`
const List = ({data: {Todos}}) =>  {
  return Todos && Todos.length > 0 
    ? (<div className='list-group'>{
        Todos.map( ({id,data}) => 
          <ListItemWithMutationsandDispatch 
            item={data} 
            id={id} 
            key={id} 
          />
        )}</div>)
    : (<div>Loading</div>)
}

export const listQuery = ListQuery
export default graphql(ListQuery)(List)

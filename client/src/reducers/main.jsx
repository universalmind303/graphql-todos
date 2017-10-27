export const todos = (state = {add: '', update:''}, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      if(!action.text) {
        return {...state, add: '' }
      } else {
        return {...state, add: action.text.target.value  }
      }
    case 'UPDATE_TODO':
      if(!action.text) {
        return {...state, update:'' }
      } else {
        return {...state, update: action.text.target.value  }
      }
    default:
      return state
  }
}

export const modal = (state=null, action) => {
  switch(action.type) {
    case 'TRIGGER_MODAL':
      return action.id
    default: 
      return state
  }
}

export const user = (state='', action) => {
  switch(action.type) {
    case 'SET_USER':
      if(action.user) {
        return action.user
      } else {
        return state
      }
    default:
      return state
  }
}
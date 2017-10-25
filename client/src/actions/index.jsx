export const addTodo = (text) => ({type: 'ADD_TODO', text})
export const updateTodo = (text) => ({type:'UPDATE_TODO',text})
export const triggerModal = (id) => ({type:"TRIGGER_MODAL", id})
export const setUser = (user) => ({type:"SET_USER", user})
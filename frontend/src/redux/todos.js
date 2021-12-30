const initialState = {
  todos: [],
  loading: false,
  postLoading: false,
  deleteLoading: false,
  error: null
}

export const todosReducer = (state = initialState, action) => {
  switch (action.type){
    case 'todos/load/fulfilled':
      return {
        ...state,
        todos: action.payload,
        loading: false
      }
    case 'todos/load/pending':
      return {
        ...state,
        loading: true
      }
    case 'todos/load/rejected':
      return {
        ...state,
        error: action.payload
      }
    //  на верху кейсы для get запроса

    case 'todos/post/fulfilled': // добавление туду
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload
        ],
        postLoading: false
      }
    case 'todos/post/pending':
      return {
        ...state,
        postLoading: true,
        error: action.payload
      }// добавление туду

    case 'todos/delete/fulfilled':
      return {
        ...state,
        todos: state.todos.filter((item) => {
          if (item._id !== action.payload){
            return item
          }
        }),
        deleteLoading: false

      }
    case 'todos/delete/pending':
      return {
        ...state,
        deleteLoading: true
      }
    case 'todos/delete/rejected':
      return {
        ...state,
        error: action.payload
      }
    // конец кейсов для дуалени туду

    // начало кейсов для изменнения туду
    case 'todos/patch/fulfilled':
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item._id === action.payload){
            item.done = !item.done
            return item
          }
          return item
        })
      }
    default:
      return state
  }
}

export const loadTodos = () => { // функиця вывода туду
  return async (dispatch) => {
    try {
      dispatch({type: 'todos/load/pending'})

      const todos = await fetch('http://localhost:4000/todos') // функиця вывода туду
      const todo = await todos.json()
      console.log(todo)
      await dispatch({type: 'todos/load/fulfilled', payload: todo}) // функиця вывода туду
    } catch (e){
      dispatch({ type: 'todos/load/rejected', payload: e }) // функиця вывода туду
    }
  } // функиця вывода туду
}

export const postTodos = (text) => {   // функция для добавления туду
  return async (dispatch) => {
    let option = {  // функция для добавления туду
      text: text,
      done: false
    }
    try {// функция для добавления туду
      dispatch({type: 'todos/post/pending'})

      const res = await fetch(`http://localhost:4000/todos`, {// функция для добавления туду
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(option) // функция для добавления туду
      })
      const todo = await res.json()
      dispatch({ type: 'todos/post/fulfilled', payload: todo})
    } catch (e) {
      dispatch({ type: 'todos/post/pending', payload: e })
    }
  }
} // функция для добавления туду

export const deleteTodo = (id) => { // функиця для дулаения туду
  let option = {
    method: 'DELETE'
  }
  return async (dispatch) => {
    try { // функиця для дулаения туду
      dispatch({type: 'todos/delete/pending'})

      await fetch(`http://localhost:4000/todos/${id}`, option)
      dispatch({type: 'todos/delete/fulfilled', payload: id})
    } catch (e) {
      dispatch({type: 'todos/delete/rejected', payload: e})// функиця для дулаения туду
    }
  }
}

export const patchTodo = (id, complete) => {
  let keys = {
    done: !complete
  }
  let option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(keys)
  }
  return async (dispatch) => {
    try {
      await fetch(`http://localhost:4000/todos/${id}`, option)
      dispatch({type: 'todos/patch/fulfilled', payload: id})
    } catch (e) {
      dispatch({type: 'todos/patch/rejected'})
    }
  }
}
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, loadTodos, patchTodo } from '../../redux/todos';

const Todos = () => {

  const dispatch = useDispatch()

  const todos = useSelector(state => state.todos)
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(loadTodos())
  }, [])

  const [checked, setChecked] = useState(false)

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleChecked = (id, complete) => {
    dispatch(patchTodo(id, complete))
  }
  return (
    <div id='todos'>
      { loading ? <div id='loading'>Идет загрузка...</div>

        :

        todos.map((item) => {
            return (
              <div className='todos-item'>
                <input onClick={(e) => handleChecked(item._id, item.done)} checked={item.done} type='checkbox'/>
                <div className='item-text'>{item.text}</div>
                <button onClick={() => handleDelete(item._id)} className='delete'>⮿</button>
              </div>
            )
        })
      }
    </div>
  );
};

export default Todos;
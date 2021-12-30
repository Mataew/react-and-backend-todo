import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadTodos, postTodos } from '../redux/todos';

const Form = () => {

  const dispatch = useDispatch()

  // снизу весь движ для оживления формы
  const [form, setForm] = useState('') // значение самой формы
  const [focus, setFocus] = useState(false) // фокусировка и расфокусировка на форму
  const handleFocus = () => { // смена значении при расфокусировке
    setFocus(true)
  }
  const handleForm = (e) => { // функция для вывода ошибки при расфокусировке
    setForm(e.target.value)
    setFocus(false)
    console.log(form)
  }
  // конец движа

  const handleAdded = () => {
    dispatch(postTodos(form))
    setForm('')
  }

  return (
    <div className='form-wrapper'>
      <input
        value={form}
        onBlur={() => handleFocus()}
        onChange={(e) => handleForm(e)}
        className={!focus ? 'form' : 'form error'}
        placeholder='Введите текст...'
        type="text"
      />
      <button onClick={() => handleAdded()} className={!focus ? 'add-button' : 'add-button button-error'}>Добавить</button>
    </div>
  );
};

export default Form;
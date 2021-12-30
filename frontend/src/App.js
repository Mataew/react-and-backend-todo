import React from 'react';
import './styles.css'
import Form from './Components/Form';
import Todos from './Components/todos/Todos';

const App = () => {
  return (
    <>
      <Form />
      <Todos />
    </>
  );
};

export default App
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [role, setRole] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post('/admin/create', { role })
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={onSubmit}>
      <select value={role} onChange={event => setRole(event.target.value)}>
        <option />
        <option value="admin">Администратор</option>
        <option value="driver">Водитель</option>
        <option value="operator">Оператор</option>
      </select>
      <button type="submit">Создать</button>
    </form>
  );
};

export default UserForm;

import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios
      .post('/admin/create', { role, password })
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  };
  const onPasswordChange = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPassword(target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <select
        value={role}
        onChange={event => setRole(event.target.value)}
        required
      >
        <option />
        <option value="1">Администратор</option>
        <option value="2">Водитель</option>
        <option value="3">Оператор</option>
      </select>
      <div>
        Пароль
        <input
          type="text"
          name="password"
          value={password}
          onChange={onPasswordChange}
          required
        />
      </div>
      <button type="submit">Создать</button>
    </form>
  );
};

export default UserForm;

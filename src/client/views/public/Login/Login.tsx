import * as React from 'react';
import axios from 'axios';

import Keyboard from '@components/Keyboard/Keyboard';

const setCookie = (name: string, value: string, exdays: number) => {
  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const Login = () => {
  const handleSubmit = (uid: string) => {
    axios
      .post('/login', { password: uid })
      .then(response => {
        const { token } = response.data;
        setCookie('token', token, 10);
        window.location.href = '/';
      })
      .catch(response => {
        console.log(response.data);
      });
  };

  return (
    <div className="login-view">
      <div>
        <Keyboard handleSubmit={handleSubmit} />
      </div>
      <div className="login-view__reminder">
        <h3>Админ: 123</h3>
        <h3>Оператор: 1234</h3>
        <h3>Водитель: 12345</h3>
      </div>
    </div>
  );
};

export default Login;

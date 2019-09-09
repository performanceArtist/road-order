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
      .post('/login', { uid })
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
    <div>
      <Keyboard handleSubmit={handleSubmit} />
    </div>
  );
};

export default Login;

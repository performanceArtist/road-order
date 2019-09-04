import * as React from 'react';
import { useState } from 'react';

import Arrow from '@components/Arrow/Arrow';

const Keyboard = () => {
  const [password, setPassword] = useState('');

  const handleNumberClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    setPassword(password.concat(target.innerText));
  };

  const handleSubmit = () => {
    console.log('yay', password);
  };

  const numbers = Array.from(Array(9), (el, index) => (
    <button
      className="keyboard__button"
      onClick={handleNumberClick}
      key={index}
    >
      {index + 1}
    </button>
  ));

  return (
    <div className="keyboard">
      <div className="keyboard__title">Введите свой пароль</div>
      <div className="keyboard__input-container">
        <input
          className="keyboard__input"
          type="password"
          name="password"
          value={password}
          readOnly
        />
      </div>
      <div className="keyboard__button-container">
        {numbers}
        <button className="keyboard__button" onClick={handleNumberClick}>
          {0}
        </button>
        <button
          className="keyboard__button"
          onClick={() => setPassword(password.slice(0, -1))}
        >
          <Arrow />
        </button>
        <button className="keyboard__button" onClick={handleSubmit}>
          Ввод
        </button>
      </div>
    </div>
  );
};

export default Keyboard;

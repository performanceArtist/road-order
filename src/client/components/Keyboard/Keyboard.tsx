import * as React from 'react';
import { useState } from 'react';

import Arrow from '@elements/Arrow/Arrow';

type Props = {
  handleSubmit: (uid: string) => void;
};

const Keyboard: React.FC<Props> = ({ handleSubmit = () => {} }) => {
  const [uid, setUID] = useState('');

  const handleNumberClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    setUID(uid.concat(target.innerText));
  };

  const numbers = Array.from(Array(9), (el, index) => (
    <button
      type="button"
      className="keyboard__button"
      onClick={handleNumberClick}
      key={index}
    >
      {index + 1}
    </button>
  ));

  return (
    <form
      className="keyboard"
      onSubmit={event => {
        event.preventDefault();
        handleSubmit(uid);
      }}
    >
      <div className="keyboard__title">Введите свой пароль</div>
      <div className="keyboard__input-container">
        <input
          className="keyboard__input"
          type="password"
          name="uid"
          value={uid}
          readOnly
        />
      </div>
      <div className="keyboard__button-container">
        {numbers}
        <button
          type="button"
          className="keyboard__button"
          onClick={handleNumberClick}
        >
          {0}
        </button>
        <button
          type="button"
          className="keyboard__button"
          onClick={() => setUID(uid.slice(0, -1))}
        >
          <Arrow />
        </button>
        <button className="keyboard__button" type="submit">
          Ввод
        </button>
      </div>
    </form>
  );
};

export default Keyboard;

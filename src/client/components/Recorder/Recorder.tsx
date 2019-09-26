import * as React from 'react';
import { useState } from 'react';
import { ReactMic } from 'react-mic';

import Button from '@elements/Button/Button';

type OwnProps = {
  onSaveClick: Function;
};

type Props = OwnProps;

const Recorder: React.FC<Props> = ({ onSaveClick }) => {
  const [audio, setAudio] = useState(null);
  const [record, setRecord] = useState(false);

  const renderAudio = () => {
    if (!audio) return null;
    return (
      <div className="recorder__audio">
        <audio src={URL.createObjectURL(audio.blob)} controls />
        <Button onClick={() => onSaveClick(audio.blob)} disabled={!audio}>
          Отправить
        </Button>
      </div>
    );
  };

  return (
    <div className="recorder">
      <Button onClick={() => setRecord(!record)}>
        {record ? 'Стоп' : 'Старт'}
      </Button>
      <ReactMic record={record} onStop={audio => setAudio(audio)} />
      {renderAudio()}
    </div>
  );
};

export default Recorder;

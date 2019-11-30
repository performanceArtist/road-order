import * as React from 'react';
import { useState } from 'react';

import { Button } from '@shared/view';

const { ReactMic } = require('react-mic');

type OwnProps = {
  onSaveClick: Function;
};

type Props = OwnProps;

const Recorder: React.FC<Props> = ({ onSaveClick }) => {
  type Audio = {
    blob: any;
  } | null;

  const [audio, setAudio] = useState<Audio>(null);
  const [record, setRecord] = useState(false);

  const renderAudio = () => {
    if (audio === null) return null;
    const { blob } = audio;

    return (
      <div className="recorder__audio">
        <audio src={URL.createObjectURL(blob)} controls />
        <Button onClick={() => onSaveClick(blob)} disabled={!audio}>
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
      <ReactMic record={record} onStop={(audio: any) => setAudio(audio)} />
      {renderAudio()}
    </div>
  );
};

export default Recorder;

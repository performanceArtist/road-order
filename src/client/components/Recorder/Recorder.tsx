import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { ReactMic } from 'react-mic';

import Button from '@components/Button/Button';

import { RootState } from '@redux/reducer';
import { saveAudio } from '@redux/recorder/actions';

type Props = typeof mapDispatch;

const Recorder: React.FC<Props> = ({ saveAudio }) => {
  const [audio, setAudio] = useState(null);
  const [record, setRecord] = useState(false);

  const renderAudio = () => {
    if (!audio) return null;
    return (
      <div className="recorder__audio">
        <audio src={URL.createObjectURL(audio.blob)} controls />
        <Button onClick={() => saveAudio(audio.blob)} disabled={!audio}>
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

const mapState = ({ recorder }: RootState) => ({
  ...recorder
});

const mapDispatch = { saveAudio };

export default connect(
  mapState,
  mapDispatch
)(Recorder);

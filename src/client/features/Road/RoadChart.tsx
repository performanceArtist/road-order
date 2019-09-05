import * as React from 'react';
import { useEffect } from 'react';

type Props = {
  max: number;
  min: number;
  current: number;
};

const RoadChart: React.FC<Props> = ({ max, min, current }) => {
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const config = {
    width: 800,
    height: 400
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f4f4f4';
    ctx.fillRect(0, 0, config.width, config.height);
    draw(ctx);
  }, [current]);

  const labelCount = Math.ceil((max - min) / 100) + 1;
  const labels = [...Array(labelCount)].map((el, index) => (
    <div className="road__label">{index * 100}</div>
  ));

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#78cb78';
    ctx.fillRect(
      0,
      config.height - 300,
      (current / (max - min)) * config.width,
      300
    );
  };

  return (
    <div className="road">
      <div className="road__content">
        <div className="road__chart" ref={containerRef}>
          <canvas
            className="road__canvas"
            ref={canvasRef}
            width={config.width}
            height={config.height}
          />
          <div className="road__labels">{labels}</div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default RoadChart;

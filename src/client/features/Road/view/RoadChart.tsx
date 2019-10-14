import * as React from 'react';
import { useEffect } from 'react';

type Props = {
  max: number;
  min: number;
  current: number;
};

const RoadChart: React.FC<Props> = ({ max, min, current }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const config = {
    width: 800,
    height: 400
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.fillStyle = '#f4f4f4';
    ctx.fillRect(0, 0, config.width, config.height);
    draw(ctx);
  }, [current]);

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#78cb78';
    ctx.fillRect(
      0,
      config.height - 300,
      (current / (max - min)) * config.width,
      250
    );

    ctx.fillStyle = 'black';
    ctx.fillRect(0, config.height - 50, config.width, 3);
    ctx.fillRect(
      (current / (max - min)) * config.width,
      config.height - 300,
      2,
      250
    );

    ctx.font = '18px Arial';
    const currentLabel = Math.round(current).toString();
    ctx.fillText(
      currentLabel,
      (current / (max - min)) * config.width -
        ctx.measureText(currentLabel).width / 2,
      config.height - 310
    );
    drawLabels(ctx);
  };

  const drawLabels = (ctx: CanvasRenderingContext2D) => {
    const labelCount = Math.ceil((max - min) / 100);

    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';

    [...Array(labelCount - 1)].forEach((label, index) => {
      const x = (config.width / labelCount) * (index + 1);

      const text = ((index + 1) * 100).toString();
      ctx.fillText(
        text,
        x - ctx.measureText(text).width / 2,
        config.height - 18
      );
      ctx.fillRect(x, config.height - 100, 4, 50);
    });
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
        </div>
        <div />
      </div>
    </div>
  );
};

export default RoadChart;

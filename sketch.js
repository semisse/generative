const canvasSketch = require('canvas-sketch');
const { lerp }  = require('canvas-sketch-util/math');
const random   = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 3840, 2160 ]
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 5);
  const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

  const createGrid = () => {
    const points = [];
    const count = 25;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y /(count - 1);
        const radius = Math.abs(random.noise2D(u, v));
        points.push({
          color: random.pick(["#F9F7E8", "#39304A", "#E1D89F", "#FB9F89", "#63C0AD"]),
          // color: random.pick(palette),
          radius,
          // radius: random.value() * 4,
          radius: random.value(),
          position: [ u, v ]
        });
      }
    }
    return points;
  };

  random.setSeed(12);
  const points = createGrid().filter(() => random.value() > 0.2);
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = '#F9F7E8';
    context.fillRect(0, 0, width, height);

    const sam = points.forEach(data => {
      const { position, radius, color } = data;
      const [ u, v ] = position;
      console.log(color);
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v)

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.fill();
      context.strokeLine = 10;
      context.strokeStyle = 'red';
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);

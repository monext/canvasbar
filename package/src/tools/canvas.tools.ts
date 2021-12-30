import { Config, ScrollState } from '../types';

const { devicePixelRatio } = window;

export function getElementDimension(element: HTMLCanvasElement | null) {
  return element?.getBoundingClientRect() ?? { width: 0, height: 0 };
}

export function clearCanvas(ctx: CanvasRenderingContext2D, { canvasWidth, canvasHeight }: ScrollState) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

function renderRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  if (!radius) {
    ctx.fillRect(x, y, width, height);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  }
}

export function renderThumb(ctx: CanvasRenderingContext2D, {
  type, offset, scrollBarSize, canvasHeight, canvasWidth,
}: ScrollState, { thumbColor, thumbBorderRadius, padding }: Config) {
  const paddingValue = padding * devicePixelRatio;
  let borderRadius = thumbBorderRadius;

  if (borderRadius === 'auto') {
    borderRadius = ((type === 'x' ? canvasHeight : canvasWidth) - paddingValue * 2) / 2;
  } else {
    borderRadius *= devicePixelRatio;
  }

  ctx.fillStyle = thumbColor;

  if (type === 'x') {
    renderRoundRect(
      ctx,
      offset + paddingValue,
      paddingValue,
      scrollBarSize - paddingValue * 2,
      canvasHeight - paddingValue * 2,
      borderRadius,
    );
  } else {
    renderRoundRect(
      ctx,
      paddingValue,
      offset + paddingValue,
      canvasWidth - paddingValue * 2,
      scrollBarSize - paddingValue * 2,
      borderRadius,
    );
  }
}

import type { Shape, PolygonShape } from '../types/svg';

export const exportToSVG = (shapes: Shape[], width: number, height: number): string => {
  const shapeElements = shapes.map(shape => {
    const common = `fill="${shape.fill}" stroke="${shape.stroke}" stroke-width="${shape.strokeWidth}" opacity="${shape.opacity}"`;
    
    switch (shape.type) {
      case 'rect':
        return `<rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}" ${common} />`;
      case 'circle':
        return `<circle cx="${shape.cx}" cy="${shape.cy}" r="${shape.r}" ${common} />`;
      case 'line':
        return `<line x1="${shape.x1}" y1="${shape.y1}" x2="${shape.x2}" y2="${shape.y2}" ${common} />`;
      case 'polygon':
        const points = shape.points.map(p => `${p.x},${p.y}`).join(' ');
        return `<polygon points="${points}" ${common} />`;
      case 'text':
        return `<text x="${shape.x}" y="${shape.y}" font-size="${shape.fontSize}" fill="${shape.fill}" opacity="${shape.opacity}">${shape.text}</text>`;
      default:
        return '';
    }
  }).join('\n  ');

  return `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white" />
  ${shapeElements}
</svg>`;
};

export const parseSVG = (svgContent: string): Shape[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgContent, 'image/svg+xml');
  const svgRoot = doc.querySelector('svg');
  if (!svgRoot) return [];

  const shapes: Shape[] = [];
  const elements = svgRoot.children;

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    const type = el.tagName.toLowerCase();
    if (type === 'rect' && el.getAttribute('width') === '100%') continue; // Bỏ qua background rect

    const id = crypto.randomUUID();
    const fill = el.getAttribute('fill') || '#000000';
    const stroke = el.getAttribute('stroke') || '#000000';
    const strokeWidth = parseInt(el.getAttribute('stroke-width') || '1');
    const opacity = parseFloat(el.getAttribute('opacity') || '1');

    const base = { id, stroke, fill, strokeWidth, opacity };

    switch (type) {
      case 'rect':
        shapes.push({
          ...base,
          type: 'rect',
          x: parseFloat(el.getAttribute('x') || '0'),
          y: parseFloat(el.getAttribute('y') || '0'),
          width: parseFloat(el.getAttribute('width') || '0'),
          height: parseFloat(el.getAttribute('height') || '0'),
        } as any);
        break;
      case 'circle':
        shapes.push({
          ...base,
          type: 'circle',
          cx: parseFloat(el.getAttribute('cx') || '0'),
          cy: parseFloat(el.getAttribute('cy') || '0'),
          r: parseFloat(el.getAttribute('r') || '0'),
        } as any);
        break;
      case 'line':
        shapes.push({
          ...base,
          type: 'line',
          x1: parseFloat(el.getAttribute('x1') || '0'),
          y1: parseFloat(el.getAttribute('y1') || '0'),
          x2: parseFloat(el.getAttribute('x2') || '0'),
          y2: parseFloat(el.getAttribute('y2') || '0'),
        } as any);
        break;
      case 'polygon':
        const pointsStr = el.getAttribute('points') || '';
        const points = pointsStr.split(' ').map(p => {
          const [x, y] = p.split(',').map(parseFloat);
          return { x, y };
        });
        shapes.push({
          ...base,
          type: 'polygon',
          points,
        } as PolygonShape);
        break;
      case 'text':
        shapes.push({
          ...base,
          type: 'text',
          x: parseFloat(el.getAttribute('x') || '0'),
          y: parseFloat(el.getAttribute('y') || '0'),
          text: el.textContent || '',
          fontSize: parseInt(el.getAttribute('font-size') || '20'),
        } as any);
        break;
    }
  }

  return shapes;
};

export type ShapeType = 'line' | 'rect' | 'circle' | 'polygon' | 'text';

export interface BaseShape {
  id: string;
  type: ShapeType;
  stroke: string;
  fill: string;
  strokeWidth: number;
  opacity: number;
}

export interface LineShape extends BaseShape {
  type: 'line';
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface RectShape extends BaseShape {
  type: 'rect';
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CircleShape extends BaseShape {
  type: 'circle';
  cx: number;
  cy: number;
  r: number;
}

export interface PolygonShape extends BaseShape {
  type: 'polygon';
  points: { x: number; y: number }[];
}

export interface TextShape extends BaseShape {
  type: 'text';
  x: number;
  y: number;
  text: string;
  fontSize: number;
}

export type Shape = LineShape | RectShape | CircleShape | PolygonShape | TextShape;

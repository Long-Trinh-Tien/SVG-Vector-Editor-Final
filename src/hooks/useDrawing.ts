import { useState, useCallback } from 'react';
import { Shape, ShapeType, BaseShape } from '../types/svg';
import { v4 as uuidv4 } from 'uuid';

export const useDrawing = (
  shapes: Shape[],
  setShapes: (shapes: Shape[]) => void,
  selectedTool: ShapeType | 'select',
  currentStyle: Omit<BaseShape, 'id' | 'type'>
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);

  const startDrawing = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (selectedTool === 'select') return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    const id = uuidv4();

    let newShape: Shape;
    switch (selectedTool) {
      case 'rect':
        newShape = { id, type: 'rect', x, y, width: 0, height: 0, ...currentStyle };
        break;
      case 'circle':
        newShape = { id, type: 'circle', cx: x, cy: y, r: 0, ...currentStyle };
        break;
      case 'line':
        newShape = { id, type: 'line', x1: x, y1: y, x2: x, y2: y, ...currentStyle };
        break;
      default:
        return;
    }
    setCurrentShape(newShape);
  }, [selectedTool, currentStyle]);

  const draw = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || !currentShape) return;

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentShape(prev => {
      if (!prev) return null;
      switch (prev.type) {
        case 'rect':
          return { ...prev, width: x - prev.x, height: y - prev.y };
        case 'circle':
          const r = Math.sqrt(Math.pow(x - prev.cx, 2) + Math.pow(y - prev.cy, 2));
          return { ...prev, r };
        case 'line':
          return { ...prev, x2: x, y2: y };
        default:
          return prev;
      }
    });
  }, [isDrawing, currentShape]);

  const endDrawing = useCallback(() => {
    if (isDrawing && currentShape) {
      setShapes([...shapes, currentShape]);
    }
    setIsDrawing(false);
    setCurrentShape(null);
  }, [isDrawing, currentShape, shapes, setShapes]);

  return {
    isDrawing,
    currentShape,
    startDrawing,
    draw,
    endDrawing
  };
};

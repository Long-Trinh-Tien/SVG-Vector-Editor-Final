import { useState, useCallback, useRef } from 'react';
import type { Shape, ShapeType, BaseShape } from '../types/svg';
import { v4 as uuidv4 } from 'uuid';

export const useDrawing = (
  shapes: Shape[],
  setShapes: (shapes: Shape[]) => void,
  selectedTool: ShapeType | 'select',
  currentStyle: Omit<BaseShape, 'id' | 'type'>
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const getSVGCoordinates = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
    const CTM = svg.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    return point.matrixTransform(CTM.inverse());
  };

  const startDrawing = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (selectedTool === 'select') return;

    const { x, y } = getSVGCoordinates(e);
    startPos.current = { x, y };
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

    const { x, y } = getSVGCoordinates(e);

    setCurrentShape(prev => {
      if (!prev) return null;
      switch (prev.type) {
        case 'rect':
          return {
            ...prev,
            x: Math.min(x, startPos.current.x),
            y: Math.min(y, startPos.current.y),
            width: Math.abs(x - startPos.current.x),
            height: Math.abs(y - startPos.current.y),
          };
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
      // Chỉ thêm nếu hình có kích thước thực tế
      const isValid = currentShape.type === 'line' 
        ? (currentShape.x1 !== currentShape.x2 || currentShape.y1 !== currentShape.y2)
        : (currentShape.type === 'rect' ? currentShape.width > 1 : (currentShape.type === 'circle' ? currentShape.r > 1 : true));
      
      if (isValid) {
        setShapes([...shapes, currentShape]);
      }
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

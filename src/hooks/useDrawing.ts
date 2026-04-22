import { useState, useCallback, useRef, useEffect } from 'react';
import type { Shape, ShapeType, BaseShape, PolygonShape, TextShape } from '../types/svg';
import { v4 as uuidv4 } from 'uuid';

export const useDrawing = (
  shapes: Shape[],
  setShapes: (shapes: Shape[]) => void,
  selectedTool: ShapeType | 'select',
  currentStyle: Omit<BaseShape, 'id' | 'type'>,
  onSelectShape: (id: string | null) => void
) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const getSVGCoordinates = (svg: SVGSVGElement, clientX: number, clientY: number) => {
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const CTM = svg.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    return point.matrixTransform(CTM.inverse());
  };

  const startDrawing = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (selectedTool === 'select') return;

    const { x, y } = getSVGCoordinates(e.currentTarget, e.clientX, e.clientY);
    
    // 1. Xử lý riêng cho Text
    if (selectedTool === 'text') {
      const id = uuidv4();
      const newText: TextShape = {
        id,
        type: 'text',
        x,
        y,
        text: 'New Text',
        fontSize: 20,
        ...currentStyle
      };
      setShapes([...shapes, newText]);
      onSelectShape(id); // Chọn ngay để người dùng sửa trong Properties
      return;
    }

    // 2. Xử lý riêng cho Polygon
    if (selectedTool === 'polygon') {
      if (!isDrawing) {
        setIsDrawing(true);
        const id = uuidv4();
        const newPolygon: PolygonShape = {
          id,
          type: 'polygon',
          points: [{ x, y }, { x, y }],
          ...currentStyle
        };
        setCurrentShape(newPolygon);
      } else {
        setCurrentShape(prev => {
          if (prev?.type === 'polygon') {
            return {
              ...prev,
              points: [...prev.points.slice(0, -1), { x, y }, { x, y }]
            };
          }
          return prev;
        });
      }
      return;
    }

    // 3. Xử lý các hình kéo-thả (Rect, Circle, Line)
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
      default: return;
    }
    setCurrentShape(newShape);
  }, [selectedTool, currentStyle, isDrawing, shapes, setShapes, onSelectShape]);

  const draw = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || !currentShape) return;

    const { x, y } = getSVGCoordinates(e.currentTarget, e.clientX, e.clientY);

    setCurrentShape(prev => {
      if (!prev) return null;
      switch (prev.type) {
        case 'polygon':
          const newPoints = [...prev.points];
          newPoints[newPoints.length - 1] = { x, y };
          return { ...prev, points: newPoints };
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
    if (selectedTool === 'polygon' || selectedTool === 'text') return;

    if (isDrawing && currentShape) {
      const isValid = currentShape.type === 'line' 
        ? (currentShape.x1 !== currentShape.x2 || currentShape.y1 !== currentShape.y2)
        : (currentShape.type === 'rect' ? currentShape.width > 1 : (currentShape.type === 'circle' ? currentShape.r > 1 : true));
      
      if (isValid) {
        setShapes([...shapes, currentShape]);
      }
    }
    setIsDrawing(false);
    setCurrentShape(null);
  }, [isDrawing, currentShape, shapes, setShapes, selectedTool]);

  const finishPolygon = useCallback(() => {
    if (currentShape?.type === 'polygon' && currentShape.points.length > 2) {
      const finalPoints = currentShape.points.slice(0, -1);
      setShapes([...shapes, { ...currentShape, points: finalPoints }]);
    }
    setIsDrawing(false);
    setCurrentShape(null);
  }, [currentShape, shapes, setShapes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selectedTool === 'polygon') {
        finishPolygon();
      }
      if (e.key === 'Escape') {
        setIsDrawing(false);
        setCurrentShape(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTool, finishPolygon]);

  return {
    isDrawing,
    currentShape,
    startDrawing,
    draw,
    endDrawing,
    finishPolygon
  };
};

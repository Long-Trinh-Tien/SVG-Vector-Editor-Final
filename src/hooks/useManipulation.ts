import { useState, useCallback, useRef } from 'react';
import type { Shape } from '../types/svg';

export const useManipulation = (
  shapes: Shape[],
  setShapes: (shapes: Shape[]) => void,
  selectedTool: string,
  selectedShapeId: string | null,
  onSelectShape: (id: string | null) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const getSVGCoordinates = (svg: SVGSVGElement, clientX: number, clientY: number) => {
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const CTM = svg.getScreenCTM();
    if (!CTM) return { x: 0, y: 0 };
    return point.matrixTransform(CTM.inverse());
  };

  const startDragging = useCallback((e: React.MouseEvent, shapeId: string) => {
    if (selectedTool !== 'select') return;
    
    e.stopPropagation();
    onSelectShape(shapeId);
    setIsDragging(true);

    const svg = (e.currentTarget as any).ownerSVGElement || e.currentTarget;
    const { x, y } = getSVGCoordinates(svg, e.clientX, e.clientY);
    lastMousePos.current = { x, y };
  }, [selectedTool, onSelectShape]);

  const handleDrag = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging || !selectedShapeId || selectedTool !== 'select') return;

    const { x, y } = getSVGCoordinates(e.currentTarget, e.clientX, e.clientY);
    const dx = x - lastMousePos.current.x;
    const dy = y - lastMousePos.current.y;
    lastMousePos.current = { x, y };

    setShapes(shapes.map(shape => {
      if (shape.id !== selectedShapeId) return shape;

      switch (shape.type) {
        case 'rect':
          return { ...shape, x: shape.x + dx, y: shape.y + dy };
        case 'circle':
          return { ...shape, cx: shape.cx + dx, cy: shape.cy + dy };
        case 'line':
          return { ...shape, x1: shape.x1 + dx, y1: shape.y1 + dy, x2: shape.x2 + dx, y2: shape.y2 + dy };
        case 'polygon':
          return {
            ...shape,
            points: shape.points.map(p => ({ x: p.x + dx, y: p.y + dy }))
          };
        case 'text':
          return { ...shape, x: shape.x + dx, y: shape.y + dy };
        default:
          return shape;
      }
    }));
  }, [isDragging, selectedShapeId, selectedTool, shapes, setShapes]);

  const endDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    startDragging,
    handleDrag,
    endDragging,
    isDragging
  };
};

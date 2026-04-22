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

  const getSVGCoordinates = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const point = svg.createSVGPoint();
    point.x = e.clientX;
    point.y = e.clientY;
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
    const { x, y } = getSVGCoordinates({ clientX: e.clientX, clientY: e.clientY, currentTarget: svg } as any);
    lastMousePos.current = { x, y };
  }, [selectedTool, onSelectShape]);

  const handleDrag = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging || !selectedShapeId || selectedTool !== 'select') return;

    const { x, y } = getSVGCoordinates(e);
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

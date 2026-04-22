import React, { useEffect } from 'react';
import type { Shape, ShapeType, BaseShape } from '../types/svg';
import { useDrawing } from '../hooks/useDrawing';
import { useManipulation } from '../hooks/useManipulation';

interface CanvasProps {
  shapes: Shape[];
  setShapes: (shapes: Shape[]) => void;
  selectedTool: ShapeType | 'select';
  currentStyle: Omit<BaseShape, 'id' | 'type'>;
  selectedShapeId: string | null;
  onSelectShape: (id: string | null) => void;
}

const Canvas: React.FC<CanvasProps> = ({ 
  shapes, 
  setShapes, 
  selectedTool, 
  currentStyle,
  selectedShapeId,
  onSelectShape 
}) => {
  const { currentShape, startDrawing, draw, endDrawing, finishPolygon } = useDrawing(
    shapes, 
    setShapes, 
    selectedTool, 
    currentStyle,
    onSelectShape
  );

  const { startDragging, handleDrag, endDragging } = useManipulation(
    shapes,
    setShapes,
    selectedTool,
    selectedShapeId,
    onSelectShape
  );

  // Handle Keyboard Delete
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedShapeId) {
        setShapes(shapes.filter(s => s.id !== selectedShapeId));
        onSelectShape(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedShapeId, shapes, setShapes, onSelectShape]);

  const renderShape = (shape: Shape) => {
    const isSelected = shape.id === selectedShapeId;
    const commonProps = {
      key: shape.id,
      stroke: shape.stroke,
      fill: shape.fill,
      strokeWidth: shape.strokeWidth,
      opacity: shape.opacity,
      onMouseDown: (e: React.MouseEvent) => startDragging(e, shape.id),
      className: isSelected ? 'selected-shape' : '',
      style: { 
        cursor: selectedTool === 'select' ? 'move' : 'crosshair',
        userSelect: 'none' as const
      }
    };

    switch (shape.type) {
      case 'rect':
        return <rect {...commonProps} x={shape.x} y={shape.y} width={shape.width} height={shape.height} />;
      case 'circle':
        return <circle {...commonProps} cx={shape.cx} cy={shape.cy} r={shape.r} />;
      case 'line':
        return <line {...commonProps} x1={shape.x1} y1={shape.y1} x2={shape.x2} y2={shape.y2} />;
      case 'polygon':
        const pointsString = shape.points.map(p => `${p.x},${p.y}`).join(' ');
        return <polygon {...commonProps} points={pointsString} />;
      case 'text':
        return (
          <text 
            {...commonProps} 
            x={shape.x} 
            y={shape.y} 
            fontSize={shape.fontSize}
            stroke="none" // Text usually doesn't have stroke by default in editors
            fill={shape.fill}
          >
            {shape.text}
          </text>
        );
      default:
        return null;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (selectedTool === 'select') {
      onSelectShape(null);
    } else {
      startDrawing(e);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (selectedTool === 'select') {
      handleDrag(e);
    } else {
      draw(e);
    }
  };

  const handleMouseUp = () => {
    if (selectedTool === 'select') {
      endDragging();
    } else {
      endDrawing();
    }
  };

  const handleDoubleClick = () => {
    if (selectedTool === 'polygon') {
      finishPolygon();
    }
  };

  return (
    <main className="canvas-container">
      <svg 
        className="drawing-canvas" 
        width="800" 
        height="600" 
        viewBox="0 0 800 600"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onDoubleClick={handleDoubleClick}
      >
        <rect width="100%" height="100%" fill="#ffffff" />
        {shapes.map(renderShape)}
        {currentShape && renderShape(currentShape)}
      </svg>
    </main>
  );
};

export default Canvas;

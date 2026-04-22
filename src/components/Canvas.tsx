import React from 'react';
import type { Shape, ShapeType, BaseShape } from '../types/svg';
import { useDrawing } from '../hooks/useDrawing';

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
  const { currentShape, startDrawing, draw, endDrawing } = useDrawing(
    shapes, 
    setShapes, 
    selectedTool, 
    currentStyle
  );

  const renderShape = (shape: Shape) => {
    const isSelected = shape.id === selectedShapeId;
    const commonProps = {
      key: shape.id,
      stroke: shape.stroke,
      fill: shape.fill,
      strokeWidth: shape.strokeWidth,
      opacity: shape.opacity,
      onClick: (e: React.MouseEvent) => {
        if (selectedTool === 'select') {
          e.stopPropagation();
          onSelectShape(shape.id);
        }
      },
      style: { cursor: selectedTool === 'select' ? 'pointer' : 'crosshair' },
      className: isSelected ? 'selected-shape' : ''
    };

    switch (shape.type) {
      case 'rect':
        return <rect {...commonProps} x={shape.x} y={shape.y} width={shape.width} height={shape.height} />;
      case 'circle':
        return <circle {...commonProps} cx={shape.cx} cy={shape.cy} r={shape.r} />;
      case 'line':
        return <line {...commonProps} x1={shape.x1} y1={shape.y1} x2={shape.x2} y2={shape.y2} />;
      default:
        return null;
    }
  };

  return (
    <main className="canvas-container" onClick={() => onSelectShape(null)}>
      <svg 
        className="drawing-canvas" 
        width="800" 
        height="600" 
        viewBox="0 0 800 600"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
      >
        <rect width="100%" height="100%" fill="#ffffff" />
        {shapes.map(renderShape)}
        {currentShape && renderShape(currentShape)}
      </svg>
    </main>
  );
};

export default Canvas;

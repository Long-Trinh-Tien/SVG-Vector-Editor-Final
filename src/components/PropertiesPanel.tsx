import React from 'react';
import type { Shape } from '../types/svg';

interface PropertiesPanelProps {
  selectedShape: Shape | null;
  currentStyle: {
    fill: string;
    stroke: string;
    strokeWidth: number;
    opacity: number;
  };
  onStyleChange: (style: any) => void;
  onUpdateShape: (shape: Shape) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ 
  selectedShape, 
  currentStyle, 
  onStyleChange,
  onUpdateShape 
}) => {
  const handleChange = (field: string, value: any) => {
    if (selectedShape) {
      onUpdateShape({
        ...selectedShape,
        [field]: value
      });
    } else {
      onStyleChange({
        ...currentStyle,
        [field]: value
      });
    }
  };

  const displayStyle = selectedShape || currentStyle;

  return (
    <aside className="properties-panel">
      <h3>{selectedShape ? `Edit ${selectedShape.type.toUpperCase()}` : 'Default Style'}</h3>
      
      {/* Text specific properties */}
      {selectedShape?.type === 'text' && (
        <div className="prop-section">
          <div className="prop-group">
            <label>Text Content</label>
            <input 
              type="text" 
              value={selectedShape.text} 
              onChange={(e) => handleChange('text', e.target.value)}
            />
          </div>
          <div className="prop-group">
            <label>Font Size</label>
            <input 
              type="number" 
              min="1" 
              max="200" 
              value={selectedShape.fontSize} 
              onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
            />
          </div>
        </div>
      )}

      <div className="prop-section">
        <div className="prop-group">
          <label>Fill</label>
          <input 
            type="color" 
            value={displayStyle.fill} 
            onChange={(e) => handleChange('fill', e.target.value)}
          />
        </div>
        
        {selectedShape?.type !== 'text' && (
          <>
            <div className="prop-group">
              <label>Stroke</label>
              <input 
                type="color" 
                value={displayStyle.stroke} 
                onChange={(e) => handleChange('stroke', e.target.value)}
              />
            </div>
            
            <div className="prop-group">
              <label>Stroke Width</label>
              <input 
                type="number" 
                min="0" 
                max="20" 
                value={displayStyle.strokeWidth} 
                onChange={(e) => handleChange('strokeWidth', parseInt(e.target.value))}
              />
            </div>
          </>
        )}

        <div className="prop-group">
          <label>Opacity ({Math.round(displayStyle.opacity * 100)}%)</label>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1"
            value={displayStyle.opacity} 
            onChange={(e) => handleChange('opacity', parseFloat(e.target.value))}
          />
        </div>
      </div>
    </aside>
  );
};

export default PropertiesPanel;

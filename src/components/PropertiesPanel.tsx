import React from 'react';

const PropertiesPanel: React.FC = () => {
  return (
    <aside className="properties-panel">
      <h3>Properties</h3>
      <div className="prop-group">
        <label>Fill</label>
        <input type="color" defaultValue="#e66465" />
      </div>
      <div className="prop-group">
        <label>Stroke</label>
        <input type="color" defaultValue="#000000" />
      </div>
      <div className="prop-group">
        <label>Stroke Width</label>
        <input type="number" min="0" max="20" defaultValue="1" />
      </div>
    </aside>
  );
};

export default PropertiesPanel;

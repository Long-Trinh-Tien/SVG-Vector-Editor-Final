import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <div className="tool-group">
        <h3>Tools</h3>
        {/* Icons will go here */}
        <button className="tool-btn active">Select</button>
        <button className="tool-btn">Rect</button>
        <button className="tool-btn">Circle</button>
        <button className="tool-btn">Line</button>
      </div>
    </aside>
  );
};

export default Sidebar;

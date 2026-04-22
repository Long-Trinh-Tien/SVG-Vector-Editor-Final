import React from 'react';

const Canvas: React.FC = () => {
  return (
    <main className="canvas-container">
      <svg className="drawing-canvas" width="100%" height="100%" viewBox="0 0 800 600">
        <rect width="100%" height="100%" fill="#ffffff" />
        {/* SVG Elements will be rendered here */}
      </svg>
    </main>
  );
};

export default Canvas;

import { useState, useRef } from 'react'
import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import PropertiesPanel from './components/PropertiesPanel'
import type { Shape, ShapeType } from './types/svg'
import { exportToSVG, parseSVG } from './utils/svgParser'
import './App.css'

function App() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [selectedTool, setSelectedTool] = useState<ShapeType | 'select'>('select')
  const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [currentStyle, setCurrentToolStyle] = useState({
    fill: '#e66465',
    stroke: '#000000',
    strokeWidth: 2,
    opacity: 1
  })

  const bringToFront = () => {
    if (!selectedShapeId) return;
    const shape = shapes.find(s => s.id === selectedShapeId);
    if (!shape) return;
    setShapes([...shapes.filter(s => s.id !== selectedShapeId), shape]);
  };

  const sendToBack = () => {
    if (!selectedShapeId) return;
    const shape = shapes.find(s => s.id === selectedShapeId);
    if (!shape) return;
    setShapes([shape, ...shapes.filter(s => s.id !== selectedShapeId)]);
  };

  const handleSave = () => {
    const svgContent = exportToSVG(shapes, 800, 600);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-drawing.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOpen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const loadedShapes = parseSVG(content);
      setShapes(loadedShapes);
      setSelectedShapeId(null);
    };
    reader.readAsText(file);
  };

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>SVG Vector Editor</h1>
        <div className="actions">
          <button onClick={handleSave}>Save SVG</button>
          <button onClick={() => fileInputRef.current?.click()}>Open SVG</button>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            accept=".svg" 
            onChange={handleOpen}
          />
        </div>
      </header>
      <div className="app-body">
        <Sidebar 
          selectedTool={selectedTool} 
          onSelectTool={setSelectedTool} 
        />
        <Canvas 
          shapes={shapes} 
          setShapes={setShapes}
          selectedTool={selectedTool}
          currentStyle={currentStyle}
          selectedShapeId={selectedShapeId}
          onSelectShape={setSelectedShapeId}
        />
        <PropertiesPanel 
          selectedShape={shapes.find(s => s.id === selectedShapeId) || null}
          currentStyle={currentStyle}
          onStyleChange={setCurrentToolStyle}
          onUpdateShape={(updatedShape) => {
            setShapes(shapes.map(s => s.id === updatedShape.id ? updatedShape : s))
          }}
          onBringToFront={bringToFront}
          onSendToBack={sendToBack}
        />
      </div>
    </div>
  )
}

export default App

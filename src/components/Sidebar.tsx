import React from 'react';
import { MousePointer2, Square, Circle, Minus, Type, Hexagon } from 'lucide-react';
import { ShapeType } from '../types/svg';

interface SidebarProps {
  selectedTool: ShapeType | 'select';
  onSelectTool: (tool: ShapeType | 'select') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTool, onSelectTool }) => {
  const tools: { id: ShapeType | 'select'; icon: any; label: string }[] = [
    { id: 'select', icon: MousePointer2, label: 'Select' },
    { id: 'rect', icon: Square, label: 'Rect' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'line', icon: Minus, label: 'Line' },
    { id: 'polygon', icon: Hexagon, label: 'Polygon' },
    { id: 'text', icon: Type, label: 'Text' },
  ];

  return (
    <aside className="sidebar">
      <div className="tool-group">
        <h3>Tools</h3>
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`tool-btn ${selectedTool === tool.id ? 'active' : ''}`}
            onClick={() => onSelectTool(tool.id)}
            title={tool.label}
          >
            <tool.icon size={24} />
            <span>{tool.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

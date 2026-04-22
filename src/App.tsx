import Sidebar from './components/Sidebar'
import Canvas from './components/Canvas'
import PropertiesPanel from './components/PropertiesPanel'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>SVG Vector Editor</h1>
        <div className="actions">
          <button>Save SVG</button>
          <button>Open SVG</button>
        </div>
      </header>
      <div className="app-body">
        <Sidebar />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  )
}

export default App

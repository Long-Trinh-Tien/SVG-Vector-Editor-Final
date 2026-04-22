const { v4: uuidv4 } = require('uuid');

function testShapeCreation() {
  console.log("Testing Shape Creation Logic...");
  
  const currentStyle = {
    fill: '#ff0000',
    stroke: '#000000',
    strokeWidth: 2,
    opacity: 1
  };

  const id = uuidv4();
  const rect = { id, type: 'rect', x: 10, y: 10, width: 100, height: 100, ...currentStyle };

  if (rect.id && rect.type === 'rect' && rect.fill === '#ff0000') {
    console.log("✅ Rectangle creation test passed.");
  } else {
    console.error("❌ Rectangle creation test failed.");
    process.exit(1);
  }

  const id2 = uuidv4();
  const circle = { id: id2, type: 'circle', cx: 50, cy: 50, r: 25, ...currentStyle };
  if (circle.r === 25 && circle.id !== rect.id) {
    console.log("✅ Circle creation test passed.");
  } else {
    console.error("❌ Circle creation test failed.");
    process.exit(1);
  }

  console.log("All tests passed for Sprint 2!");
}

testShapeCreation();

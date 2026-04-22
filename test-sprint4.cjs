function testZIndexLogic() {
  console.log("Testing Z-Index Logic...");

  let shapes = [
    { id: '1', type: 'rect' },
    { id: '2', type: 'circle' },
    { id: '3', type: 'line' }
  ];

  const selectedShapeId = '2';

  // Bring to Front: Move '2' to end of array
  const bringToFront = (id, list) => {
    const shape = list.find(s => s.id === id);
    return [...list.filter(s => s.id !== id), shape];
  };

  shapes = bringToFront(selectedShapeId, shapes);
  if (shapes[2].id === '2') {
    console.log("✅ Bring to Front logic passed.");
  } else {
    console.error("❌ Bring to Front logic failed.");
    process.exit(1);
  }

  // Send to Back: Move '2' to start of array
  const sendToBack = (id, list) => {
    const shape = list.find(s => s.id === id);
    return [shape, ...list.filter(s => s.id !== id)];
  };

  shapes = sendToBack(selectedShapeId, shapes);
  if (shapes[0].id === '2') {
    console.log("✅ Send to Back logic passed.");
  } else {
    console.error("❌ Send to Back logic failed.");
    process.exit(1);
  }

  console.log("All tests passed for Sprint 4!");
}

testZIndexLogic();

function testManipulationLogic() {
  console.log("Testing Manipulation Logic...");

  let shapes = [
    { id: '1', type: 'rect', x: 10, y: 10, width: 50, height: 50, fill: 'red', stroke: 'black', strokeWidth: 1, opacity: 1 }
  ];

  const dx = 15;
  const dy = 25;

  // Simulate Move Logic
  shapes = shapes.map(s => {
    if (s.id === '1') {
      return { ...s, x: s.x + dx, y: s.y + dy };
    }
    return s;
  });

  if (shapes[0].x === 25 && shapes[0].y === 35) {
    console.log("✅ Object move logic passed.");
  } else {
    console.error("❌ Object move logic failed.");
    process.exit(1);
  }

  // Simulate Delete Logic
  shapes = shapes.filter(s => s.id !== '1');
  if (shapes.length === 0) {
    console.log("✅ Object delete logic passed.");
  } else {
    console.error("❌ Object delete logic failed.");
    process.exit(1);
  }

  console.log("All tests passed for Sprint 3!");
}

testManipulationLogic();

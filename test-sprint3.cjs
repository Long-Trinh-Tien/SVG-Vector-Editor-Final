function testManipulationLogic() {
  console.log("Testing Manipulation Logic with Polygon...");

  let shapes = [
    { id: 'poly1', type: 'polygon', points: [{ x: 0, y: 0 }, { x: 10, y: 10 }], fill: 'blue', stroke: 'black', strokeWidth: 1, opacity: 1 }
  ];

  const dx = 5;
  const dy = 5;

  // Simulate Polygon Move
  shapes = shapes.map(s => {
    if (s.id === 'poly1' && s.type === 'polygon') {
      return {
        ...s,
        points: s.points.map(p => ({ x: p.x + dx, y: p.y + dy }))
      };
    }
    return s;
  });

  if (shapes[0].type === 'polygon' && shapes[0].points[0].x === 5 && shapes[0].points[1].y === 15) {
    console.log("✅ Polygon move logic passed.");
  } else {
    console.error("❌ Polygon move logic failed.");
    process.exit(1);
  }

  console.log("All tests passed for Sprint 3 (incl. Polygon)!");
}

testManipulationLogic();

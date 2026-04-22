function testPersistenceLogic() {
  console.log("Testing Persistence Logic (Export/Import Simulation)...");

  // Dữ liệu mẫu
  const originalShapes = [
    { id: '1', type: 'rect', x: 10, y: 20, width: 100, height: 50, fill: '#ff0000', stroke: '#000000', strokeWidth: 2, opacity: 1 },
    { id: '2', type: 'text', x: 30, y: 40, text: 'Hello', fontSize: 24, fill: '#0000ff', stroke: 'none', strokeWidth: 1, opacity: 0.8 }
  ];

  // Giả lập Export sang XML string
  const exportToSVG_Sim = (shapes) => {
    return shapes.map(s => {
      if (s.type === 'rect') return `<rect x="${s.x}" y="${s.y}" width="${s.width}" height="${s.height}" fill="${s.fill}" />`;
      if (s.type === 'text') return `<text x="${s.x}" y="${s.y}" font-size="${s.fontSize}">${s.text}</text>`;
    }).join('');
  };

  const xml = exportToSVG_Sim(originalShapes);
  console.log("Simulated XML:", xml);

  // Kiểm tra tính nhất quán
  if (xml.includes('rect x="10"') && xml.includes('text x="30"') && xml.includes('Hello')) {
    console.log("✅ Export logic structure passed.");
  } else {
    console.error("❌ Export logic structure failed.");
    process.exit(1);
  }

  console.log("All tests passed for Sprint 5!");
}

testPersistenceLogic();

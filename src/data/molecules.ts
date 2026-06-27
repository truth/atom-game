export interface Molecule {
  id: string;
  name: string;
  formula: string;
  description: string;
  category: string;
  structure: {
    atoms: { id: number; symbol: string; x: number; y: number; size: number; color: string }[];
    bonds: { source: number; target: number; type: 1 | 2 | 3 }[];
  };
}

export const molecules: Molecule[] = [
  {
    id: "h2o",
    name: "水",
    formula: "H₂O",
    description: "地球上最常见的物质之一，是包括无机化合、人类在内所有生命生存的重要资源，也是生物体最重要的组成部分。",
    category: "无机物",
    structure: {
      atoms: [
        { id: 0, symbol: "O", x: 150, y: 120, size: 40, color: "bg-red-500" },
        { id: 1, symbol: "H", x: 90, y: 180, size: 25, color: "bg-slate-300" },
        { id: 2, symbol: "H", x: 210, y: 180, size: 25, color: "bg-slate-300" }
      ],
      bonds: [
        { source: 0, target: 1, type: 1 },
        { source: 0, target: 2, type: 1 }
      ]
    }
  },
  {
    id: "co2",
    name: "二氧化碳",
    formula: "CO₂",
    description: "一种碳氧化合物，常温常压下是一种无色无味的气体，也是一种常见的温室气体。",
    category: "无机物",
    structure: {
      atoms: [
        { id: 0, symbol: "C", x: 150, y: 150, size: 35, color: "bg-slate-700" },
        { id: 1, symbol: "O", x: 70, y: 150, size: 40, color: "bg-red-500" },
        { id: 2, symbol: "O", x: 230, y: 150, size: 40, color: "bg-red-500" }
      ],
      bonds: [
        { source: 0, target: 1, type: 2 },
        { source: 0, target: 2, type: 2 }
      ]
    }
  },
  {
    id: "nh3",
    name: "氨气",
    formula: "NH₃",
    description: "一种无色气体，有强烈的刺激气味。极易溶于水，常温常压下1体积水可溶解700倍体积氨。",
    category: "无机物",
    structure: {
      atoms: [
        { id: 0, symbol: "N", x: 150, y: 120, size: 40, color: "bg-blue-500" },
        { id: 1, symbol: "H", x: 90, y: 180, size: 25, color: "bg-slate-300" },
        { id: 2, symbol: "H", x: 150, y: 200, size: 25, color: "bg-slate-300" },
        { id: 3, symbol: "H", x: 210, y: 180, size: 25, color: "bg-slate-300" }
      ],
      bonds: [
        { source: 0, target: 1, type: 1 },
        { source: 0, target: 2, type: 1 },
        { source: 0, target: 3, type: 1 }
      ]
    }
  },
  {
    id: "ch4",
    name: "甲烷",
    formula: "CH₄",
    description: "最简单的有机物，也是含碳量最小的烃。是天然气、沼气、坑气等的主要成分。",
    category: "有机物",
    structure: {
      atoms: [
        { id: 0, symbol: "C", x: 150, y: 150, size: 35, color: "bg-slate-700" },
        { id: 1, symbol: "H", x: 150, y: 70, size: 25, color: "bg-slate-300" },
        { id: 2, symbol: "H", x: 90, y: 190, size: 25, color: "bg-slate-300" },
        { id: 3, symbol: "H", x: 210, y: 190, size: 25, color: "bg-slate-300" },
        { id: 4, symbol: "H", x: 150, y: 210, size: 25, color: "bg-slate-300" }
      ],
      bonds: [
        { source: 0, target: 1, type: 1 },
        { source: 0, target: 2, type: 1 },
        { source: 0, target: 3, type: 1 },
        { source: 0, target: 4, type: 1 }
      ]
    }
  },
  {
    id: "c2h5oh",
    name: "乙醇",
    formula: "C₂H₅OH",
    description: "俗称酒精，在常温常压下是一种易燃、易挥发的无色透明液体，低毒性，纯液体不可直接饮用。",
    category: "有机物",
    structure: {
      atoms: [
        { id: 0, symbol: "C", x: 120, y: 150, size: 35, color: "bg-slate-700" },
        { id: 1, symbol: "C", x: 180, y: 150, size: 35, color: "bg-slate-700" },
        { id: 2, symbol: "O", x: 230, y: 110, size: 40, color: "bg-red-500" },
        { id: 3, symbol: "H", x: 120, y: 90, size: 25, color: "bg-slate-300" },
        { id: 4, symbol: "H", x: 70, y: 150, size: 25, color: "bg-slate-300" },
        { id: 5, symbol: "H", x: 120, y: 210, size: 25, color: "bg-slate-300" },
        { id: 6, symbol: "H", x: 180, y: 90, size: 25, color: "bg-slate-300" },
        { id: 7, symbol: "H", x: 180, y: 210, size: 25, color: "bg-slate-300" },
        { id: 8, symbol: "H", x: 270, y: 140, size: 25, color: "bg-slate-300" }
      ],
      bonds: [
        { source: 0, target: 1, type: 1 },
        { source: 1, target: 2, type: 1 },
        { source: 0, target: 3, type: 1 },
        { source: 0, target: 4, type: 1 },
        { source: 0, target: 5, type: 1 },
        { source: 1, target: 6, type: 1 },
        { source: 1, target: 7, type: 1 },
        { source: 2, target: 8, type: 1 }
      ]
    }
  },
  {
    id: "nacl",
    name: "氯化钠",
    formula: "NaCl",
    description: "食盐的主要成分，离子型化合物。无色立方结晶或细小结晶粉末，味咸。其来源主要是海水。",
    category: "无机物",
    structure: {
      atoms: [
        { id: 0, symbol: "Na", x: 100, y: 150, size: 35, color: "bg-purple-500" },
        { id: 1, symbol: "Cl", x: 200, y: 150, size: 45, color: "bg-green-500" }
      ],
      bonds: [
        { source: 0, target: 1, type: 1 } // Ionic bond representation
      ]
    }
  }
];

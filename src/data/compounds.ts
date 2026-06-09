export interface CompoundQuest {
  id: string;
  name: string;
  formula: string;
  description: string;
  components: {
    symbol: string;
    count: number;
  }[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export const compounds: CompoundQuest[] = [
  {
    id: 'c1',
    name: '水',
    formula: 'H2O',
    description: '所有已知生命形式的必需物质。它覆盖了地球表面的71%。',
    components: [
      { count: 2, symbol: 'H' },
      { count: 1, symbol: 'O' }
    ],
    difficulty: 'easy'
  },
  {
    id: 'c2',
    name: '食盐',
    formula: 'NaCl',
    description: '常用作调味品和食品防腐剂。',
    components: [
      { count: 1, symbol: 'Na' },
      { count: 1, symbol: 'Cl' }
    ],
    difficulty: 'easy'
  },
  {
    id: 'c3',
    name: '二氧化碳',
    formula: 'CO2',
    description: '一种温室气体，由动物呼出，并被植物用于光合作用。',
    components: [
      { count: 1, symbol: 'C' },
      { count: 2, symbol: 'O' }
    ],
    difficulty: 'easy'
  },
  {
    id: 'c4',
    name: '氨气',
    formula: 'NH3',
    description: '一种有刺鼻气味的无色气体，广泛用于化肥。',
    components: [
      { count: 1, symbol: 'N' },
      { count: 3, symbol: 'H' }
    ],
    difficulty: 'medium'
  },
  {
    id: 'c5',
    name: '甲烷',
    formula: 'CH4',
    description: '天然气的主要成分，一种强效温室气体。',
    components: [
      { count: 1, symbol: 'C' },
      { count: 4, symbol: 'H' }
    ],
    difficulty: 'medium'
  },
  {
    id: 'c6',
    name: '硫酸',
    formula: 'H2SO4',
    description: '一种强腐蚀性的无机酸。世界上产量最大的化学品。',
    components: [
      { count: 2, symbol: 'H' },
      { count: 1, symbol: 'S' },
      { count: 4, symbol: 'O' }
    ],
    difficulty: 'hard'
  },
  {
    id: 'c7',
    name: '葡萄糖',
    formula: 'C6H12O6',
    description: '一种单糖，是生物体中重要的能量来源。',
    components: [
      { count: 6, symbol: 'C' },
      { count: 12, symbol: 'H' },
      { count: 6, symbol: 'O' }
    ],
    difficulty: 'hard'
  }
];

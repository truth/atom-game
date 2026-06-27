export const getPinyin = (symbol: string): string => {
  const pinyinMap: Record<string, string> = {
    'H': 'qīng', 'He': 'hài', 'Li': 'lǐ', 'Be': 'pí', 'B': 'péng',
    'C': 'tàn', 'N': 'dàn', 'O': 'yǎng', 'F': 'fú', 'Ne': 'nǎi',
    'Na': 'nà', 'Mg': 'měi', 'Al': 'lǚ', 'Si': 'guī', 'P': 'lín',
    'S': 'liú', 'Cl': 'lǜ', 'Ar': 'yà', 'K': 'jiǎ', 'Ca': 'gài',
    'Sc': 'kàng', 'Ti': 'tài', 'V': 'fán', 'Cr': 'gè', 'Mn': 'měng',
    'Fe': 'tiě', 'Co': 'gǔ', 'Ni': 'niè', 'Cu': 'tóng', 'Zn': 'xīn',
    'Ga': 'jiā', 'Ge': 'zhě', 'As': 'shēn', 'Se': 'xī', 'Br': 'xiù', 'Kr': 'kè',
    'Rb': 'rú', 'Sr': 'sī', 'Y': 'yǐ', 'Zr': 'gào', 'Nb': 'ní', 'Mo': 'mù', 'Tc': 'dé', 'Ru': 'liǎo', 'Rh': 'lǎo', 'Pd': 'pá',
    'Ag': 'yín', 'Cd': 'gé', 'In': 'yīn', 'Sn': 'xī', 'Sb': 'tī', 'Te': 'dì', 'I': 'diǎn', 'Xe': 'xiān',
    'Cs': 'sè', 'Ba': 'bèi', 'La': 'lán', 'Ce': 'shī', 'Pr': 'pǔ', 'Nd': 'nǚ', 'Pm': 'pǒ', 'Sm': 'shān', 'Eu': 'yǒu', 'Gd': 'gá', 'Tb': 'tè', 'Dy': 'dí', 'Ho': 'huǒ', 'Er': 'ěr', 'Tm': 'diū', 'Yb': 'yì', 'Lu': 'lǔ',
    'Hf': 'hā', 'Ta': 'tǎn', 'W': 'wū', 'Re': 'lái', 'Os': 'é', 'Ir': 'yī', 'Pt': 'bó', 'Au': 'jīn', 'Hg': 'gǒng', 'Tl': 'tā', 'Pb': 'qiān', 'Bi': 'bì', 'Po': 'pō', 'At': 'ài', 'Rn': 'dōng',
    'Fr': 'fāng', 'Ra': 'léi', 'Ac': 'ā', 'Th': 'tǔ', 'Pa': 'pú', 'U': 'yóu', 'Np': 'ná', 'Pu': 'bù', 'Am': 'méi', 'Cm': 'jū', 'Bk': 'péi', 'Cf': 'kāi', 'Es': 'āi', 'Fm': 'fèi', 'Md': 'mén', 'No': 'nuò', 'Lr': 'láo',
    'Rf': 'lú', 'Db': 'dù', 'Sg': 'xǐ', 'Bh': 'bō', 'Hs': 'hēi', 'Mt': 'mài', 'Ds': 'dá', 'Rg': 'lún', 'Cn': 'gē', 'Nh': 'ěr', 'Fl': 'fū', 'Mc': 'mò', 'Lv': 'lì', 'Ts': 'tián', 'Og': 'ào'
  };
  return pinyinMap[symbol] || '';
};

export const mnemonicGroups = [
  { range: "1-5", text: "轻嗨里皮朋" },
  { range: "6-10", text: "探蛋养福奶" },
  { range: "11-15", text: "那美旅归林" },
  { range: "16-20", text: "留绿亚甲盖" },
  { range: "21-25", text: "抗太凡各猛" },
  { range: "26-30", text: "铁古聂同辛" },
  { range: "31-35", text: "家者深西秀" },
  { range: "36-40", text: "克如思乙告" },
  { range: "41-45", text: "尼目得了老" },
  { range: "46-50", text: "把银隔因西" },
  { range: "51-55", text: "梯地点仙色" },
  { range: "56-60", text: "贝蓝市普女" },
  { range: "61-65", text: "颇山有嘎特" },
  { range: "66-70", text: "敌火耳丢意" },
  { range: "71-75", text: "鲁哈坦乌来" },
  { range: "76-80", text: "鹅衣伯金拱" },
  { range: "81-85", text: "他千必泼爱" },
  { range: "86-90", text: "冬方雷阿土" },
  { range: "91-95", text: "仆由拿不眉" },
  { range: "96-100", text: "居陪开哀费" },
  { range: "101-105", text: "门诺劳卢杜" },
  { range: "106-110", text: "喜波黑麦达" },
  { range: "111-115", text: "伦哥尔夫莫" },
  { range: "116-118", text: "立田奥" }
];

export const getMnemonicGroup = (atomicNumber: number): string => {
  const groupIndex = Math.ceil(atomicNumber / 5) - 1;
  const group = mnemonicGroups[groupIndex];
  if (group) {
    return `${group.range}: ${group.text}`;
  }
  return '';
};

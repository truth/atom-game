export const getPinyin = (symbol: string): string => {
  const pinyinMap: Record<string, string> = {
    'H': 'qīng', 'He': 'hài', 'Li': 'lǐ', 'Be': 'pí', 'B': 'péng',
    'C': 'tàn', 'N': 'dàn', 'O': 'yǎng', 'F': 'fú', 'Ne': 'nǎi',
    'Na': 'nà', 'Mg': 'měi', 'Al': 'lǚ', 'Si': 'guī', 'P': 'lín',
    'S': 'liú', 'Cl': 'lǜ', 'Ar': 'yà', 'K': 'jiǎ', 'Ca': 'gài',
    'Sc': 'kàng', 'Ti': 'tài', 'V': 'fán', 'Cr': 'gè', 'Mn': 'měng',
    'Fe': 'tiě', 'Co': 'gǔ', 'Ni': 'niè', 'Cu': 'tóng', 'Zn': 'xīn',
    'Ga': 'jiā', 'Ge': 'zhě', 'As': 'shēn', 'Se': 'xī', 'Br': 'xiù', 'Kr': 'kè',
    'Rb': 'rú', 'Sr': 'sī', 'Y': 'yǐ', 'Zr': 'gào', 'Nb': 'ní', 'Mo': 'mù', 'Tc': 'dé', 'Ru': 'liǎo', 'Rh': 'lǎo', 'Pd': 'bǎ',
    'Ag': 'yín', 'Cd': 'gé', 'In': 'yīn', 'Sn': 'xī', 'Sb': 'tī', 'Te': 'dì', 'I': 'diǎn', 'Xe': 'xiān',
    'Cs': 'sè', 'Ba': 'bèi', 'La': 'lán', 'Ce': 'shī', 'Pr': 'pǔ', 'Nd': 'nǚ', 'Pm': 'jǔ', 'Sm': 'shān', 'Eu': 'yǒu', 'Gd': 'gá', 'Tb': 'tè', 'Dy': 'dī', 'Ho': 'huǒ', 'Er': 'ěr', 'Tm': 'diū', 'Yb': 'yì', 'Lu': 'lǔ',
    'Hf': 'hā', 'Ta': 'tǎn', 'W': 'wū', 'Re': 'lái', 'Os': 'é', 'Ir': 'yī', 'Pt': 'bó', 'Au': 'jīn', 'Hg': 'gǒng', 'Tl': 'tā', 'Pb': 'qiān', 'Bi': 'bì', 'Po': 'pō', 'At': 'ài', 'Rn': 'dōng',
    'Fr': 'fāng', 'Ra': 'léi', 'Ac': 'ā', 'Th': 'tǔ', 'Pa': 'pú', 'U': 'yóu', 'Np': 'ná', 'Pu': 'bù', 'Am': 'méi', 'Cm': 'jū', 'Bk': 'péi', 'Cf': 'kāi', 'Es': 'āi', 'Fm': 'fèi', 'Md': 'mén', 'No': 'nuò', 'Lr': 'láo',
    'Rf': 'lú', 'Db': 'dù', 'Sg': 'xǐ', 'Bh': 'bō', 'Hs': 'hēi', 'Mt': 'mài', 'Ds': 'dá', 'Rg': 'lún', 'Cn': 'kē', 'Nh': 'nǐ', 'Fl': 'fū', 'Mc': 'mò', 'Lv': 'lì', 'Ts': 'tián', 'Og': 'ào'
  };
  return pinyinMap[symbol] || '';
};

export const getMnemonic = (period: number): string => {
  const periodMnemonics: Record<number, string> = {
    1: '氢(qīng) 氦(hài) — (侵害)',
    2: '锂(lǐ) 铍(pí) 硼(péng) 碳(tàn) 氮(dàn) 氧(yǎng) 氟(fú) 氖(nǎi) — (李皮捧碳 蛋养福奶)',
    3: '钠(nà) 镁(měi) 铝(lǚ) 硅(guī) 磷(lín) 硫(liú) 氯(lǜ) 氩(yà) — (那美女桂林留绿牙)',
    4: '钾(jiǎ) 钙(gài) 钪(kàng) 钛(tài) 钒(fán) 铬(gè) 锰(měng) 铁(tiě) 钴(gǔ) 镍(niè) 铜(tóng) 锌(xīn) 镓(jiā) 锗(zhě) 砷(shēn) 硒(xī) 溴(xiù) 氪(kè) — (嫁改康太反革命，铁姑捏痛新嫁者，生气休克)',
    5: '铷(rú) 锶(sī) 钇(yǐ) 锆(gào) 铌(ní) 钼(mù) 锝(dé) 钌(liǎo) 铑(lǎo) 钯(bǎ) 银(yín) 镉(gé) 铟(yīn) 锡(xī) 锑(tī) 碲(dì) 碘(diǎn) 氙(xiān) — (如此一告你，不得了，老把银哥印西堤，地点仙)',
    6: '铯(sè) 钡(bèi) 镧(lán) 铪(hā) 钽(tǎn) 钨(wū) 铼(lái) 锇(é) 铱(yī) 铂(bó) 金(jīn) 汞(gǒng) 铊(tā) 铅(qiān) 铋(bì) 钋(pō) 砹(ài) 氡(dōng) — (色贝兰哈坦乌来，阿姨白金汞他铅，必破爱冬)',
    7: '钫(fāng) 镭(léi) 锕(ā) 𬬻(lú) 𬭊(dù) 𬭳(xǐ) 𬭶(bō) 𬭢(hēi) 迈(mài) 达(dá) 仑(lún) 𬬭(kē) 鿔(gē) 鿭(nǐ) 𫓧(fū) 镆(mò) 鉝(lì) 鿬(tián) 鿫(ào) — (防雷啊，炉杜喜波黑麦达仑，科哥拟夫莫立田奥)'
  };
  return periodMnemonics[period] || '暂无该周期的速记口诀';
};

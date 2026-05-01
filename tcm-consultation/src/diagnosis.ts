import { DiagnosisResult, DiagnosisData } from '../types';

const SYNDROME_DATABASE: Record<string, Omit<DiagnosisResult, 'prescription' | 'lifestyleAdvice' | 'prognosis'>> = {
  '肝郁气滞': {
    syndrome: '肝郁气滞',
    syndromeDescription: '情志不畅，肝气郁结，气机运行不畅，导致胸胁胀满、情绪抑郁等症状。',
    pathogenesis: '长期情志抑郁或精神刺激，导致肝失疏泄，气机郁滞。',
    treatment principle: '疏肝解郁，理气和中'
  },
  '心脾两虚': {
    syndrome: '心脾两虚',
    syndromeDescription: '心血不足，脾气虚弱，运化失职，导致心悸、失眠、食欲不振等症状。',
    pathogenesis: '久病体虚、过度劳累、饮食不节损伤脾气，心血生成不足。',
    treatment principle: '补益心脾，益气养血'
  },
  '肾阳虚': {
    syndrome: '肾阳虚',
    syndromeDescription: '肾阳不足，温煦失职，导致畏寒肢冷、腰膝酸软、夜尿频繁等症状。',
    pathogenesis: '年高肾亏、久病伤阳、房劳过度耗伤肾阳。',
    treatment principle: '温补肾阳，填精养血'
  },
  '脾胃湿热': {
    syndrome: '脾胃湿热',
    syndromeDescription: '湿热内蕴脾胃，导致脘腹胀满、口苦黏腻、大便黏滞等症状。',
    pathogenesis: '饮食不节，过食肥甘厚味，湿热内生，困阻脾胃。',
    treatment principle: '清热利湿，健脾和胃'
  },
  '肺气虚': {
    syndrome: '肺气虚',
    syndromeDescription: '肺气不足，宣降失职，导致咳喘无力、气短懒言、容易感冒等症状。',
    pathogenesis: '久病咳喘耗伤肺气，或先天禀赋不足，肺气虚弱。',
    treatment principle: '补益肺气，止咳平喘'
  },
  '痰湿体质': {
    syndrome: '痰湿体质',
    syndromeDescription: '体内痰湿内盛，导致体形肥胖、头身困重、痰多胸闷等症状。',
    pathogenesis: '脾虚失运，水湿内停，聚湿生痰，痰湿内阻。',
    treatment principle: '燥湿化痰，理气健脾'
  },
  '阴虚火旺': {
    syndrome: '阴虚火旺',
    syndromeDescription: '阴液不足，虚火内生，导致口干咽燥、失眠多梦、潮热盗汗等症状。',
    pathogenesis: '热病伤阴、情志过极、房劳过度耗伤阴液，阴不制阳。',
    treatment principle: '滋阴降火，清热除烦'
  },
  '气血两虚': {
    syndrome: '气血两虚',
    syndromeDescription: '气虚与血虚同时存在，导致面色苍白、头晕乏力、心悸失眠等症状。',
    pathogenesis: '久病不愈、气血两伤，或失血过多、气随血脱。',
    treatment principle: '益气补血，健脾养心'
  }
};

const PRESCRIPTIONS: Record<string, { medicines: { name: string; dosage: string; usage: string }[] }> = {
  '肝郁气滞': {
    medicines: [
      { name: '柴胡', dosage: '10g', usage: '疏肝解郁' },
      { name: '香附', dosage: '10g', usage: '理气宽中' },
      { name: '川芎', dosage: '6g', usage: '活血行气' },
      { name: '枳壳', dosage: '10g', usage: '理气消胀' },
      { name: '白芍', dosage: '12g', usage: '养血柔肝' },
      { name: '甘草', dosage: '3g', usage: '调和诸药' }
    ]
  },
  '心脾两虚': {
    medicines: [
      { name: '党参', dosage: '15g', usage: '补中益气' },
      { name: '黄芪', dosage: '20g', usage: '益气固表' },
      { name: '白术', dosage: '12g', usage: '健脾燥湿' },
      { name: '茯苓', dosage: '15g', usage: '利水渗湿' },
      { name: '当归', dosage: '10g', usage: '补血活血' },
      { name: '酸枣仁', dosage: '15g', usage: '养心安神' }
    ]
  },
  '肾阳虚': {
    medicines: [
      { name: '附子', dosage: '6g', usage: '温肾助阳' },
      { name: '肉桂', dosage: '3g', usage: '温经散寒' },
      { name: '熟地黄', dosage: '15g', usage: '滋阴补血' },
      { name: '山茱萸', dosage: '10g', usage: '补益肝肾' },
      { name: '杜仲', dosage: '12g', usage: '补肾强腰' },
      { name: '菟丝子', dosage: '15g', usage: '补肾益精' }
    ]
  },
  '脾胃湿热': {
    medicines: [
      { name: '黄连', dosage: '6g', usage: '清热燥湿' },
      { name: '黄芩', dosage: '10g', usage: '清热泻火' },
      { name: '茵陈', dosage: '15g', usage: '清利湿热' },
      { name: '茯苓', dosage: '15g', usage: '利水渗湿' },
      { name: '白术', dosage: '12g', usage: '健脾燥湿' },
      { name: '薏苡仁', dosage: '20g', usage: '利湿健脾' }
    ]
  },
  '肺气虚': {
    medicines: [
      { name: '人参', dosage: '6g', usage: '大补元气' },
      { name: '黄芪', dosage: '20g', usage: '益气固表' },
      { name: '白术', dosage: '12g', usage: '健脾益气' },
      { name: '防风', dosage: '6g', usage: '祛风解表' },
      { name: '百部', dosage: '10g', usage: '润肺止咳' },
      { name: '甘草', dosage: '3g', usage: '调和诸药' }
    ]
  },
  '痰湿体质': {
    medicines: [
      { name: '陈皮', dosage: '10g', usage: '理气化痰' },
      { name: '半夏', dosage: '10g', usage: '燥湿化痰' },
      { name: '茯苓', dosage: '15g', usage: '利水渗湿' },
      { name: '白术', dosage: '12g', usage: '健脾燥湿' },
      { name: '薏苡仁', dosage: '20g', usage: '利湿健脾' },
      { name: '甘草', dosage: '3g', usage: '调和诸药' }
    ]
  },
  '阴虚火旺': {
    medicines: [
      { name: '知母', dosage: '10g', usage: '清热泻火' },
      { name: '黄柏', dosage: '6g', usage: '滋阴降火' },
      { name: '熟地黄', dosage: '15g', usage: '滋阴补血' },
      { name: '山茱萸', dosage: '10g', usage: '补益肝肾' },
      { name: '麦冬', dosage: '15g', usage: '养阴润燥' },
      { name: '五味子', dosage: '6g', usage: '收敛固涩' }
    ]
  },
  '气血两虚': {
    medicines: [
      { name: '人参', dosage: '6g', usage: '大补元气' },
      { name: '黄芪', dosage: '20g', usage: '益气养血' },
      { name: '当归', dosage: '10g', usage: '补血活血' },
      { name: '熟地黄', dosage: '15g', usage: '滋阴补血' },
      { name: '白术', dosage: '12g', usage: '健脾益气' },
      { name: '酸枣仁', dosage: '15g', usage: '养心安神' }
    ]
  }
};

const LIFESTYLE_ADVICE: Record<string, string[]> = {
  '肝郁气滞': [
    '保持心情舒畅，避免情绪抑郁',
    '适当进行户外活动，如散步、太极',
    '多食用疏肝理气的食物，如柑橘、玫瑰花茶',
    '避免熬夜，保证充足睡眠'
  ],
  '心脾两虚': [
    '规律作息，避免过度劳累',
    '饮食宜清淡营养，多食用红枣、桂圆等',
    '适当进行温和运动，如散步、瑜伽',
    '避免精神紧张，保持心态平和'
  ],
  '肾阳虚': [
    '注意保暖，尤其是腰膝部',
    '适当食用温补肾阳的食物，如羊肉、核桃',
    '避免过度劳累和房事过度',
    '多晒太阳，适度运动'
  ],
  '脾胃湿热': [
    '饮食清淡，避免辛辣油腻',
    '多食用利湿食物，如冬瓜、薏仁',
    '戒酒，避免生冷食物',
    '保持大便通畅'
  ],
  '肺气虚': [
    '预防感冒，及时增减衣物',
    '多食用补肺食物，如银耳、百合',
    '适当进行深呼吸练习',
    '避免在污染环境中久留'
  ],
  '痰湿体质': [
    '控制饮食，避免肥甘厚味',
    '多食用健脾利湿食物，如山药、茯苓',
    '坚持适度运动，如快走、游泳',
    '避免久坐，保持气血畅通'
  ],
  '阴虚火旺': [
    '饮食宜清淡，多食用滋阴食物',
    '避免辛辣刺激性食物',
    '保持充足睡眠，避免熬夜',
    '适当进行静养活动，如冥想'
  ],
  '气血两虚': [
    '多食用补气养血食物，如红枣、阿胶',
    '避免过度劳累，保证休息',
    '适度运动，如太极拳、八段锦',
    '保持营养均衡'
  ]
};

export function analyzeSymptoms(data: DiagnosisData): DiagnosisResult {
  const symptoms = data.symptoms.map(s => s.toLowerCase());
  const complaint = data.chiefComplaint.toLowerCase();
  const pulseDesc = data.pulseDescription.toLowerCase();

  let matchedSyndrome = '气血两虚';

  if (symptoms.some(s => s.includes('胁痛') || s.includes('抑郁') || s.includes('胀痛')) ||
      complaint.includes('胁痛') || complaint.includes('抑郁')) {
    matchedSyndrome = '肝郁气滞';
  } else if (symptoms.some(s => s.includes('心悸') || s.includes('失眠') || s.includes('多梦')) ||
             complaint.includes('心悸') || complaint.includes('失眠')) {
    matchedSyndrome = '心脾两虚';
  } else if (symptoms.some(s => s.includes('畏寒') || s.includes('腰膝') || s.includes('夜尿')) ||
             complaint.includes('畏寒') || pulseDesc.includes('沉弱')) {
    matchedSyndrome = '肾阳虚';
  } else if (symptoms.some(s => s.includes('口苦') || s.includes('脘腹') || s.includes('黏腻')) ||
             complaint.includes('口苦') || complaint.includes('腹胀')) {
    matchedSyndrome = '脾胃湿热';
  } else if (symptoms.some(s => s.includes('咳嗽') || s.includes('气短') || s.includes('感冒')) ||
             complaint.includes('咳嗽') || complaint.includes('气短')) {
    matchedSyndrome = '肺气虚';
  } else if (symptoms.some(s => s.includes('肥胖') || s.includes('痰多') || s.includes('胸闷')) ||
             complaint.includes('肥胖') || complaint.includes('痰多')) {
    matchedSyndrome = '痰湿体质';
  } else if (symptoms.some(s => s.includes('口干') || s.includes('潮热') || s.includes('盗汗')) ||
             complaint.includes('口干') || pulseDesc.includes('细数')) {
    matchedSyndrome = '阴虚火旺';
  }

  const syndromeInfo = SYNDROME_DATABASE[matchedSyndrome];
  const prescription = PRESCRIPTIONS[matchedSyndrome];
  const lifestyle = LIFESTYLE_ADVICE[matchedSyndrome];

  return {
    ...syndromeInfo,
    prescription: prescription.medicines,
    lifestyleAdvice: lifestyle,
    prognosis: getPrognosis(matchedSyndrome)
  };
}

function getPrognosis(syndrome: string): string {
  const prognoses: Record<string, string> = {
    '肝郁气滞': '预后良好，经过疏肝解郁治疗后症状可明显改善。建议保持情绪舒畅，定期复查。',
    '心脾两虚': '需要较长时期调养，坚持补益心脾治疗，症状可逐渐改善。需注意休息，避免过度劳累。',
    '肾阳虚': '肾阳虚为慢性过程，需要温补肾阳长期调养。预后取决于患者配合程度和生活调护。',
    '脾胃湿热': '清热利湿治疗后症状可改善，但需注意饮食调护，否则容易复发。',
    '肺气虚': '补益肺气治疗后抵抗力增强，感冒次数减少。预后良好，需注意预防感冒。',
    '痰湿体质': '属于偏颇体质，需要长期调理。预后良好但容易反复，需坚持健脾利湿治疗。',
    '阴虚火旺': '滋阴降火治疗后虚火症状可改善。需避免辛辣食物，保持充足睡眠。',
    '气血两虚': '气血两虚需要较长时间调养，补益气血治疗后体质逐渐改善。预后良好。'
  };
  return prognoses[syndrome] || '预后良好，请遵医嘱服药并定期复查。';
}
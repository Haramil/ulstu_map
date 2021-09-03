import c4f11 from './c4-f1-1/data.json';
import c4f12 from './c4-f1-2/data.json';
import gymc2 from './gym-c2/data.json';
import gymf1 from './gym-f1/data.json';
import gymf2 from './gym-f2/data.json';
import tarelka from './tarelka/data.json';
import tarelkaFoe from './tarelka-foe/data.json';
// import example from './example/data.json';

const mapData = {
  'c4-f1-1': { ...c4f11 },
  'c4-f1-2': { ...c4f12 },
  'gym-c2': { ...gymc2 },
  'gym-f1': { ...gymf1 },
  'gym-f2': { ...gymf2 },
  tarelka: { ...tarelka },
  'tarelka-foe': { ...tarelkaFoe },
  // 'example': { ...example },
};

export default mapData;

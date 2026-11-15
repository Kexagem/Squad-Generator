import { ParsedLoadout } from '../types';

export const parseSQF = (input: string): ParsedLoadout => {
  const cleanInput = input.replace(/\r\n/g, '\n');

  // Helper regex extractors
  const extract = (regex: RegExp): string => {
    const match = cleanInput.match(regex);
    return match ? match[1] : '';
  };

  const extractAll = (regex: RegExp): string[] => {
    // matchAll requires the global 'g' flag
    const matches = [...cleanInput.matchAll(regex)];
    return matches.map(m => m[1]);
  };

  // Parsing logic
  
  // Uniform / Vest / Backpack / Headgear
  // Support commonly used variable names: this, unit, _unit
  const uniform = extract(/(?:this|unit|_unit) (?:forceAddUniform|addUniform) "([^"]+)";/);
  const vest = extract(/(?:this|unit|_unit) addVest "([^"]+)";/);
  const backpack = extract(/(?:this|unit|_unit) addBackpack "([^"]+)";/);
  const headgear = extract(/(?:this|unit|_unit) addHeadgear "([^"]+)";/);
  
  // Goggles (Eyewear) ONLY. 
  // CRITICAL FIX: Do NOT match 'linkItem' here, as NVGoggles use linkItem but contain the word "goggles".
  // Only 'addGoggles' puts items in the eyewear slot.
  const goggles = extract(/(?:this|unit|_unit) addGoggles "([^"]+)";/);

  // Weapons
  const weapons = extractAll(/(?:this|unit|_unit) addWeapon "([^"]+)";/g);
  let primaryWeapon = '';
  let handgunWeapon = '';
  let secondaryWeapon = '';

  // Improved heuristic for weapons using standard Arma prefixes
  weapons.forEach(w => {
    const lower = w.toLowerCase();
    
    // Explicit secondary launcher prefixes
    if (lower.startsWith('launch_') || lower.includes('rpg') || lower.includes('titan')) {
      secondaryWeapon = w;
      return;
    }
    
    // Explicit handgun prefixes
    if (lower.startsWith('hgun_') && !lower.includes('pdw') && !lower.includes('smg')) { 
      handgunWeapon = w;
      return;
    }

    // Explicit primary prefixes
    if (lower.startsWith('arifle_') || lower.startsWith('srifle_') || lower.startsWith('lmg_') || lower.startsWith('mmg_') || lower.startsWith('smg_')) {
      primaryWeapon = w;
      return;
    }

    // Fallback if no prefixes match (Modded weapons)
    if (!primaryWeapon) {
      primaryWeapon = w;
    } else if (!handgunWeapon) {
      handgunWeapon = w;
    }
  });

  // Items & Magazines
  const linkedItems = extractAll(/(?:this|unit|_unit) linkItem "([^"]+)";/g);
  
  // Note: NVGs are 'linkItem's. They will be in the linkedItems array. 
  // The generator logic handles checking linkedItems for NVGs.

  const items = extractAll(/(?:this|unit|_unit) addItem "([^"]+)";/g);
  // Flatten specific container adds into general items for redistribution
  const containerItems = extractAll(/(?:this|unit|_unit) (?:addItemToUniform|addItemToVest|addItemToBackpack) "([^"]+)";/g);
  
  // Explicit magazines
  const mags = extractAll(/(?:this|unit|_unit) addMagazine "([^"]+)";/g);
  
  // Combine all "stuff"
  const allItems = [...items, ...containerItems];

  const probableMags: string[] = [];
  const probableItems: string[] = [];

  allItems.forEach(item => {
    if (item.match(/Rnd|Mag|Shell|Grenade|Rocket|Missile|Ammo/i)) {
      probableMags.push(item);
    } else {
      probableItems.push(item);
    }
  });

  return {
    uniform,
    vest,
    backpack,
    headgear,
    goggles,
    primaryWeapon,
    secondaryWeapon,
    handgunWeapon,
    binocular: linkedItems.find(i => i.toLowerCase().includes('binocular') || i.toLowerCase().includes('laserdesignator')) || '',
    items: probableItems,
    magazines: [...mags, ...probableMags],
    linkedItems: linkedItems.filter(i => !i.toLowerCase().includes('binocular') && !i.toLowerCase().includes('laserdesignator'))
  };
};
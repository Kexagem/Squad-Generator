import { FactionType, RoleType, ParsedLoadout, FactionGear } from '../types';
import { FACTION_GEAR } from '../constants';

const formatSQF = (role: string, faction: string, lines: string[]): string => {
  return `\n// === ${faction} ${role} ===\n` + lines.join('\n') + '\n';
};

export const generateSquad = (base: ParsedLoadout, factionType: FactionType): string => {
  const factionGear = FACTION_GEAR[factionType];
  const squadRoles = [
    RoleType.SQUAD_LEADER,
    RoleType.MEDIC,
    RoleType.RIFLEMAN,
    RoleType.RIFLEMAN,
    RoleType.AUTORIFLEMAN,
    RoleType.GRENADIER,
    RoleType.MARKSMAN,
    RoleType.ENGINEER,
    RoleType.ANTI_TANK
  ];

  let output = '';

  squadRoles.forEach(role => {
    output += generateUnitSQF(role, base, factionGear, factionType);
  });

  return output;
};

const generateUnitSQF = (role: RoleType, base: ParsedLoadout, gear: FactionGear, factionName: string): string => {
  const commands: string[] = [];
  
  // 1. Clean unit
  // Standardize cleanup commands
  commands.push('removeAllWeapons this;');
  commands.push('removeAllItems this;');
  commands.push('removeAllAssignedItems this;');
  commands.push('removeUniform this;');
  commands.push('removeVest this;');
  commands.push('removeBackpack this;');
  commands.push('removeHeadgear this;');
  commands.push('removeGoggles this;');
  commands.push('');

  // 2. Add Wearables 
  // Enforce faction specific Uniform and Vest to avoid cross-faction incompatibility
  if (gear.uniform) commands.push(`this forceAddUniform "${gear.uniform}";`);
  else if (base.uniform) commands.push(`this forceAddUniform "${base.uniform}";`);

  if (gear.vest) commands.push(`this addVest "${gear.vest}";`);
  else if (base.vest) commands.push(`this addVest "${base.vest}";`);
  
  // Role-Specific Backpack Logic
  let backpack = '';
  switch (role) {
    case RoleType.MEDIC:
      backpack = gear.backpacks.medic;
      break;
    case RoleType.ANTI_TANK:
    case RoleType.ENGINEER:
      backpack = gear.backpacks.heavy;
      break;
    case RoleType.SQUAD_LEADER:
      backpack = gear.backpacks.light;
      break;
    default:
      backpack = gear.backpacks.standard;
      break;
  }
  if (backpack) commands.push(`this addBackpack "${backpack}";`);

  // Role-Specific Headgear Logic
  let headgear = '';
  switch (role) {
    case RoleType.SQUAD_LEADER:
    case RoleType.MARKSMAN:
      headgear = gear.headgear.leader;
      break;
    default:
      headgear = gear.headgear.standard;
      break;
  }

  if (headgear) commands.push(`this addHeadgear "${headgear}";`);

  // Eyewear Logic
  // Safety Check: Do not add NVGs as goggles.
  if (base.goggles) {
    const goggleName = base.goggles.toLowerCase();
    if (!goggleName.includes('nvgoggles')) {
      commands.push(`this addGoggles "${base.goggles}";`);
    }
  }
  
  commands.push('');

  // 3. Add Items (Base items + Role items)
  // Common items (Map, Compass, etc) + NVGs if they were imported as linked items
  base.linkedItems.forEach(item => commands.push(`this linkItem "${item}";`));

  // Automatic NVG Logic: Ensure military factions have NVGs if not already present
  // CIV faction shouldn't get NVGs automatically
  if (factionName !== 'CIV') {
    const hasNVG = base.linkedItems.some(i => i.toLowerCase().includes('nvgoggles'));
    if (!hasNVG) {
       commands.push(`this linkItem "${gear.nvg}";`);
    }
  }

  // 4. Weapons & Ammo Logic
  let primary = gear.rifle; // Default to faction rifle
  let secondary = null;
  
  // Check if we should use Base weapon (if it looks like a rifle and we are a rifleman/SL)
  if (base.primaryWeapon && (role === RoleType.RIFLEMAN || role === RoleType.SQUAD_LEADER || role === RoleType.MEDIC || role === RoleType.ENGINEER)) {
     // If the user provided a loadout, they likely want that specific rifle for standard troops
     // We try to find a matching mag in the base loadout
     const matchingMag = base.magazines.find(m => m.includes('30Rnd') || m.includes('Mag')); 
     primary = { 
       weapon: base.primaryWeapon, 
       mag: matchingMag || gear.rifle.mag 
     };
  }

  // Role Overrides
  if (role === RoleType.AUTORIFLEMAN) primary = gear.lmg;
  if (role === RoleType.MARKSMAN) primary = gear.dmr;
  if (role === RoleType.GRENADIER) primary = gear.gl;
  if (role === RoleType.ANTI_TANK) secondary = gear.launcher;

  // Add Ammo for Primary
  // 5-6 mags standard
  const magCount = role === RoleType.AUTORIFLEMAN ? 3 : 6;
  for(let i=0; i<magCount; i++) {
    commands.push(`this addItem "${primary.mag}";`);
  }

  // Add Primary Weapon
  commands.push(`this addWeapon "${primary.weapon}";`);
  
  // Attachments?
  if (primary.scope) commands.push(`this addPrimaryWeaponItem "${primary.scope}";`);
  if (primary.bipod) commands.push(`this addPrimaryWeaponItem "${primary.bipod}";`);

  // Secondary (Launcher)
  if (secondary) {
    // Add Rockets
    commands.push(`this addItem "${secondary.mag}";`); 
    commands.push(`this addItem "${secondary.mag}";`);
    commands.push(`this addWeapon "${secondary.weapon}";`);
  }

  // Handgun (SL, Sniper, AR usually get them)
  if (role === RoleType.SQUAD_LEADER || role === RoleType.MARKSMAN || role === RoleType.AUTORIFLEMAN) {
    commands.push(`this addItem "${gear.handgun.mag}";`);
    commands.push(`this addItem "${gear.handgun.mag}";`);
    commands.push(`this addWeapon "${gear.handgun.weapon}";`);
  }

  commands.push('');

  // 5. Equipment / Medical / Grenades
  // Duplicate prevention: Filter out managed items from base loadout
  // We manage FAKs, Grenades, and Kits based on role, so ignore them if they are in base input
  const managedItems = ['firstaidkit', 'medikit', 'toolkit', 'minedetector', 'handgrenade', 'smokeshell'];
  
  base.items.forEach(item => {
    const lowerItem = item.toLowerCase();
    // Only add if it's NOT a managed item (we add those below explicitly)
    // and distinct logic to prevent duplicates if user had them in base
    const isManaged = managedItems.some(managed => lowerItem.includes(managed));
    if (!isManaged) {
        commands.push(`this addItem "${item}";`);
    }
  });

  // Role specific gear (Managed Items)
  if (role === RoleType.MEDIC) {
    gear.medicGear.forEach(i => commands.push(`this addItem "${i}";`));
  } else {
    gear.basicMed.forEach(i => commands.push(`this addItem "${i}";`));
  }

  if (role === RoleType.ENGINEER) {
    gear.engineerGear.forEach(i => commands.push(`this addItem "${i}";`));
  }

  if (role === RoleType.SQUAD_LEADER) {
    if (gear.binocular) commands.push(`this addWeapon "${gear.binocular}";`);
    commands.push(`this linkItem "ItemGPS";`);
  }

  if (role === RoleType.GRENADIER) {
      commands.push(`this addItem "${gear.glMag}";`);
      commands.push(`this addItem "${gear.glMag}";`);
      commands.push(`this addItem "${gear.glMag}";`);
      commands.push(`this addItem "${gear.glSmoke}";`);
      commands.push(`this addItem "${gear.glSmoke}";`);
  }

  // General Grenades (Smoke/Frag) for everyone 
  if (factionName !== 'CIV') {
      commands.push(`this addItem "SmokeShell";`);
      commands.push(`this addItem "HandGrenade";`);
  }

  return formatSQF(role, factionName, commands);
};
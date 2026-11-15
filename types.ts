export enum FactionType {
  BLUFOR = 'BLUFOR',
  OPFOR = 'OPFOR',
  AAF = 'AAF',
  CIV = 'CIV',
  FIA = 'FIA',
  SPETSNAZ = 'SPETSNAZ',
  GENDARMERIE = 'GENDARMERIE'
}

export enum RoleType {
  SQUAD_LEADER = 'Squad Leader',
  RIFLEMAN = 'Rifleman',
  AUTORIFLEMAN = 'Autorifleman',
  GRENADIER = 'Grenadier',
  MARKSMAN = 'Marksman',
  MEDIC = 'Medic',
  ENGINEER = 'Engineer',
  ANTI_TANK = 'Anti-Tank'
}

export interface ParsedLoadout {
  uniform: string;
  vest: string;
  backpack: string;
  headgear: string;
  goggles: string;
  primaryWeapon: string;
  secondaryWeapon: string;
  handgunWeapon: string;
  binocular: string;
  items: string[];
  magazines: string[];
  linkedItems: string[];
}

export interface WeaponConfig {
  weapon: string;
  mag: string;
  scope?: string;
  bipod?: string;
}

export interface BackpackConfig {
  standard: string;
  medic: string;
  heavy: string; // For AT / Engineer
  light: string; // For SL or light roles
}

export interface HeadgearConfig {
  standard: string;
  leader: string;
  pilot?: string;
  crew?: string;
}

export interface FactionGear {
  uniform: string;
  vest: string;
  rifle: WeaponConfig;
  lmg: WeaponConfig;
  dmr: WeaponConfig;
  gl: WeaponConfig; // Grenade Launcher Rifle
  glMag: string; // HE Grenade
  glSmoke: string; // Smoke Grenade for GL
  launcher: WeaponConfig;
  handgun: WeaponConfig;
  binocular: string;
  nvg: string;
  backpacks: BackpackConfig;
  headgear: HeadgearConfig;
  basicMed: string[]; // FAKs usually
  medicGear: string[]; // Medikit
  engineerGear: string[]; // Toolkit, MineDetector
}
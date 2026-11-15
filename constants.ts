import { FactionType, FactionGear } from './types';

// Default mappings to vanilla Arma 3 weapons
export const FACTION_GEAR: Record<FactionType, FactionGear> = {
  [FactionType.BLUFOR]: {
    uniform: "U_B_CombatUniform_mcam",
    vest: "V_PlateCarrier1_rgr",
    rifle: { weapon: "arifle_MX_F", mag: "30Rnd_65x39_caseless_mag" },
    lmg: { weapon: "arifle_MX_SW_F", mag: "100Rnd_65x39_caseless_mag" },
    dmr: { weapon: "srifle_EBR_F", mag: "20Rnd_762x51_Mag", scope: "optic_SOS" },
    gl: { weapon: "arifle_MX_GL_F", mag: "30Rnd_65x39_caseless_mag" },
    glMag: "1Rnd_HE_Grenade_shell",
    glSmoke: "1Rnd_Smoke_Grenade_shell",
    launcher: { weapon: "launch_NLAW_F", mag: "NLAW_F" },
    handgun: { weapon: "hgun_P07_F", mag: "16Rnd_9x21_Mag" },
    binocular: "Binocular",
    nvg: "NVGoggles",
    backpacks: {
      standard: "B_AssaultPack_mcamo",
      medic: "B_Kitbag_mcamo",
      heavy: "B_Carryall_mcamo",
      light: "B_AssaultPack_mcamo"
    },
    headgear: {
      standard: "H_HelmetB_snakeskin",
      leader: "H_HelmetSpecB_blk"
    },
    basicMed: ["FirstAidKit", "FirstAidKit"],
    medicGear: ["Medikit", "FirstAidKit", "FirstAidKit", "FirstAidKit", "FirstAidKit", "FirstAidKit"],
    engineerGear: ["ToolKit", "MineDetector"]
  },
  [FactionType.OPFOR]: {
    // REVISED OPFOR: Removed Hex uniforms (using Urban) and futuristic helmets (Assasssin/Defender)
    uniform: "U_O_CombatUniform_oucamo", // Urban CSAT (Grey)
    vest: "V_TacVest_blk", // Black tactical vest instead of Brown Harness
    rifle: { weapon: "arifle_Katiba_F", mag: "30Rnd_65x39_caseless_green" },
    lmg: { weapon: "LMG_Zafir_F", mag: "150Rnd_762x54_Box" },
    dmr: { weapon: "srifle_DMR_01_F", mag: "10Rnd_762x54_Mag", scope: "optic_DMS" },
    gl: { weapon: "arifle_Katiba_GL_F", mag: "30Rnd_65x39_caseless_green" },
    glMag: "1Rnd_HE_Grenade_shell",
    glSmoke: "1Rnd_Smoke_Grenade_shell",
    launcher: { weapon: "launch_RPG32_F", mag: "RPG32_F" },
    handgun: { weapon: "hgun_Rook40_F", mag: "16Rnd_9x21_Mag" },
    binocular: "Binocular",
    nvg: "NVGoggles_OPFOR",
    backpacks: {
      standard: "B_FieldPack_oucamo", // Urban backpack
      medic: "B_FieldPack_oucamo",
      heavy: "B_Carryall_oucamo",
      light: "B_FieldPack_oucamo"
    },
    headgear: {
      standard: "H_HelmetSpecB_blk", // Using NATO Black helmet to avoid CSAT Alien head shape
      leader: "H_MilCap_oucamo" // Officer Cap
    },
    basicMed: ["FirstAidKit", "FirstAidKit"],
    medicGear: ["Medikit", "FirstAidKit", "FirstAidKit", "FirstAidKit", "FirstAidKit"],
    engineerGear: ["ToolKit", "MineDetector"]
  },
  [FactionType.AAF]: {
    uniform: "U_I_CombatUniform",
    vest: "V_PlateCarrierIA1_dgtl",
    rifle: { weapon: "arifle_Mk20_F", mag: "30Rnd_556x45_Stanag" },
    lmg: { weapon: "LMG_Mk200_F", mag: "200Rnd_65x39_cased_Box" },
    dmr: { weapon: "srifle_EBR_F", mag: "20Rnd_762x51_Mag", scope: "optic_SOS" },
    gl: { weapon: "arifle_Mk20_GL_F", mag: "30Rnd_556x45_Stanag" },
    glMag: "1Rnd_HE_Grenade_shell",
    glSmoke: "1Rnd_Smoke_Grenade_shell",
    launcher: { weapon: "launch_NLAW_F", mag: "NLAW_F" },
    handgun: { weapon: "hgun_ACPC2_F", mag: "9Rnd_45ACP_Mag" },
    binocular: "Binocular",
    nvg: "NVGoggles_INDEP",
    backpacks: {
      standard: "B_AssaultPack_dgtl",
      medic: "B_FieldPack_oli",
      heavy: "B_Carryall_oli",
      light: "B_AssaultPack_dgtl"
    },
    headgear: {
      standard: "H_HelmetIA",
      leader: "H_MilCap_dgtl" 
    },
    basicMed: ["FirstAidKit", "FirstAidKit"],
    medicGear: ["Medikit", "FirstAidKit", "FirstAidKit", "FirstAidKit", "FirstAidKit"],
    engineerGear: ["ToolKit", "MineDetector"]
  },
  [FactionType.CIV]: {
    uniform: "U_C_Poloshirt_blue",
    vest: "V_LegStrapBag_black_F",
    rifle: { weapon: "", mag: "" },
    lmg: { weapon: "", mag: "" },
    dmr: { weapon: "", mag: "" },
    gl: { weapon: "", mag: "" },
    glMag: "",
    glSmoke: "",
    launcher: { weapon: "", mag: "" },
    handgun: { weapon: "", mag: "" },
    binocular: "",
    nvg: "",
    backpacks: {
      standard: "B_Kitbag_cbr",
      medic: "B_Kitbag_sgg",
      heavy: "B_Carryall_cbr",
      light: "B_Messenger_Coyote_F"
    },
    headgear: {
      standard: "H_Cap_red",
      leader: "H_Hat_brown"
    },
    basicMed: ["FirstAidKit"],
    medicGear: ["FirstAidKit", "FirstAidKit"],
    engineerGear: ["ToolKit"]
  },
  [FactionType.FIA]: {
    uniform: "U_BG_Guerrilla_6_1",
    vest: "V_Chestrig_oli",
    rifle: { weapon: "arifle_TRG21_F", mag: "30Rnd_556x45_Stanag" },
    lmg: { weapon: "LMG_Mk200_F", mag: "200Rnd_65x39_cased_Box" },
    dmr: { weapon: "srifle_DMR_06_olive_F", mag: "20Rnd_762x51_Mag", scope: "optic_KHS_old" },
    gl: { weapon: "arifle_TRG21_GL_F", mag: "30Rnd_556x45_Stanag" },
    glMag: "1Rnd_HE_Grenade_shell",
    glSmoke: "1Rnd_Smoke_Grenade_shell",
    launcher: { weapon: "launch_RPG7_F", mag: "RPG7_F" },
    handgun: { weapon: "hgun_Pistol_heavy_02_F", mag: "6Rnd_45ACP_Cylinder" },
    binocular: "Binocular",
    nvg: "NVGoggles_INDEP",
    backpacks: {
      standard: "B_FieldPack_oli",
      medic: "B_FieldPack_khk",
      heavy: "B_Carryall_oli",
      light: "B_AssaultPack_rgr"
    },
    headgear: {
      standard: "H_Shemag_olive",
      leader: "H_Cap_oli"
    },
    basicMed: ["FirstAidKit", "FirstAidKit"],
    medicGear: ["Medikit", "FirstAidKit", "FirstAidKit", "FirstAidKit", "FirstAidKit"],
    engineerGear: ["ToolKit", "MineDetector"]
  },
  [FactionType.SPETSNAZ]: {
    uniform: "U_O_R_Gorka_01_F", // Contact DLC Gorka
    vest: "V_PlateCarrier2_rgr_noflag_F",
    rifle: { weapon: "arifle_AK12_F", mag: "30Rnd_762x39_AK12_Mag_F" },
    lmg: { weapon: "arifle_RPK12_F", mag: "75Rnd_762x39_Mag_F" },
    dmr: { weapon: "srifle_DMR_05_blk_F", mag: "10Rnd_93x64_DMR_05_Mag", scope: "optic_DMS" },
    gl: { weapon: "arifle_AK12_GL_F", mag: "30Rnd_762x39_AK12_Mag_F" },
    glMag: "1Rnd_HE_Grenade_shell",
    glSmoke: "1Rnd_Smoke_Grenade_shell",
    launcher: { weapon: "launch_RPG32_F", mag: "RPG32_F" },
    handgun: { weapon: "hgun_Rook40_F", mag: "16Rnd_9x21_Mag" },
    binocular: "Rangefinder",
    nvg: "NVGoggles_OPFOR",
    backpacks: {
      standard: "B_FieldPack_taiga_F",
      medic: "B_FieldPack_taiga_F",
      heavy: "B_Carryall_taiga_F",
      light: "B_AssaultPack_rgr"
    },
    headgear: {
      standard: "H_HelmetAggressor_cover_F", // Contact DLC Spetsnaz Helmet
      leader: "H_HelmetAggressor_cover_taiga_F"
    },
    basicMed: ["FirstAidKit", "FirstAidKit", "FirstAidKit"],
    medicGear: ["Medikit", "FirstAidKit", "FirstAidKit", "FirstAidKit", "FirstAidKit", "FirstAidKit"],
    engineerGear: ["ToolKit", "MineDetector"]
  },
  [FactionType.GENDARMERIE]: {
    uniform: "U_B_GEN_Soldier_F",
    vest: "V_TacVest_gen_F",
    rifle: { weapon: "arifle_SPAR_01_blk_F", mag: "30Rnd_556x45_Stanag" },
    lmg: { weapon: "arifle_SPAR_02_blk_F", mag: "150Rnd_556x45_Drum_Mag_F" },
    dmr: { weapon: "arifle_SPAR_03_blk_F", mag: "20Rnd_762x51_Mag", scope: "optic_SOS" },
    gl: { weapon: "arifle_SPAR_01_GL_blk_F", mag: "30Rnd_556x45_Stanag" },
    glMag: "1Rnd_HE_Grenade_shell",
    glSmoke: "1Rnd_Smoke_Grenade_shell",
    launcher: { weapon: "launch_NLAW_F", mag: "NLAW_F" },
    handgun: { weapon: "hgun_P07_F", mag: "16Rnd_9x21_Mag" },
    binocular: "Binocular",
    nvg: "NVGoggles",
    backpacks: {
      standard: "B_TacticalPack_blk",
      medic: "B_TacticalPack_blk",
      heavy: "B_Carryall_blk",
      light: "B_AssaultPack_blk"
    },
    headgear: {
      standard: "H_HelmetB_light_black", // Light Ops helmet
      leader: "H_MilCap_gen_F" // Police Cap
    },
    basicMed: ["FirstAidKit"],
    medicGear: ["Medikit", "FirstAidKit", "FirstAidKit", "FirstAidKit", "FirstAidKit"],
    engineerGear: ["ToolKit", "MineDetector"]
  }
};
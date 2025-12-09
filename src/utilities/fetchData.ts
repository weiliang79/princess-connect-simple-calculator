import starData from "../data/star_upgrade.csv";
import weaponData from "../data/weapon_upgrade.csv";

interface StarData {
  current_star: number;
  next_star: number;
  cost: number;
}

interface WeaponData {
  current_level: number;
  next_level: number;
  cost_1: number;
  cost_2: number;
}

function fetchStarUpgradeData() {
  return starData;
}

function fetchWeaponUpgradeData() {
  return weaponData;
}

export {
  type StarData,
  fetchStarUpgradeData,
  type WeaponData,
  fetchWeaponUpgradeData,
};

"use client";

import { useMemo, useState } from "react";
import data from "../data/weapon-upgrade.json";

interface Props {
  dict: any;
}

export default function WeaponUpgradeCalculator({ dict }: Props) {
  const [currentLevel, setCurrentLevel] = useState("");
  const [nextLevel, setNextLevel] = useState("");
  const [stoneToBuy, setStoneToBuy] = useState(1);
  const [shardLeft, setShardLeft] = useState(0);

  const { totalShard, totalHeart, totalAmulet } = useMemo(() => {
    const currentLevelInt = parseInt(currentLevel);
    const nextLevelInt = parseInt(nextLevel);
    let totalShard = 0;
    let totalHeart = 0;

    for (let i = 0; i < data.length; i++) {
      if (
        data[i].current_level >= currentLevelInt &&
        data[i].next_level <= nextLevelInt
      ) {
        totalShard += data[i].cost_1;
        totalHeart += data[i].cost_2;
      }
    }

    totalShard -= Number.isNaN(shardLeft) ? 0 : shardLeft;
    let tempCost = totalShard;
    let totalAmulet = 0;

    for (let j = stoneToBuy; j <= 5; j++) {
      if (j === 5 || tempCost <= 20) {
        totalAmulet += tempCost * j;
        break;
      }

      tempCost -= 20;
      totalAmulet += 20 * j;
    }

    return {
      totalShard,
      totalHeart,
      totalAmulet,
    };
  }, [currentLevel, nextLevel, stoneToBuy, shardLeft]);

  return (
    <div className="p-4">
      <h1 className="text-2x1 mb-4 font-bold">
        {dict.weapon_upgrade_calculator.title}
      </h1>
      <label htmlFor="currentLevel" className="mb-2 block">
        {dict.weapon_upgrade_calculator.current_level}:
      </label>
      <select
        id="currentLevel"
        value={currentLevel}
        onChange={(e) => setCurrentLevel(e.target.value)}
        className="w-full rounded border p-2"
      >
        {data.map((data, index) => (
          <option key={index} value={data.current_level.toString()}>
            {dict.weapon_upgrade_calculator.level} {data.current_level}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="nextLevel" className="mb-2 block">
        {dict.weapon_upgrade_calculator.next_level}:
      </label>
      <select
        id="nextLevel"
        value={nextLevel}
        onChange={(e) => setNextLevel(e.target.value)}
        className="w-full rounded border p-2"
      >
        {data.map((data, index) => (
          <option key={index} value={data.next_level.toString()}>
            {dict.weapon_upgrade_calculator.level} {data.next_level}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="stoneToBuy" className="mb-2 block">
        {dict.weapon_upgrade_calculator.stone_to_buy}:
      </label>
      <select
        id="stoneToBuy"
        value={stoneToBuy}
        onChange={(e) => setStoneToBuy(parseInt(e.target.value))}
        className="w-full rounded border p-2"
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <br />
      <label htmlFor="shardLeft" className="mb-2 block">
        {dict.weapon_upgrade_calculator.shard_left}:
      </label>
      <input
        type="number"
        min="0"
        id="shardLeft"
        value={shardLeft}
        onChange={(e) => setShardLeft(parseInt(e.target.value))}
        className="w-full rounded border p-2"
      ></input>
      <br />
      <table className="">
        <tbody>
          <tr>
            <td>{dict.weapon_upgrade_calculator.memory_shard_result}</td>
            <td>
              <span className="inline-flex items-center justify-center rounded-lg bg-green-700 px-2 py-1 text-base font-bold leading-none text-red-100">
                {totalShard}
              </span>
            </td>
          </tr>
          <tr>
            <td>{dict.weapon_upgrade_calculator.divine_amulet_result}</td>
            <td>
              <span className="inline-flex items-center justify-center rounded-lg bg-green-700 px-2 py-1 text-base font-bold leading-none text-red-100">
                {totalAmulet}
              </span>
            </td>
          </tr>
          <tr>
            <td>{dict.weapon_upgrade_calculator.princess_heart_result}</td>
            <td>
              <span className="inline-flex items-center justify-center rounded-lg bg-green-700 px-2 py-1 text-base font-bold leading-none text-red-100">
                {totalHeart}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

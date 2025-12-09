"use client";

import { useMemo, useState } from "react";
import data from "../data/star-upgrade.json";

interface Props {
  dict: any;
}

export default function StarUpgradeCalculator({ dict }: Props) {
  const [currentStar, setCurrentStar] = useState<number | null>(
    data[0].current_star || null,
  );
  const [nextStar, setNextStar] = useState<number | null>(
    data[0].next_star || null,
  );
  const [stoneToBuy, setStoneToBuy] = useState<number>(1);
  const [shardLeft, setShardLeft] = useState<number>(0);

  const { totalShard, totalAmulet } = useMemo(() => {
    let totalShard = 0;

    for (let i = 0; i < data.length; i++) {
      if (
        data[i].current_star >= (currentStar ?? 0) &&
        data[i].next_star <= (nextStar ?? 0)
      ) {
        totalShard += data[i].cost;
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
      totalAmulet,
    };
  }, [currentStar, nextStar, stoneToBuy, shardLeft]);

  return (
    <div className="p-4">
      <h1 className="text-2x1 mb-4 font-bold">
        {dict.star_upgrade_calculator.title}
      </h1>
      <label htmlFor="currentStar" className="mb-2 block">
        {dict.star_upgrade_calculator.current_star}:
      </label>
      <select
        id="currentStar"
        value={currentStar?.toString() || ""}
        onChange={(e) => setCurrentStar(parseInt(e.target.value))}
        className="w-full rounded-sm border p-2"
      >
        {data.map((star, index) => (
          <option key={index} value={star.current_star.toString()}>
            {star.current_star} {dict.star_upgrade_calculator.star}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="nextStar" className="mb-2 block">
        {dict.star_upgrade_calculator.next_star}:
      </label>
      <select
        id="nextStar"
        value={nextStar?.toString() || ""}
        onChange={(e) => setNextStar(parseInt(e.target.value))}
        className="w-full rounded-sm border p-2"
      >
        {data.map((star, index) => (
          <option key={index} value={star.next_star.toString()}>
            {star.next_star} {dict.star_upgrade_calculator.star}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="stoneToBuy" className="mb-2 block">
        {dict.star_upgrade_calculator.stone_to_buy}:
      </label>
      <select
        id="stoneToBuy"
        value={stoneToBuy}
        onChange={(e) => setStoneToBuy(parseInt(e.target.value))}
        className="w-full rounded-sm border p-2"
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <br />
      <label htmlFor="shardLeft" className="mb-2 block">
        {dict.star_upgrade_calculator.shard_left}:
      </label>
      <input
        type="number"
        min="0"
        id="shardLeft"
        value={shardLeft}
        onChange={(e) => setShardLeft(parseInt(e.target.value))}
        className="w-full rounded-sm border p-2"
      ></input>
      <br />
      <table className="">
        <tbody>
          <tr>
            <td>{dict.star_upgrade_calculator.memory_shard_result}</td>
            <td>
              <span className="inline-flex items-center justify-center rounded-lg bg-green-700 px-2 py-1 text-base font-bold leading-none text-red-100">
                {totalShard}
              </span>
            </td>
          </tr>
          <tr>
            <td>{dict.star_upgrade_calculator.divine_amulet_result}</td>
            <td>
              <span className="inline-flex items-center justify-center rounded-lg bg-green-700 px-2 py-1 text-base font-bold leading-none text-red-100">
                {totalAmulet}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

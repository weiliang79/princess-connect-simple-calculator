'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { type WeaponData } from '@/utilities/fetchData';

interface Props {
      dict: any;
      weaponData: WeaponData[];
}

const WeaponUpgradeCalculator: React.FC<Props> = ({ dict, weaponData }) => {
      const [currentLevel, setCurrentLevel] = useState('');
      const [nextLevel, setNextLevel] = useState('');
      const [stoneToBuy, setStoneToBuy] = useState(1);
      const [shardLeft, setShardLeft] = useState(0);
      const [totalShard, setTotalShard] = useState(0);
      const [totalHeart, setTotalHeart] = useState(0);
      const [totalAmulet, setTotalAmulet] = useState(0);

      useEffect(() => {
            // Set initial selections to the first level
            if (weaponData.length > 0) {
                  setCurrentLevel(weaponData[0].current_level.toString());
                  setNextLevel(weaponData[0].next_level.toString());
                  setStoneToBuy(1);
            }
      }, [weaponData]);

      const handleCalculate = useCallback(() => {
            const currentLevelInt = parseInt(currentLevel);
            const nextLevelInt = parseInt(nextLevel);
            let totalShard = 0;
            let totalHeart = 0;

            for (let i = 0; i < weaponData.length; i++) {
                  if (
                        weaponData[i].current_level >= currentLevelInt &&
                        weaponData[i].next_level <= nextLevelInt
                  ) {
                        totalShard += weaponData[i].cost_1;
                        totalHeart += weaponData[i].cost_2;
                  }
            }

            totalShard -= (Number.isNaN(shardLeft) ? 0 : shardLeft);
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

            setTotalShard(totalShard);
            setTotalHeart(totalHeart);
            setTotalAmulet(totalAmulet);

      }, [currentLevel, nextLevel, stoneToBuy, shardLeft, weaponData]);

      useEffect(() => {
            // Trigger calculation when currentLevel or nextLevel changes
            if (currentLevel !== '' && nextLevel !== '') {
                  handleCalculate();
            }
      }, [currentLevel, nextLevel, handleCalculate]);

      return (
            <div className='p-4'>
                  <h1 className='text-2x1 font-bold mb-4'>{dict.weapon_upgrade_calculator.title}</h1>
                  <label htmlFor="currentLevel" className='block mb-2'>{dict.weapon_upgrade_calculator.current_level}:</label>
                  <select
                        id="currentLevel"
                        value={currentLevel}
                        onChange={(e) => setCurrentLevel(e.target.value)}
                        className='border rounded p-2 w-full'
                  >
                        {weaponData.map((data, index) => (
                              <option key={index} value={data.current_level.toString()}>
                                    {dict.weapon_upgrade_calculator.level} {data.current_level}
                              </option>
                        ))}
                  </select>
                  <br />
                  <label htmlFor="nextLevel" className='block mb-2'>{dict.weapon_upgrade_calculator.next_level}:</label>
                  <select
                        id="nextLevel"
                        value={nextLevel}
                        onChange={(e) => setNextLevel(e.target.value)}
                        className='border rounded p-2 w-full'
                  >
                        {weaponData.map((data, index) => (
                              <option key={index} value={data.next_level.toString()}>
                                    {dict.weapon_upgrade_calculator.level} {data.next_level}
                              </option>
                        ))}
                  </select>
                  <br />
                  <label htmlFor="stoneToBuy" className='block mb-2'>{dict.weapon_upgrade_calculator.stone_to_buy}:</label>
                  <select
                        id="stoneToBuy"
                        value={stoneToBuy}
                        onChange={(e) => setStoneToBuy(parseInt(e.target.value))}
                        className='border rounded p-2 w-full'
                  >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                  </select>
                  <br />
                  <label htmlFor="shardLeft" className='block mb-2'>{dict.weapon_upgrade_calculator.shard_left}:</label>
                  <input
                        type="number"
                        min="0"
                        id='shardLeft'
                        value={shardLeft}
                        onChange={(e) => setShardLeft(parseInt(e.target.value))}
                        className='border rounded p-2 w-full'
                  ></input>
                  <br />
                  <table className=''>
                        <tbody>
                              <tr>
                                    <td>{dict.weapon_upgrade_calculator.memory_shard_result}</td>
                                    <td>
                                          <span className='inline-flex items-center justify-center px-2 py-1 text-base font-bold leading-none text-red-100 bg-green-700 rounded-lg'>
                                                {totalShard}
                                          </span>
                                    </td>
                              </tr>
                              <tr>
                                    <td>{dict.weapon_upgrade_calculator.divine_amulet_result}</td>
                                    <td>
                                          <span className='inline-flex items-center justify-center px-2 py-1 text-base font-bold leading-none text-red-100 bg-green-700 rounded-lg'>
                                                {totalAmulet}
                                          </span>
                                    </td>
                              </tr>
                              <tr>
                                    <td>{dict.weapon_upgrade_calculator.princess_heart_result}</td>
                                    <td>
                                          <span className='inline-flex items-center justify-center px-2 py-1 text-base font-bold leading-none text-red-100 bg-green-700 rounded-lg'>
                                                {totalHeart}
                                          </span>
                                    </td>
                              </tr>
                        </tbody>
                  </table>
            </div>
      );
};

export default WeaponUpgradeCalculator;
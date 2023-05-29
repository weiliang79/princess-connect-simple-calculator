'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { type StarData } from '@/utilities/fetchData';

interface Props {
      dict: any;
      starData: StarData[];
}

const StarUpgradeCalculator: React.FC<Props> = ({ dict, starData }) => {
      const [currentStar, setCurrentStar] = useState('');
      const [nextStar, setNextStar] = useState('');
      const [stoneToBuy, setStoneToBuy] = useState(1);
      const [shardLeft, setShardLeft] = useState(0);
      const [totalShard, setTotalShard] = useState(0);
      const [totalAmulet, setTotalAmulet] = useState(0);

      useEffect(() => {
            // Set initial selections to the first star
            if (starData.length > 0) {
                  setCurrentStar(starData[0].current_star.toString());
                  setNextStar(starData[0].next_star.toString());
            }
      }, [starData]);

      const handleCalculate = useCallback(() => {
            const currentStarInt = parseInt(currentStar);
            const nextStarInt = parseInt(nextStar);
            let totalShard = 0;

            for (let i = 0; i < starData.length; i++) {
                  if(
                        starData[i].current_star >= currentStarInt &&
                        starData[i].next_star <= nextStarInt
                  ) {
                        totalShard += starData[i].cost;
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
            setTotalAmulet(totalAmulet);

      }, [currentStar, nextStar, stoneToBuy, shardLeft, starData]);

      useEffect(() => {
            // Trigger calculaton when currentStar or nextStar changes
            if (currentStar !== '' && nextStar !== '') {
                  handleCalculate();
            }
      }, [currentStar, nextStar, handleCalculate]);

      return (
            <div className='p-4'>
                  <h1 className='text-2x1 font-bold mb-4'>{dict.star_upgrade_calculator.title}</h1>
                  <label htmlFor='currentStar' className='block mb-2'>{dict.star_upgrade_calculator.current_star}:</label>
                  <select
                        id='currentStar'
                        value={currentStar}
                        onChange={(e) => setCurrentStar(e.target.value)}
                        className='border rounded p-2 w-full'
                  >
                        {starData.map((data, index) => (
                              <option key={index} value={data.current_star.toString()}>
                                    {data.current_star} {dict.star_upgrade_calculator.star}
                              </option>
                        ))}
                  </select>
                  <br />
                  <label htmlFor='nextStar' className='block mb-2'>{dict.star_upgrade_calculator.next_star}:</label>
                  <select
                        id='nextStar'
                        value={nextStar}
                        onChange={(e) => setNextStar(e.target.value)}
                        className='border rounded p-2 w-full'
                  >
                        {starData.map((data, index) => (
                              <option key={index} value={data.next_star.toString()}>
                                    {data.next_star} {dict.star_upgrade_calculator.star}
                              </option>
                        ))}
                  </select>
                  <br />
                  <label htmlFor="stoneToBuy" className='block mb-2'>{dict.star_upgrade_calculator.stone_to_buy}:</label>
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
                  <label htmlFor="shardLeft" className='block mb-2'>{dict.star_upgrade_calculator.shard_left}:</label>
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
                                    <td>{dict.star_upgrade_calculator.memory_shard_result}</td>
                                    <td>
                                          <span className='inline-flex items-center justify-center px-2 py-1 text-base font-bold leading-none text-red-100 bg-green-700 rounded-lg'>
                                                {totalShard}
                                          </span>
                                    </td>
                              </tr>
                              <tr>
                                    <td>{dict.star_upgrade_calculator.divine_amulet_result}</td>
                                    <td>
                                          <span className='inline-flex items-center justify-center px-2 py-1 text-base font-bold leading-none text-red-100 bg-green-700 rounded-lg'>
                                                {totalAmulet}
                                          </span>
                                    </td>
                              </tr>
                        </tbody>
                  </table>
            </div>
      );

}

export default StarUpgradeCalculator;
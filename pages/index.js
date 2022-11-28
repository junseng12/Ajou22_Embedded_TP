import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { testAddress } from '../config';
import Test from '../artifacts/contracts/test.sol/test.json';

export default function Home() {
  const [games, setGames] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    loadGames();
  }, []);
  const router = useRouter();

  async function loadGames() {
    /** provider 연결 없이 그냥 contract call 했더니 동작 안 했음. */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(testAddress, Test.abi, signer);
    const data = await contract.joinableGame();
    const items = await Promise.all(
      data.map(async (i) => {
        let prize = ethers.utils.formatUnits(i.prize.toString(), 'ether');
        let joinFeeAmount = ethers.utils.formatUnits(
          i.joinFeeAmount.toString(),
          'ether'
        );
        let betFeeAmount = ethers.utils.formatUnits(
          i.betFeeAmount.toString(),
          'ether'
        );
        let item = {
          gameId: i.gameId.toNumber(),
          startAt: i.startAt.toNumber(),
          finishAt: i.finishAt.toNumber(),
          prize: prize,
          joinFeeAmount: joinFeeAmount,
          betFeeAmount: betFeeAmount,
          gameStatus: i.gameStatus,
        };
        return item;
      })
    );
    setGames(items);
    setLoadingState('loaded');
  }

  /*
  async function updateTracker(string) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      planToNFTAddress,
      PlanToNFT.abi,
      signer
    );

    const tokenId = string.split(':')[1].slice(0, 1);
    //console.log(tokenId);
    const transaction = await contract.updateTracker(parseInt(tokenId));
    await transaction.wait();
    router.push('/');
  }
  */

  if (loadingState === 'loaded' && !games.length)
    return <h1 className="px-20 py-10 text-3xl">No games in home</h1>;
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {games.map((game, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <div className="p-4">
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  게임 시작 : {game.startAt}
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  게임 종료 : {game.finishAt}
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  상금 : {game.prize}
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  참가비 : {game.joinFeeAmount}
                </p>
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  베팅비 : {game.betFeeAmount}
                </p>
                {/*
                <p style={{ height: '32px' }} className="text-l font-semibold">
                  {game.gameStatus}
                </p>
          */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

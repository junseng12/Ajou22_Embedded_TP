import { useState } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import Web3Modal from 'web3modal';

import { testAddress } from '../config';
import Test from '../artifacts/contracts/Test.sol/Test.json';

export default function MakeGame() {
  const [formInput, updateFormInput] = useState({
    gameId: '',
    startAt: '',
    finishAt: '',
    prize: '',
    joinFeeAmount: '',
    betFeeAmount: '',
  });
  const router = useRouter();

  async function makeGame() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const prize = ethers.utils.parseUnits(formInput.prize, 'ether');
    const joinFeeAmount = ethers.utils.parseUnits(
      formInput.joinFeeAmount,
      'ether'
    );
    const betFeeAmount = ethers.utils.parseUnits(
      formInput.betFeeAmount,
      'ether'
    );
    let contract = new ethers.Contract(testAddress, Test.abi, signer);

    let transaction = await contract.makeGame(
      parseInt(formInput.gameId),
      parseInt(formInput.startAt),
      parseInt(formInput.finishAt),
      joinFeeAmount,
      betFeeAmount,
      {
        value: prize,
      }
    );
    await transaction.wait();

    router.replace('/');
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="게임 ID"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, gameId: e.target.value })
          }
        />
        <textarea
          placeholder="시작 시간"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, startAt: e.target.value })
          }
        />
        <input
          placeholder="종료 시간"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, finishAt: e.target.value })
          }
        />
        <input
          placeholder="상금 (단위:ETH)"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, prize: e.target.value })
          }
        />
        <input
          placeholder="참가비"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, joinFeeAmount: e.target.value })
          }
        />
        <input
          placeholder="배팅비"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, betFeeAmount: e.target.value })
          }
        />
        <button
          onClick={makeGame}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          게임 생성
        </button>
      </div>
    </div>
  );
}

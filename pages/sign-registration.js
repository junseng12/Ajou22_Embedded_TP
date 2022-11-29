import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { testAddress } from "../config";
import Test from "../artifacts/contracts/Test.sol/Test.json";

export default function myApp({ pageProps }) {
  const [formInput, updateFormInput] = useState({
    userId: "",
  });
  const router = useRouter();

  async function register() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(testAddress, Test.abi, signer);

    console.log(formInput.userId);
    let transaction = await contract.registration(parseInt(formInput.userId));
    // registration 중복은 어떻게 해결할까?
    await transaction.wait();

    router.replace("/");
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="게임 아이디"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, userId: e.target.value })
          }
        />
        <button
          onClick={register}
          className="font-bold mt-4 bg-gray-500 text-black rounded p-4 shadow-lg"
        >
          Registration
        </button>
      </div>
    </div>
  );
}

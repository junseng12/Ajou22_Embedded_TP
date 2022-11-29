import Layout from "../components/layout";
import Mainbar from "../components/mainbar";
import Link from "next/link";
import { useRouter } from "next/router";

import Inforbar from "../components/infobar";
// 임시 homepage - home으로 사용할 웹페이지 구성 이해 못하여 임시로 사용할 homepage 구현
export default function temphome() {
  // 어떻게 mapping하는지 이해 못해서 놔둠
  const gameItems = [
    {
      href: "/game-info",
      title: "게임 정보",
    },
  ]; /*이걸로 game bar(mainbar) 여러 개 받아와 개별 정보 확인할 수 있도록*/

  return (
    <div className="w-full h-full" id="container">
      <div className="w-full h-28" id="container 윗부분">
        <div className="w-full h-full">
          <div className="bg-pink-500 text-center float-left w-4/5 h-2/5 p-4">
            진행중인 게임
          </div>
          <div className="bg-pink-800 text-center float-left w-1/5 h-2/5 p-4">
            총 베팅금액
          </div>
          <div className="bg-rose-800 text-right float-left w-full h-1/5">
            검색바
          </div>
          <div className="bg-teal-300 text-left float-left w-full h-auto px-4">
            게임 목록
          </div>
        </div>
      </div>
      <div className="w-full h-full relative" id="container 아랫부분">
        <Mainbar></Mainbar>

        <Mainbar></Mainbar>

        <Mainbar></Mainbar>

        <Mainbar></Mainbar>
      </div>
    </div>
  );
}

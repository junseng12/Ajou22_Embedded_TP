import Link from "next/link";
import Inforbar from "../components/infobar";
import Buttonstyle from "../styles/button.module.css";
// 게임바(mainbar)를 클릭했을 때, 게임 정보를 받아와 표시해주는 페이지 - 게임참가/확인 기능 구현
export default function Gameinformation() {
  return (
    <div className="flex h-full flex-col justify-center items-center">
      <h1 className="text-4xl mb-5 font-bold">게임 정보</h1>
      <div className="w-full px-10">
        제목 <Inforbar>받아올 정보</Inforbar>
      </div>
      <div className="w-full px-10">
        주최자 <Inforbar>받아올 정보</Inforbar>
      </div>
      <div className="w-full px-10">
        상금 <Inforbar>받아올 정보</Inforbar>
      </div>

      <div className="w-full h-full" id="명단 큰 상자">
        <div className="w-full h-auto" id="명단 큰 상자 윗 부분">
          <div className="w-1/2 h-5 text-center float-left pt-8">
            1팀 명단 내용
          </div>
          <div className="w-1/2 h-5 text-center float-left pt-8">
            2팀 명단 내용
          </div>
        </div>
        <div className="w-full h-auto" id="명단 큰 상자 아랫 부분">
          <div className="w-1/2 float-left px-10 pt-6 h-full">
            <Inforbar className="w-full h-full">받아올 정보</Inforbar>
          </div>
          <div className="w-1/2 float-left px-10 pt-6 h-full">
            <Inforbar className="w-full h-full">받아올 정보</Inforbar>
          </div>
        </div>
        <div>
          <div className="w-full float-left px-4 pt-6 h-full">
            <div className="text-center">베팅 정보</div>
            <div
              className="w-full  px-6 float-left"
              id="1팀 베팅 비율/2팀 베팅 비율"
            >
              <Inforbar className="w-full h-full">받아올 정보</Inforbar>
            </div>
          </div>
        </div>

        {/* 원래 게임 참가를 누르면 참가중인 게임에 포함시켜야 하는데, 해당 js부분 이해 못해서 게임 관리 페이지로 넘어가도록 설정함 */}
        <div className="w-full h-20">
          <div className="w-1/2 float-left p-10 h-full">
            <div className="w-full text-center">
              <Link href={"./manage-game"}>
                <div className={`${Buttonstyle.btnred} ${"w-1/3"}`}>
                  게임참가
                </div>
              </Link>
            </div>
          </div>
        </div>
        {/* 확인 누르면 원래 homepage(임시로, temphome)으로 이동하도록 설정 */}
        <div className="w-full h-20">
          <div className="w-1/2 float-left p-10 h-full">
            <div className="w-full text-center">
              <Link href={"./temphome"}>
                <div className={`${Buttonstyle.btncyan} ${"w-1/3"}`}>확인</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

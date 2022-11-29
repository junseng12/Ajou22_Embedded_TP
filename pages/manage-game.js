import Link from "next/link";
import Inforbar from "../components/infobar";
import Buttonstyle from "../styles/button.module.css";
import Mainbar from "../components/mainbar";
import Createdbar from "../components/createdbar";
// 게임 관리 페이지 - 내가 생성한 게임들이 목록에 추가되고 이를 확인할 때,
// game-info가 아닌 다른 페이지로 연결되어 게임 수정 및 마감 가능 하도록 하는 페이지
export default function ManageGame() {
  return (
    <div
      className="flex w-full h-full flex-col items-center"
      id="Game Management Container"
    >
      <div
        className="flex w-full flex-col items-center pt-3 px-5"
        id="Game Management Upper"
      >
        {/* 해당 페이지 제목 */}
        <div className="rounded-3xl bg-gray-700 w-full text-5xl text-center font-bold py-3 px-5">
          (image추가)Game Management
        </div>
      </div>
      {/* 해당 페이지에서 게임 생성을 통해 추가된 게임바(mainbar)들을 정렬 하는 옵션들 */}
      <div className="w-full" id="Game Management Lower">
        <div className="flex w-full" id="Game list Upper(옵션 - 역삼각형 클릭)">
          <button className="rounded-full bg-gray-200 w-1/3 float-left p-3 text-center text-lg m-5">
            최근 순
          </button>
          <button className="rounded-full bg-gray-400 w-1/3 float-left p-3 text-center text-lg m-5">
            베팅 금액 순
          </button>
          <button className="rounded-full bg-gray-600 w-1/3 float-left p-3 text-center text-lg m-5">
            마감 일자 순
          </button>
        </div>

        {/*사용자가 생성한 게임바들이 나열되는 곳 - 정보 받아와서 여기 scroll바 있는 상자 내 추가해야 함 */}
        <div
          className="rounded-xl bg-gray-200 w-full h-4/6 p-5 m-5 overflow-y-auto"
          id="Game list Lower(스크롤 포함)"
        >
          <Createdbar></Createdbar>
          <Createdbar></Createdbar>
          <Createdbar></Createdbar>
          <Createdbar></Createdbar>
          <Createdbar></Createdbar>
          <Createdbar></Createdbar>
          <Createdbar></Createdbar>
        </div>
      </div>
    </div>
  );
}

// <div className="w-full h-20">
// <h1 className="text-4xl mb-5 font-bold p-6">Game Management</h1>
// </div>
// {/* <span className="text-7xl">💬</span> */}
// {/* 게임 정보(넣어야함) */}
// <div className="w-full h-full" id="명단 큰 상자">
// <div className="w-full h-full text-left py-6 px-10">주최 게임 목록</div>
// </div>

// <div className="w-full h-full" id="명단 큰 상자">
// <div className="w-full h-40 bg-gray-500" id="명단 큰 상자 아랫 부분">
//   <div className="w-full px-10 py-4 ">
//     <Inforbar className="w-full h-full">받아올 정보</Inforbar>
//   </div>

//   <div className="w-full px-10 py-4">
//     <Inforbar className="w-full h-full">받아올 정보</Inforbar>
//   </div>

//   <div className="w-full px-10 py-4 ">
//     <Inforbar className="w-full h-full">받아올 정보</Inforbar>
//   </div>

//   <div className="w-full px-10 py-4">
//     <Inforbar className="w-full h-full">받아올 정보</Inforbar>
//   </div>
// </div>

// <div className="w-full h-20">
//   <div className="w-1/2 float-left p-10 h-full">
//     <div className="w-full text-center">
//       <Link href={"./temphome"}>
//         <div className={`${Buttonstyle.btncyan} ${"w-1/3"}`}>
//           취소하기
//           {/* (어디로 돌아가며, 어떻게 설정할지 생각 X) */}
//         </div>
//       </Link>
//     </div>
//   </div>
// </div>

// <div className="w-full h-20">
//   <div className="w-1/2 float-left p-10 h-full">
//     <div className="w-full text-center">
//       <Link href={"./manage-game"}>
//         <div className={`${Buttonstyle.btnred} ${"w-1/3"}`}>
//           마감하기
//           {/* (어디로 돌아가며, 어떻게 설정할지 생각 X) */}
//         </div>
//       </Link>
//     </div>
//   </div>
// </div>
// </div>

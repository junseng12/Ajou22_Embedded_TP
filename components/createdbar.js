import Link from "next/link";
import Mainbarstyles from "../styles/mainbar.module.css";
//사용자가 생성한 게임에 대한 bar들로(기존 만들었던 게임바(mainbar)와 다르게 link를 설정해야 된다고 판단해서 새로 만듦)
export default function Createdbar({ children, home }) {
  return (
    // 사용자가 주최한 게임이다 보니 link를 다르게 설정해야 하므로 새로 createdbar 생성
    // 일단 ../temphome으로 연결되도록 설정했으나 차후에 변경 예정
    <Link href="../temphome">
      <div className={Mainbarstyles.mainbarwrap}>
        <div className={Mainbarstyles.bar}>
          <div data-editor-id="eventCardStatusLabel">
            시간 정보: {children} ex. 11월 24일 오후 8:00
          </div>

          <div data-editor-id="eventCardCategory">
            <div>
              <span>대회 정보: {children} ex. InternationaleWorld Cup 22</span>
            </div>
          </div>
          <div>
            <span>(앞에 이미지) 1팀</span>
          </div>
          <div>
            <span>(앞에 이미지) 2팀</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

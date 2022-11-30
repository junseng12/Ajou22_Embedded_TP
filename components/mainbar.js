import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Mainbarstyles from "../styles/mainbar.module.css";
//간략한 게임 정보 담아내는 게임바(mainbar) 역할 수행하는 component
export default function Mainbar({ children, home }) {
  return (
    <Link href="../game-info">
      <div type="bar" className={Mainbarstyles.mainbarwrap}>
        <div
          data-editor-id="eventCard"
          type="bar"
          className={Mainbarstyles.bar}
        >
          <div data-editor-id="eventCardStatusLabel">
            시간 정보: (받아와야 함) 11월 24일 오후 8:00
          </div>

          <div data-editor-id="eventCardCategory">
            <div>
              <span>대회 정보: (받아와야 함) InternationaleWorld Cup 22</span>
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

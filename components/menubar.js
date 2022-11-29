import Head from "next/head";
import Image from "next/image";
// import styles from "./layout.module.css";
// import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Menubarstyles from "../styles/menubar.module.css";
//메뉴바(menubar) component 각각 스타일 적용한 것 - 차후에 어울리게 맞추어 일괄적으로 재변경할듯
export default function Menubar({ children, home }) {
  return (
    <div className={Menubarstyles.menubarwrap}>
      <div id="barwrap">
        {/* <div className={Menubarstyles.menubartitle}>Menu Bar Upper</div> */}
        <div type="bar" className={Menubarstyles.bar}>
          {children}
        </div>
      </div>
    </div>
  );
}

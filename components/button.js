import Buttonstyle from "../styles/button.module.css";

export default function button() {
  /*버튼 기능 구현 이해 못함*/
  /*일단 만들어 놨는데, 그냥 button.module.css 파일만 쓰고 있음 - 실제로 Button 객체 새로 만들어서 사용 안했음*/
  return (
    <div>
      <div className={Buttonstyle.btn} id="container">
        Button
      </div>
    </div>
  );
}

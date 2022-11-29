import InfobarStyle from "../styles/mainbar.module.css";
import Mainbarstyles from "../styles/mainbar.module.css";
// home에서 게임바(mainbar) 클릭했을 경우, 게임 정보를 불러와서 보여주는 개별 바임 - 게임 정보에 각각의 바들
export default function inforbar({ children, home }) {
  return (
    <div type="bar" className={Mainbarstyles.bar}>
      <div data-editor-id="eventCard" type="bar" className={InfobarStyle.bar}>
        <div>
          <div>
            <div data-editor-id="eventCardStatusLabel">
              {/* 여기서 정보 어떻게 끌어올지는 이해 못함 */}
              <span>props {children}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

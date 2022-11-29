import Link from "next/link";
import Mainbarstyles from "../styles/mainbar.module.css";

const gameItems = [
  {
    href: "/",
    title: "홈",
  },
  {
    href: "/make-game",
    title: "게임 제작",
  },
  {
    href: "/manage-game",
    title: "게임 관리",
  },
  {
    href: "/participating-now",
    title: "참가중인 게임",
  },
];

export default function inforbar({ children, home }) {
  return (
    <div type="bar" className={Mainbarstyles.mainbarwrap}>
      <ul>
        {menuItems.map(({ href, title }) => (
          <li className="m-2" key={title}>
            <Link href={href}>
              <a
                className={`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer ${
                  router.asPath === href && "bg-fuchsia-600 text-red"
                }`}
              >
                props
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

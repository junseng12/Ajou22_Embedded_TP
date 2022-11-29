import Link from "next/link";
import { useRouter } from "next/router";
import Menubar from "../components/menubar";
import Mainbar from "../components/mainbar";

export default function Layout({ children }) {
  const router = useRouter();

  const menuItems = [
    {
      href: "/temphome",
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
  //게임 정보 위에 처럼 배열로 끌어오려고 추가했었음 - 제대로 이용하는 방법 모름
  const gameItems = [
    {
      href: "/game-info",
      title: "게임 정보",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-purple-400 sticky top-0 h-14 flex justify-between items-center font-semibold uppercase">
        <p></p>
        <header className=" ">E-sports dApp Platform</header>
        <div>
          {/*
          <button className="flex justify-end bg-purple-500">
            <div>
              <Link href="/sign-login">
                <a>login</a>
              </Link>
            </div>
          </button>
  */}
          <button className="flex justify-end bg-purple-500">
            <div>
              <Link href="/sign-registration">
                <a>registration</a>
              </Link>
            </div>
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-purple-200 w-full md:w-60">
          <nav>
            <ul>
              {menuItems.map(({ href, title }) => (
                <li className="m-2" key={title}>
                  <Link href={href}>
                    <a
                      className={`flex p-2 bg-fuchsia-200 rounded hover:bg-fuchsia-400 cursor-pointer ${
                        router.asPath === href && "bg-fuchsia-600 text-red"
                      }`}
                    >
                      <Menubar>{title}</Menubar>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main className="flex-1">
          {/* 여기서 nav로 게임 생성 등을 클릭했을 때 가져온다고 Mainbar 제거하였는데, 이 부분 이해 못함 */}
          {children}

          {/* <aside className=" w-full md:w-60">
            <nav>
              <ul>
                {gameItems.map(({ href, title }) => (
                  <li className="m-2" key={title}>
                    <Link href={href}>
                      <a
                        className={`flex p-2 rounded cursor-pointer ${
                          router.asPath === href && "bg-fuchsia-600 text-red"
                        }`}
                      >
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside> */}
        </main>
      </div>
    </div>
  );
}

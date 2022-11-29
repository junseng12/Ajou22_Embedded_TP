/* pages/_app.js */
import "../styles/globals.css";
import Layout from "../components/layout";
import Mainbar from "../components/mainbar";
import Menubar from "../components/menubar";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

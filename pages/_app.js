import "../styles/globals.css";
import SearchAppBar from "../components/Navbar";
import SideBar from "../components/SideBar";
import store from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <SearchAppBar />
            <SideBar />
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;

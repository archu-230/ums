import { Outlet } from "react-router-dom";
import Header from "../header";

const MainLayout = () => {
    return (
        <main className="pt-15">
            <Header />
            <Outlet />
        </main>
    );
};

export default MainLayout;
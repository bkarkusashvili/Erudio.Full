import React from "react";
import { Footer, Header } from "@/Components";

export const MainLayout = ({ children, hasFooterMenu = false }) => {
    return (
        <div className="main-layout">
            <Header />
            <main>
                {children}
            </main>
            <Footer hasFooterMenu={hasFooterMenu} />
        </div>
    );
};

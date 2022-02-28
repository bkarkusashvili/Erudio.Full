import React from "react";
import { Footer, Header, Title } from "@/Components";

export const MainLayout = ({ children, lang, auth, hasFooterMenu = false }) => {
    return (
        <div className="main-layout">
            <Title />
            <Header lang={lang} auth={auth} />
            <main>
                {children}
            </main>
            <Footer hasFooterMenu={hasFooterMenu} />
        </div>
    );
};

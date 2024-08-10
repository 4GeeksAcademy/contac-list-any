import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";
import ContactForm from "./views/AgregarContacto.jsx";
import { ContactProvider } from "./component/contactContext";

//create your first component
const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <ContactProvider>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/addcontact" element={<ContactForm />} />
                        <Route path="/addcontact/:id" element={<ContactForm />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/single/:theid" element={<Single />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </ContactProvider>
    );
};

export default injectContext(Layout);




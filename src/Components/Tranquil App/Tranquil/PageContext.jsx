import { useContext, createContext, useState } from "react";

const PageContext = createContext();

export const PageDetails = () => {
    return useContext(PageContext);
};

export const PageProvider = ({ children }) => {
    var [currentPage, setCurrentPage] = useState("home");
    return (
        <PageContext.Provider
            value={{
                currentPage,
                setCurrentPage,
            }}
        >
            {children}
        </PageContext.Provider>
    );
};

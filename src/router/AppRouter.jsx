import React, { useContext, useEffect } from "react";
import { AuthContext } from "../auth/context/authContext";
import { CrmRoutePrivate } from "../components/routes/CrmRoutePrivate";
import { CrmRoutePublic } from "../components/routes/CrmRoutePublic";
import { Header } from "../components/Pages";

export const AppRouter = () => {
    const { logged } = useContext(AuthContext);
    useEffect(() => { }, [logged]);
    return (
        <>
            <Header />
            {logged ? <CrmRoutePrivate /> : <CrmRoutePublic />}
        </>
    );
};

import React from "react";
import { Home } from "../Pages";
import { Login, Register } from "../../auth";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../notFound/NotFound";
export const CrmRoutePublic = () => {
    return (
        <>
            <div className="contenedor caja-contenido">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </>
    );
};

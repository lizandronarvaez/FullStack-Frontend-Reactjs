import React from "react";
import { Home } from "../Pages";
import { Login, Register } from "../../auth";
import { Navigate, Route, Routes } from "react-router-dom";
export const CrmRoutePublic = () => {
    return (
        <div className="contenedor caja-contenido">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path="*" element={<Navigate to={"/"} />} />
            </Routes>
        </div>
    );
};

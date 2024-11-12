import React from "react";
import { Dashboard, Nav } from "../Pages";
import { Navigate, Route, Routes } from "react-router-dom";
import { ClientsAll, ClientUpdate, ClientCreate } from "../clients";
import { ProductCreate, ProductsAll, ProductsUpdate } from "../products";
import { OrderPDF, OrderAll } from "../orders";

export const CrmRoutePrivate = () => {
    return (
        <div className="contenido-principal">
            <Nav />
            <Routes>
                <Route exact path="/dashboard" element={<Dashboard />} />

                <Route exact path="/clientes" element={<ClientsAll />} />
                <Route exact path='/clientes/nuevo-cliente' element={<ClientCreate />} />
                <Route exact path='/clientes/editar/:id' element={<ClientUpdate />} />

                <Route exact path="/productos" element={<ProductsAll />} />
                <Route exact path="/productos/nuevo-producto" element={<ProductCreate />} />
                <Route exact path="/productos/editar-producto/:id" element={<ProductsUpdate />} />

                <Route exact path="/pedidos/clientes" element={<OrderAll />} />
                <Route exact path="/pedidos/pdf/:idPedido" element={<OrderPDF />} />

                <Route path="*" element={<Navigate to={"/dashboard"} />} />
            </Routes>
        </div>
    );
};

/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import { clienteAxios } from "../../../api/axios";
import { useNavigate } from "react-router";
import { Spinner } from "../../Pages";
import { OrderItem } from "..";
import "./OrderAll.css";
export const OrderAll = () => {
    const navigate = useNavigate();
    const [pedidosLista, setPedidoLista] = useState([]);
    const bdBackend = async () => {
        try {
            const { data } = await clienteAxios.get("/orders");
            setPedidoLista(data);
        } catch (error) {
            error.response.status === 500
                ? navigate("/login")
                : null;
        }
    };
    const eliminarPedido = async (id) => await clienteAxios.delete(`/orders/${id}`);
    const pedidoTerminado = (e) => {
        if (e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent === "Pendiente") {
            e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent = "Servido";
            return;
        }
        e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent = "Pendiente";
    };
    useEffect(() => { bdBackend(); }, [pedidosLista]);
    return (
        <>
            <div className="resumen">
                <h2>Lista de pedidos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nº Pedido</th>
                            <th>ClienteId</th>
                            <th>Estado Pedido</th>
                            <th>Cliente</th>
                            <th>Importe</th>
                            <th>Acciones</th>
                            <th>Realizado</th>
                        </tr>
                    </thead>
                    {!pedidosLista.length
                        ? (
                            <>
                                <div>
                                    <Spinner />
                                    <h2>Cargando pedidos...</h2>
                                </div>
                            </>
                        )
                        : pedidosLista.map(pedido => (
                            <OrderItem
                                key={pedido._id}
                                datosPedido={pedido}
                                eliminarPedido={eliminarPedido}
                                pedidoTerminado={pedidoTerminado}
                            />
                        ))
                    }
                </table>
            </div>
        </>
    );
};

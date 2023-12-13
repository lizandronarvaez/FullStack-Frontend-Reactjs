import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { clienteAxios } from "../../../api/axios";
import { useNavigate } from "react-router";
import { Spinner } from "../../Pages";
import { OrderItem } from "..";
import "./OrderAll.css";
export const OrderAll = () => {
    const navigate = useNavigate();
    const [pedidosLista, setPedidoLista] = useState([]);
    const bdBackend = async () => {
        const { data } = await clienteAxios.get("/orders");
        setPedidoLista(data);
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
            <div className="orderAll">
                <div className="header">
                    <h2>Lista de pedidos</h2>
                    <Link to="Crear pedido">
                    </Link>
                </div>
                <div className="table-orders">
                    <table className="list-orders">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Nº Pedido</th>
                                <th>Estado Pedido</th>
                                <th>Cliente</th>
                                <th>Importe</th>
                                <th>Acciones</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        {pedidosLista.map(pedido => (
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
            </div>
        </>
    );
};

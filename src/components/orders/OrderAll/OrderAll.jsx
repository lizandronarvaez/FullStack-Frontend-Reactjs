import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { springBootAxios } from "../../../api/axios";
import { useNavigate } from "react-router";
import { Spinner } from "../../Pages";
import { OrderItem } from "..";
import "./OrderAll.css";
import Swal from "sweetalert2/dist/sweetalert2.all";
export const OrderAll = () => {
    const navigate = useNavigate();

    const [listOrderAlls, setListOrderAlls] = useState([]);

    const getAllOrders = async () => {
        const { data } = await springBootAxios.get("/orders");
        setListOrderAlls(data);
    };

    const onFinishOrder = (e) => {
        if (e.target.parentNode.previousSibling.previousSibling.textContent === "Pendiente") {
            e.target.parentNode.previousSibling.previousSibling.textContent = "Servido";
            return;
        }
        e.target.parentNode.previousSibling.previousSibling.textContent = "Pendiente";
    };
    useEffect(() => { getAllOrders(); }, []);
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
                                <th>Nº Pedido</th>
                                <th>Fecha</th>
                                <th>Cliente</th>
                                <th>Importe</th>
                                <th>Estado Pedido</th>
                                <th>Acciones</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        {
                            !listOrderAlls.length
                                ? null
                                : listOrderAlls.map(order => (
                                    <OrderItem
                                        key={order.id}
                                        orderItem={order}
                                        onFinishOrder={onFinishOrder}
                                    />
                                ))
                        }
                    </table>
                </div>
            </div>
        </>
    );
};

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { springBootAxios } from "../../../api/axios";
import { Spinner } from "../../Pages";
import { OrderItem } from "..";
import "./OrderAll.css";
export const OrderAll = () => {
    const [listOrderAlls, setListOrderAlls] = useState([]);

    const getAllOrders = async () => {
        const { data } = await springBootAxios.get("/orders");
        setListOrderAlls(data);
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
                    {
                        !listOrderAlls.length
                            ? <Spinner message={"Cargando lista pedidos..."} />
                            : <table className="list-orders">
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
                                    listOrderAlls.map(order => (
                                        <OrderItem
                                            key={order.id}
                                            orderItem={order}
                                        />
                                    ))
                                }
                            </table>
                    }
                </div>
            </div>
        </>
    );
};

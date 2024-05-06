/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { springBootAxios } from "../../../api/axios";
import { useParams } from "react-router-dom";
import { Pdf } from "../PDF/Pdf";
export const OrderPDF = () => {
    const { idPedido } = useParams();
    const [orders, setOrders] = useState([]);
    const consultaBDPedido = async () => {
        const { data } = await springBootAxios.get(`/orders/${idPedido}`);
        setOrders(data);
    };
    useEffect(() => { consultaBDPedido(); }, [orders]);
    return (
        <>
            {orders.length === 0 && !orders.id ? null : <Pdf data={orders} />}
        </>
    );
};

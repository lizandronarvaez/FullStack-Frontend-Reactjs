import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Cart, TableList, Users } from "../../../assets";
import Spinner from "../Spinner/Spinner";
import "./Dashboard.css";
import { springBootAxios } from "../../../api/axios";
const Dashboard = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState(0);
    const [products, setProducts] = useState(0);
    const [orders, setOrders] = useState(0);
    const getInfoBackend = async () => {
        try {
            const clientReponse = await springBootAxios.get("/clients");
            const productsResponse = await springBootAxios.get("/products");
            // const ordersResponse = await springBootAxios.get("/orders");
            setClients(clientReponse.data.length);
            setProducts(productsResponse.data.length);
            // setOrders(ordersResponse.data.length);
        } catch (error) {
            // eslint-disable-next-line no-unused-expressions
            error.response?.status === 500 ? navigate("/login") : null;
        }
    };
    useEffect(() => { getInfoBackend(); }, [clients, products, orders]);

    return (

        clients.length === 0 && products.length === 0 && orders.length === 0
            ? <Spinner />
            : <>
                <div className="dashboard">
                    <div className="caja-clientes">
                        <h2>Clientes</h2>
                        <div className="caja">
                            <p>{clients}</p>
                            <img src={Users} alt="icon" />
                        </div>
                    </div>
                    <div className="caja-productos">
                        <h2>Productos</h2>
                        <div className="caja">
                            <p>{products}</p>
                            <img src={Cart} alt="icon" />
                        </div>
                    </div>
                    <div className="caja-pedidos">
                        <h2>Pedidos</h2>
                        <div className="caja">
                            <p>{orders}</p>
                            <img src={TableList} alt="icon" />
                        </div>
                    </div>
                </div>
            </>

    );
};

export default Dashboard;

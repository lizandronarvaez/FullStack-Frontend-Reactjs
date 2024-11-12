import React, { useEffect, useState } from "react";
import { Cart, TableList, Users } from "../../../../public/index";
import Spinner from "../Spinner/Spinner";
import "./Dashboard.css";
import { springBootAxios } from "../../../api/axios";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const getInfoBackend = async () => {
        try {
            const clientReponse = await springBootAxios.get("/clients");
            const productsResponse = await springBootAxios.get("/products");
            const ordersResponse = await springBootAxios.get("/orders");

            setClients(clientReponse.data.length);
            setProducts(productsResponse.data.length);
            setOrders(ordersResponse.data.length);
        } catch (error) {
            error?.response?.status === 500 && navigate("/login");
        }
    };
    useEffect(() => { getInfoBackend(); }, []);

    return (
        <div className="dashboard">
            {
                clients.length === 0
                    ? <Spinner message={"Cargando clientes..."} />
                    : <div className="caja-clientes">
                        <h2>Clientes</h2>
                        <div className="caja">
                            <p>{clients}</p>
                            <img src={Users} alt="icon" />
                        </div>
                    </div>
            }
            {
                products.length === 0
                    ? <Spinner message={"Cargando productos..."} />
                    : <div className="caja-productos">
                        <h2>Productos</h2>
                        <div className="caja">
                            <p>{products}</p>
                            <img src={Cart} alt="icon" />
                        </div>
                    </div>
            }
            {
                orders.length === 0
                    ? <Spinner message={"Cargando pedidos..."} />
                    : <div className="caja-pedidos">
                        <h2>Pedidos</h2>
                        <div className="caja">
                            <div>
                                <p>Pendientes</p>
                                <p>{orders}</p>
                                <img src={TableList} alt="icon" />
                            </div>
                            <div>
                                <p>Completados</p>
                                <p>{orders / 2}</p>
                                <img src={TableList} alt="icon" />
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
};

export default Dashboard;

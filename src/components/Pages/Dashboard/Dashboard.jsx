/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Cart, TableList, Users } from "../../../assets";
import Spinner from "../Spinner/Spinner";
import "./Dashboard.css";
import { clienteAxios } from "../../../api/axios";
const Dashboard = () => {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState(0);
    const [productos, setProductos] = useState(0);
    const [pedidos, setPedidos] = useState(0);
    const consultaBackend = async () => {
        try {
            const getClientes = await clienteAxios.get("/clients");
            const getProductos = await clienteAxios.get("/products");
            const getPedidos = await clienteAxios.get("/orders");
            // useState
            setProductos(getProductos.data.length);
            setClientes(getClientes.data.length);
            setPedidos(getPedidos.data.length);
        } catch (error) {
            error.response.status === 500
                ? navigate("/login")
                : null;
        }
    };
    useEffect(() => {
        consultaBackend();
    }, [clientes, productos, pedidos]);

    return (

        clientes.length === 0 && productos.length === 0 && pedidos.length === 0
            ? <Spinner />
            : <>
                <div className="dashboard">
                    <div className="caja-clientes">
                        <h2>Clientes</h2>
                        <div className="caja">
                            <p>{clientes}</p>
                            <img src={Users} alt="icon" />
                        </div>
                    </div>
                    <div className="caja-productos">
                        <h2>Productos</h2>
                        <div className="caja">
                            <p>{productos}</p>
                            <img src={Cart} alt="icon" />
                        </div>
                    </div>
                    <div className="caja-pedidos">
                        <h2>Pedidos</h2>
                        <div className="caja">
                            <p>{pedidos}</p>
                            <img src={TableList} alt="icon" />
                        </div>
                    </div>
                </div>
            </>

    );
};

export default Dashboard;

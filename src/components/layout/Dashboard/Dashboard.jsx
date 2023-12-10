/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Cart, TableList, Users } from "../../../assets";
import clienteAxios from "../../../config/axios";
import { HOOKContext } from "../../../hooks/authContext";
import Spinner from "../Spinner/Spinner";
import "./Dashboard.css";
const Dashboard = () => {
    const navigate = useNavigate();
    // use state para cliente productos y pedidos
    const [clientes, setClientes] = useState(0);
    const [productos, setProductos] = useState(0);
    const [pedidos, setPedidos] = useState(0);
    // useContext
    const [auth, setAuth] = useContext(HOOKContext);

    const consultaBackend = async () => {
        // Si el token no esta vacio
        if (auth.token !== "") {
            try {
                // clientes
                const getClientes = await clienteAxios.get("/clientes");
                // Productos
                const getProductos = await clienteAxios.get("/productos");
                // Pedidos
                const getPedidos = await clienteAxios.get("/pedidos");
                // useState
                setProductos(getProductos.data.length);
                setClientes(getClientes.data.length);
                setPedidos(getPedidos.data.length);
            } catch (error) {
                error.response.status === 500
                    ? navigate("/login")
                    : null;
            }
            return;
        }
        navigate("/login");
    };
    useEffect(() => {
        consultaBackend();
    }, [clientes, productos, pedidos]);

    return (
        auth.authentication === false
            ? navigate("/login")
            : clientes.length === 0 && productos.length === 0 && pedidos.length === 0
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

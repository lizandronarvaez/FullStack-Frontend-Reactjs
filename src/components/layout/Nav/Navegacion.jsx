import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Cart, Home, TableList, Users } from "../../../assets";
import { HOOKContext } from "../../../hooks/authContext";
import "./Navegacion.css";
const Navegacion = () => {
    // eslint-disable-next-line no-unused-vars
    const [auth, setAuth] = useContext(HOOKContext);
    return (
        !auth.token
            ? null
            : <aside className="sidebar col-3">
                <h2>Administración</h2>
                <nav className="navegacion">
                    <Link to={"/users"} className="clientes"><img src={Home} alt="icon" />Dashboard</Link>
                    <Link to={"/clientes"} className="clientes"><img src={Users} alt="icon" />Clientes</Link>
                    <Link to={"/productos"} className="productos"><img src={Cart} alt="icon" />Productos</Link>
                    <Link to={"/pedidos/clientes"} className="pedidos"> <img src={TableList} alt="icon" />Pedidos</Link>
                </nav>
            </aside>

    );
};

export default Navegacion;

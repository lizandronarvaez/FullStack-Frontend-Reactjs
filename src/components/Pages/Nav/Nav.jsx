import React from "react";
import { Link } from "react-router-dom";
import { CartNav, Home, TableListNav, UsersNav } from "../../../../public/index";
import "./Nav.css";
const Nav = () => {
    return (

        <div className="sidebar">
            <h2> Administración</h2 >
            <nav className="navegacion">
                <Link to={"/dashboard"} className="clientes"><img src={Home} alt="icon" />Dashboard</Link>
                <Link to={"/clientes"} className="clientes"><img src={UsersNav} alt="icon" />Clientes</Link>
                <Link to={"/productos"} className="productos"><img src={CartNav} alt="icon" />Productos</Link>
                <Link to={"/pedidos/clientes"} className="pedidos"> <img src={TableListNav} alt="icon" />Pedidos</Link>
            </nav>
        </div >
    );
};

export default Nav;

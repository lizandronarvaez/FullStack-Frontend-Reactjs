/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { clienteAxios } from "../../../api/axios";
import { Spinner } from "../../Pages";
import { ProductItem } from "../";
export const ProductsAll = () => {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const consultarApiBackend = async () => {
        try {
            const { data } = await clienteAxios.get("/products");
            setProductos(data);
        } catch (error) {
            error.response.status === 500
                ? navigate("/login")
                : null;
        }
    };
    useEffect(() => { consultarApiBackend(); }, [productos]);
    return (
        <>
            <div>
                <h2>Productos</h2>
                <Link to={"/productos/nuevo-producto"} className="btn btn-verde nvo-cliente">
                    Nuevo Producto
                </Link>
                <ul className="listado-productos">
                    {!productos.length
                        ? (
                            <>
                                <div className="no-disponible">
                                    <Spinner />
                                    <h2>Cargando productos...</h2>
                                </div>
                            </>
                        )
                        : productos.map(producto => (
                            <ProductItem key={producto._id} productos={producto} />
                        ))}
                </ul>
            </div>

        </>

    );
};

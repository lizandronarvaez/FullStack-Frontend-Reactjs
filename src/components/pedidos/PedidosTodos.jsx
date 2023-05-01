/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from "react";
import clienteAxios from "../../config/axios";
import PedidosDetalles from "./PedidosDetalles";
import Spinner from "../layout/Spinner/Spinner";
// hooks
import { HOOKContext } from "../../hooks/authContext";
import { useNavigate } from "react-router";

const PedidosTodos = () => {
    const navigate = useNavigate();
    // hook JWT
    const [auth, setAuth] = useContext(HOOKContext);
    // useState
    const [pedidosLista, setPedidoLista] = useState([]);
    // Consulta bd backend
    const bdBackend = async () => {
        if (auth.token) {
            try {
                // Consulta ala bd de datos
                const consulta = await clienteAxios.get("/pedidos");
                const { data } = consulta;
                // Almacenar la data en el state
                setPedidoLista(data);
            } catch (error) {
                error.response.status === 500
                    ? navigate("/login")
                    : null;
            }
            return;
        }
        navigate("/login");
    };

    // Eliminar pedidos de la lista
    const eliminarPedido = async (id) => {
        await clienteAxios.delete(`/pedidos/${id}`);
    };
    // COmprobar que el pedido se ha completado
    const pedidoTerminado = (e) => {
        if (e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent == "Pendiente") {
            e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent = "Servido";
            return;
        }
        e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent = "Pendiente";
    };
    // useEffect
    useEffect(() => {
        // Funcion consulta bd_backend
        bdBackend();
    }, [pedidosLista]);
    return (
        <>
            <div className="resumen">
                <h2>Lista de pedidos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Nº Pedido</th>
                            <th>ClienteId</th>
                            <th>Estado Pedido</th>
                            <th>Cliente</th>
                            <th>Importe</th>
                            <th>Acciones</th>
                            <th>Realizado</th>
                        </tr>
                    </thead>
                    {pedidosLista.length === 0
                        ? <Spinner />
                        : pedidosLista.map(pedido => (
                            <PedidosDetalles
                                key={pedido._id}
                                datosPedido={pedido}
                                eliminarPedido={eliminarPedido}
                                pedidoTerminado={pedidoTerminado}
                            />
                        ))
                    }
                </table>
            </div>
        </>
    );
};

export default PedidosTodos;

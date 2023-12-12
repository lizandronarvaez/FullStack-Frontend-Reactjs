import React from "react";
import { useNavigate } from "react-router";
import { Delete, Edit, Pdf } from "../../assets";

export const OrderItem = (pedidos) => {
    const { datosPedido, eliminarPedido, pedidoTerminado } = pedidos;
    const navigate = useNavigate();
    const { _id, cliente, pedido, total } = datosPedido;
    const pedidoPDF = () => navigate(`/orders/pdf/${_id}`);
    return (
        <>
            <tbody>
                <tr>
                    <td data-titulo="Fecha:">
                        {new Date().toLocaleDateString()}
                    </td>
                    <td data-titulo="IdPedido:">
                        {/* {_id.substring(0, 10)} */}
                    </td>
                    <td data-titulo="IdCLiente:">
                        {/* {cliente._id.substring(0, 10)} */}
                    </td>
                    <td data-titulo="Estado:">Pendiente</td>
                    <td data-titulo="Cliente:">
                        {/* {cliente.nombre} {cliente.apellido} */}
                    </td>
                    <td data-titulo="Total:">{total}€</td>
                    <td data-titulo="Acciones:">
                        <button
                            type='button'
                            onClick={pedidoPDF}
                        >
                            <img src={Pdf} alt="icon pdf" />
                        </button>
                        <button
                            type='button'>
                            <img src={Edit} alt="icon edit" />
                        </button>
                        <button
                            type="button"
                            onClick={() => eliminarPedido(_id)}
                        >
                            <img src={Delete} alt="icon delete" />
                        </button>
                    </td>
                    <td data-titulo="Realizado">
                        <input
                            type="checkbox"
                            className='completar-pedido'
                            name="completar"
                            onClick={pedidoTerminado} />
                    </td>
                </tr>
            </tbody>
        </>
    );
};

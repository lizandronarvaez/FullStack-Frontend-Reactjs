import React from "react";
import { useNavigate } from "react-router";
import { Delete, Edit, Pdf } from "../../assets";

const PedidosDetalles = (pedidos) => {
    const { datosPedido, eliminarPedido, pedidoTerminado } = pedidos;
    console.log(pedidos)
    // Navigate
    const navigate = useNavigate();
    // Destructuring pedido
    // eslint-disable-next-line no-unused-vars
    const { _id, cliente, pedido, total } = datosPedido;
    // Mostrar pdf pedido
    const pedidoPDF = () => navigate(`/pedidos/pdf/${_id}`);

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
                    <td data-titulo="Toal:">{total}€</td>
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

export default PedidosDetalles;

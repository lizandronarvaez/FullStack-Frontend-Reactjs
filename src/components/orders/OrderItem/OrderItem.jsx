import React from "react";
import { useNavigate } from "react-router";
import { Delete, Edit, Pdf } from "../../../assets";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { springBootAxios } from "../../../api/axios";
import "./OrderItem.css";
export const OrderItem = ({ orderItem, onFinishOrder }) => {
    const navigate = useNavigate();

    // console.log(pedidos)
    const { _id, client: { fullname }, order, total } = orderItem;

    const onDeleteOrder = async (id) => {
        Swal.fire({
            title: "Estas seguro?",
            text: "Eliminar pedido?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await springBootAxios.delete(`/orders/${id}`);
                Swal.fire("¡Eliminado correctamente!", "", "success");
                navigate("/pedidos/clientes");
            }
        });
    };

    const pedidoPDF = () => navigate(`/pedidos/pdf/${_id}`);
    return (
        <>
            <tbody className="order-tbody">
                <tr>
                    <td data-titulo="idPedido:">{_id.substring(_id.length - 10)}</td>
                    <td data-titulo="Fecha:">{new Date().toLocaleDateString()}</td>
                    <td data-titulo="Cliente:">{fullname}</td>
                    <td data-titulo="Total:">{total}€</td>
                    <td data-titulo="Estado:">Pendiente</td>
                    <td data-titulo="Acciones:">
                        <button type='button' onClick={pedidoPDF}><img src={Pdf} alt="icon pdf" /></button>
                        <button
                            type='button'>
                            <img src={Edit} alt="icon edit"
                            />
                        </button>
                        <button
                            type="button"
                            onClick={() => onDeleteOrder(_id)}
                        >
                            <img src={Delete} alt="icon delete" />
                        </button>
                    </td>
                    <td data-titulo="Realizado">
                        <input
                            type="checkbox"
                            className='completar-pedido'
                            name="completar"
                            onClick={onFinishOrder}
                        />
                    </td>
                </tr>
            </tbody>
        </>
    );
};

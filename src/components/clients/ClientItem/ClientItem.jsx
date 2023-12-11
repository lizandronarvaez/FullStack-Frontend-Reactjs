/* eslint-disable no-lone-blocks */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { clienteAxios } from "../../../api/axios";
import "./ClientItem.css";
import { CreateOrder, Delete, Edit } from "../../../assets";

const Cliente = ({ cliente }) => {
    const navigate = useNavigate();
    const { _id, fullname, company, email, phone } = cliente;

    const eliminarCliente = (idCliente) => {
        Swal.fire({
            title: "Eliminar cliente, estas seguro?",
            text: "Si no estas seguro puedes cancelar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Si, eliminar cliente"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await clienteAxios.delete(`/clients/${idCliente}`)
                    .then(response => {
                        Swal.fire(
                            "Cliente Eliminado",
                            response.data,
                            "success"
                        );
                    });
                navigate("/clientes");
            }
        });
    };
    useEffect(() => {

    }, [cliente]);
    return (
        <>
            <tbody className="table-tbody">
                <tr>
                    <td className="fullname" data-titulo="Nombre:">{fullname}</td>
                    <td data-titulo="Email:">{email}</td>
                    <td className="company" data-titulo="Empresa:">{company}</td>
                    <td data-titulo="Telefono:">{phone}</td>
                    <td data-titulo="Acciones:">
                        <Link className="btn-create-order">
                            <img src={CreateOrder} alt="icon" />
                        </Link>
                        <Link className="btn-edit-client">
                            <img src={Edit} alt="icon" />
                        </Link>
                        <Link className="btn-delete-client" onClick={() => eliminarCliente(_id)}>
                            <img src={Delete} alt="icon" />
                        </Link>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

export default Cliente;

{ /* <li className="cliente">
<div className="info-cliente">
    <p className="nombre"></p>
    <p className="empresa">{empresa}</p>
    <p>{email}</p>
    <p>Tel: {telefono}</p>
</div>
<div className="acciones">
    <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
        <i className="fas fa-pen-alt"></i>
        Crear Pedido
    </Link>
    <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
        <i className="fas fa-pen-alt"></i>
        Editar Cliente
    </Link>
    <button
        type="button"
        className="btn btn-rojo btn-eliminar"
        onClick={() => eliminarCliente(_id)}>
        <i className="fas fa-times"></i>
        Eliminar Cliente
    </button>
</div>
</li> */ }

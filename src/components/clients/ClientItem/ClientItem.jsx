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
            title: "¿Eliminar cliente?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data: { message } } = await clienteAxios.delete(`/clients/${idCliente}`);
                Swal.fire(message, "", "success");
                navigate("/clientes");
            }
        });
    };
    useEffect(() => { }, [cliente]);
    return (
        <>
            <tbody className="table-tbody">
                <tr>
                    <td className="fullname" data-titulo="Nombre:">{fullname}</td>
                    <td data-titulo="Email:">{email}</td>
                    <td className="company" data-titulo="Empresa:">{company}</td>
                    <td data-titulo="Telefono:">{phone}</td>
                    <td data-titulo="Acciones:">
                        <Link className="btn-create-order" to={`/pedidos/nuevo/${_id}`}>
                            <img src={CreateOrder} alt="icon" />
                        </Link>
                        <Link className="btn-edit-client" to={`/clientes/editar/${_id}`} >
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

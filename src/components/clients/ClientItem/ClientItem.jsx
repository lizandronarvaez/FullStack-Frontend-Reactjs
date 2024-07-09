import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { springBootAxios } from "../../../api/axios";
import "./ClientItem.css";
import { Delete, Edit } from "../../../../public/index";

const ClientItem = ({ client }) => {
    const navigate = useNavigate();
    const { id, fullname, email, phone, address, city, country, postalcode, createdAt } = client;
    const deleteClient = (idCliente) => {
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
                const { data: { message } } = await springBootAxios.delete(`/clients/${idCliente}`);
                Swal.fire(message, "", "success");
                navigate("/clientes");
            }
        });
    };
    useEffect(() => { }, [client]);
    return (
        <>
            <tbody className="table-tbody">
                <tr>
                    <td className="fullname" data-titulo="Nombre:">{fullname}</td>
                    <td className="email" data-titulo="Email:">{email}</td>
                    <td className="company" data-titulo="Teléfono:">{phone}</td>
                    <td className="address" data-titulo="Dirección:">{address}</td>
                    <td className="city" data-titulo="Ciudad:">{city}</td>
                    <td className="country" data-titulo="País:">{country}</td>
                    <td data-titulo="Código Postal:">{postalcode}</td>
                    <td data-titulo="Fecha Registro:">{createdAt}</td>

                    <td data-titulo="Acciones:">
                        <Link className="btn-edit-client" to={`/clientes/editar/${id}`} >
                            <img src={Edit} alt="icon" />
                        </Link>
                        <Link className="btn-delete-client" onClick={() => deleteClient(id)}>
                            <img src={Delete} alt="icon" />
                        </Link>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

export default ClientItem;

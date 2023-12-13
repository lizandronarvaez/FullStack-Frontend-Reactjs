import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { clienteAxios } from "../../../api/axios";
import "./ClientUpdate.css";
const EditarCliente = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const [cliente, nuevoCliente] = useState({ fullname: "", company: "", email: "", phone: "" });
    const consultarApi = async () => {
        const { data } = await clienteAxios.get(`/clients/${_id}`);
        nuevoCliente(data);
    };
    useEffect(() => { consultarApi(); }, []);
    const datosFormulario = ({ target: { name, value } }) => { nuevoCliente({ ...cliente, [name]: value }); };
    const enviarFormulario = async (e) => {
        e.preventDefault();
        const { status } = await clienteAxios.put(`/clients/${_id}`, cliente);
        if (status !== 200) {
            Swal.fire({
                title: "Hubo un error",
                text: "No se pudo actualizar la informacion del cliente",
                icon: "error"
            });
            // TODO:REVISAR
            navigate("/");
            return;
        }
        Swal.fire({
            title: "Estas seguro?",
            text: "Comprueba que los datos estan correctamente escritos",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Actualizar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    "Datos actualizados",
                    "Se ha actualizó correctamente",
                    "success"
                );
                navigate("/clientes");
            }
        });
    };

    const validarFormulario = () => {
        const { fullname, company, email, phone } = cliente;
        const validar = !fullname.length || !company.length || !email.length || !phone.length;
        return validar;
    };

    return (
        <>
            <div className="client-update">
                <h2>Editar datos cliente</h2>
                <form className="form_update_client" onSubmit={enviarFormulario}>
                    <legend>Llena todos los campos</legend>
                    <div className="campo">
                        <label htmlFor="fullname">Nombre:</label>
                        <input type="text" value={cliente.fullname} name="fullname" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="company">Empresa:</label>
                        <input type="text" value={cliente.company} name="company" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="email">Email:</label>
                        <input type="email" value={cliente.email} name="email" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Teléfono:</label>
                        <input type="text" value={cliente.phone} name="phone" onChange={datosFormulario} />
                    </div>
                    <div className="campo">
                        <input type="submit" className="updateSubmit" value="Actualizar" disabled={validarFormulario()} />
                    </div>
                </form>
            </div>
        </>

    );
};

export default EditarCliente;

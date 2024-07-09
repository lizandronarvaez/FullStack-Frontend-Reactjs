import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { springBootAxios } from "../../../api/axios";
import "./ClientUpdate.css";

const formData = {
    fullname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalcode: ""
};
const EditarCliente = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [updateClient, setUpdateClient] = useState(formData);
    const getDataDB = async () => {
        const { data: { client } } = await springBootAxios.get(`/clients/${id}`);
        setUpdateClient(client);
    };
    useEffect(() => { getDataDB(); }, []);
    const handleFormData = ({ target: { name, value } }) => { setUpdateClient({ ...updateClient, [name]: value }); };
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const { status, data } = await springBootAxios.put(`/clients/${id}`, updateClient);
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
                    data.message,
                    "success"
                );
                navigate("/clientes");
            }
        });
    };

    return (
        <>
            <div className="client-update">
                <h2>Editar datos cliente</h2>
                <form className="form_update_client" onSubmit={handleSubmitForm}>
                    <legend>Llena todos los campos</legend>
                    <div className="campo">
                        <label htmlFor="fullname">Nombre:</label>
                        <input type="text" value={updateClient.fullname} name="fullname" onChange={handleFormData} />
                    </div>
                    <div className="campo">
                        <label htmlFor="company">Email:</label>
                        <input type="text" value={updateClient.email} name="email" onChange={handleFormData} />
                    </div>
                    <div className="campo">
                        <label htmlFor="phone">Teléfono:</label>
                        <input type="text" value={updateClient.phone} name="phone" onChange={handleFormData} />
                    </div>
                    <div className="campo">
                        <label htmlFor="address">Dirección:</label>
                        <input type="text" value={updateClient.address} name="address" onChange={handleFormData} />
                    </div>
                    <div className="campo">
                        <label htmlFor="city">Ciudad:</label>
                        <input type="text" value={updateClient.city} name="city" onChange={handleFormData} />
                    </div>
                    <div className="campo">
                        <label htmlFor="country">País:</label>
                        <input type="text" value={updateClient.country} name="country" onChange={handleFormData} />
                    </div>
                    <div className="campo">
                        <label htmlFor="postalCode">Código Postal:</label>
                        <input type="text" value={updateClient.postalcode} name="postalCode" onChange={handleFormData} />
                    </div>
                    <div className="campo campos-submit">
                        <input type="submit" className="updateSubmit" value="Actualizar" />
                        <input type="submit" className="cancelSubmit" value="Volver" onClick={() => navigate("/clientes")} />
                    </div>
                </form>
            </div>
        </>

    );
};

export default EditarCliente;

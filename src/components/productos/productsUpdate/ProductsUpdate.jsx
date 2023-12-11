/* eslint-disable no-multiple-empty-lines */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clienteAxios } from "../../../api/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
const formData = {
    nombre: "",
    precio: "",
    imagenProducto: ""
};
export const ProductsUpdate = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [actualizarProducto, setActualizarProducto] = useState(formData);
    const [imgProducto, setImgProducto] = useState("");
    const { nombre, precio, imagenProducto } = actualizarProducto;
    const consultarBackend = async () => {
        const { data } = await clienteAxios.get(`/productos/${_id}`);
        setActualizarProducto(data);
    };
    const setFormulario = ({ target: { name, value } }) => { setActualizarProducto({ ...actualizarProducto, [name]: [value] }) };
    const archivoImg = ({ target }) => setImgProducto(target.files[0]);

    const actualizarFormProducto = async (e) => {
        e.preventDefault();
        const { nombre, precio } = actualizarProducto;
        // Crear el formData y agregar los valores
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("imagenProducto", imgProducto);
        try {
            const { status, data } = await clienteAxios.put(`/products/${_id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (status === 200) {
                // Mostramos un mensaje si todo esta bien
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/productos");
            }
        } catch ({ response }) {
            Swal.fire("Error al actualizar el producto", response.data, "error");
        }
    };
    useEffect(() => { consultarBackend(); }, []);
    return (
        <>
            <h2>Editar Producto</h2>
            <form onSubmit={actualizarFormProducto}>
                <legend>Actualiza los datos de tus productos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        onChange={setFormulario}
                        value={nombre}
                        placeholder="Nombre Producto"
                        name="nombre"
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input
                        type="number"
                        onChange={setFormulario}
                        value={precio}
                        name="precio"
                        min="0.00"
                        step="0.01"
                        placeholder="Precio"
                    />
                </div>
                <div className="campo">
                    <label>Imagen:</label>
                    {imagenProducto
                        ? <img
                            src={`${import.meta.env.VITE_BASE_URL}/${imagenProducto}`}
                            alt="image producto" width={200}
                        />
                        : null}
                    <input
                        type="file"
                        onChange={archivoImg}
                        name="imagen"
                    />
                </div>

                <div className="enviar">
                    <input
                        type="submit"
                        className="btn btn-azul"
                        value="Actualizar Producto"
                    />
                </div>
            </form>
        </>
    );
};

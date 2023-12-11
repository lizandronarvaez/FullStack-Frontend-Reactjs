/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { clienteAxios } from "../../../api/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { useNavigate } from "react-router";
export const ProductCreate = () => {
    const navigate = useNavigate();
    const [agregarProducto, setAgregarProducto] = useState({ nombre: "", precio: "" });
    const [imgProducto, setImgProducto] = useState("");
    const setFormulario = ({ target: { name, value } }) => { setAgregarProducto({ ...agregarProducto, [name]: [value] }); };
    const imagenProductoForm = e => setImgProducto(e.target.files[0]);
    const validarFormulario = () => {
        const { nombre, precio } = agregarProducto;
        const validar = !nombre.length || !precio.length;
        return validar;
    };
    const submitFormulario = async (e) => {
        e.preventDefault();
        const { nombre, precio } = agregarProducto;
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("precio", precio);
        formData.append("imagenProducto", imgProducto);
        try {
            const { status, data } = await clienteAxios.post("/products", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (status === 201) {
                Swal.fire(
                    "Producto creado",
                    data.mensaje,
                    "success"
                );
            }
            navigate("/productos");
        } catch (error) {
            Swal.fire("Error al crear el producto", error.response.data, "error");
        }
    };
    return (
        <>
            <div>
                <h2>Nuevo Producto</h2>
                <form onSubmit={submitFormulario}>
                    <legend>Llena todos los campos</legend>
                    <div className="campo">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            onChange={setFormulario}
                            placeholder="Nombre Producto"
                            name="nombre"
                        />
                    </div>
                    <div className="campo">
                        <label>Precio:</label>
                        <input
                            type="number"
                            onChange={setFormulario}
                            name="precio"
                            min="0.00"
                            step="0.01"
                            placeholder="Precio"
                        />
                    </div>

                    <div className="campo">
                        <label>Imagen:</label>
                        <input
                            type="file"
                            onChange={imagenProductoForm}
                            name="imagen"
                        />
                    </div>

                    <div className="enviar">
                        <input
                            type="submit"
                            disabled={validarFormulario()}
                            className="btn btn-azul"
                            value="Agregar Producto"
                        />
                    </div>
                </form>
            </div>

        </>
    );
};

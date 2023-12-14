/* eslint-disable no-multiple-empty-lines */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clienteAxios } from "../../../api/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
import "./ProductsUpdate.css";
import { Upload } from "../../../assets";

const formDataValues = {
    fullname: "",
    brand: "",
    price: 0,
    stock: 0,
    productImage: null
};
export const ProductsUpdate = () => {
    const navigate = useNavigate();
    const { _id } = useParams();

    const [valuesProductBackend, setValuesProductBackend] = useState(formDataValues);
    const [productImage, setImgProducto] = useState("");

    const { fullname, brand, price, stock } = valuesProductBackend;

    const imgFormProduct = ({ target }) => setImgProducto(target.files[0]);

    const getProductById = async () => {
        const { data } = await clienteAxios.get(`/products/${_id}`);
        setValuesProductBackend(data);
    };

    const onNewValuesProduct = ({ target: { name, value } }) => setValuesProductBackend({ ...valuesProductBackend, [name]: value });

    const onNewFormValuesProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("productImage", productImage);

        try {
            const { data: { ok, message } } = await clienteAxios.put(`/products/${_id}`, formData);
            if (ok) {
                Swal.fire({ position: "center", icon: "success", title: message, showConfirmButton: false, timer: 1500 });
                navigate("/productos");
            }
        } catch ({ response }) {
            Swal.fire("Error al actualizar el producto", response.data || "Hubo un error al actualizar el producto", "error");
        }
    };
    useEffect(() => { getProductById(); }, []);

    return (
        <>
            <div className="update_product">
                <h2>Editar Producto</h2>
                <form className="form-update-product" onSubmit={onNewFormValuesProduct}>
                    <legend>Actualiza los datos de los productos</legend>
                    <div className="campo">
                        <label htmlFor="fullname">Nombre</label>
                        <input type="text" value={fullname} onChange={onNewValuesProduct} name="fullname" />
                    </div>
                    <div className="campo">
                        <label htmlFor="brand">Marca</label>
                        <input type="text" value={brand} onChange={onNewValuesProduct} name="brand" />
                    </div>
                    <div className="campo">
                        <label htmlFor="price">Precio</label>
                        <input type="number" value={price} onChange={onNewValuesProduct} name="price" min="0.00" step="0.01" />
                    </div>
                    <div className="campo">
                        <label htmlFor="stock">Unidades</label>
                        <input type="number" value={stock} onChange={onNewValuesProduct} name="stock" min="0.00" step="0.01" />
                    </div>
                    <div className="campo campo-imagen">
                        <label htmlFor="productImage"><img src={Upload} alt="icon" />Subir Imagen</label>
                        <input type="file" id="productImage" onChange={imgFormProduct} name="productImage" />
                    </div>
                    <div className="campo ">
                        <input type="submit" className="updateSubmit" value="Actualizar" />
                    </div>
                </form>
            </div>
        </>
    );
};

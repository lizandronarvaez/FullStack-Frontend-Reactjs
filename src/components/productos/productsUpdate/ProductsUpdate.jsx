/* eslint-disable no-multiple-empty-lines */
import "./ProductsUpdate.css";
import { formDataInput } from "../helpers/FormDataInputs";
import { springBootAxios } from "../../../api/axios";
import { Upload } from "../../../assets";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all";

export const ProductsUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [valuesProductBackend, setValuesProductBackend] = useState(formDataInput);
    const [imageProduct, setImageProduct] = useState("");
    const { fullname, description, price, quantity, category } = valuesProductBackend;
    if (imageProduct) Swal.fire("Imagen subida con éxito", "", "success");
    const imgFormProduct = ({ target }) => setImageProduct(target.files[0]);
    const getProductById = async () => {
        const { data: { product } } = await springBootAxios.get(`/products/${id}`);
        delete product.category.id;
        const categoryName = product.category.name;
        product.category = categoryName;
        setValuesProductBackend(product);
    };
    const onNewValuesProduct = ({ target: { name, value } }) => setValuesProductBackend({ ...valuesProductBackend, [name]: value });

    const onNewFormValuesProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("imageProduct", imageProduct);

        try {
            const { data: { message, status } } = await springBootAxios.put(`/products/${id}`, formData);

            if (status === 200) {
                Swal.fire({ position: "center", icon: "success", title: message, showConfirmButton: false, timer: 1500 });
                navigate("/productos");
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Error al actualizar el producto", error?.response?.data.message || "Hubo un error al actualizar el producto", "error");
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
                        <input type="text" value={description} onChange={onNewValuesProduct} name="description" />
                    </div>
                    <div className="campo">
                        <label htmlFor="category">Categoría del producto*</label>
                        <div className="category">
                            <select onChange={onNewValuesProduct} name="category" value={category} style={{ fontWeight: "600" }}>
                                <option value="proteinas">Proteínas</option>
                                <option value="carbohidratos">Carbohidratos</option>
                                <option value="creatinas">Creatinas</option>
                                <option value="sin_lactosa">Sin Lactosa</option>
                            </select>
                        </div>
                    </div>
                    <div className="campo">
                        <label htmlFor="price">Precio</label>
                        <input type="number" value={price} onChange={onNewValuesProduct} name="price" min="0.00" step="0.01" />
                    </div>
                    <div className="campo">
                        <label htmlFor="stock">Unidades</label>
                        <input type="number" value={quantity} onChange={onNewValuesProduct} name="quantity" min="0.00" step="0.01" />
                    </div>
                    <div className="campo campo-imagen">
                        <label htmlFor="imageProduct"><img src={Upload} alt="icon" />Subir Imagen</label>
                        <input type="file" id="imageProduct" onChange={imgFormProduct} name="imageProduct" />
                    </div>
                    <div className="campo ">
                        <input type="submit" className="updateSubmit" value="Actualizar" />
                    </div>
                </form>
            </div>
        </>
    );
};
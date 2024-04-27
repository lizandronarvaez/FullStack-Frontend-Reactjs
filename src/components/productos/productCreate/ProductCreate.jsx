import "./ProductCreate.css";
import { formDataInput } from "../helpers/FormDataInputs";
import { springBootAxios } from "../../../api/axios";
import { Upload } from "../../../assets";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all";

export const ProductCreate = () => {
    const navigate = useNavigate();
    const [agregarProducto, setAgregarProducto] = useState(formDataInput);
    const { fullname, description, price, quantity, category } = agregarProducto;
    const onInputForm = ({ target: { name, value } }) => { setAgregarProducto({ ...agregarProducto, [name]: value }); };
    const imagenProductoForm = (e) => setImgProducto(e.target.files[0]);
    const [imageProduct, setImgProducto] = useState("");

    if (imageProduct) Swal.fire("Imagen subida con éxito", "", "success");
    const validarFormulario = () => {
        return !fullname.length || !description.length || !category.length || price === 0 || quantity === 0
            ? Swal.fire("Completar los campos", "Campos incompletos", "error")
            : null;
    };

    const submitFormulario = async (e) => {
        e.preventDefault();
        validarFormulario();
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("category", category);

        if (imageProduct) formData.append("imageProduct", imageProduct);

        try {
            const { data: { message, ok } } = await springBootAxios.post("/products", formData);
            if (ok) Swal.fire("Producto creado", message, "success");
            navigate("/productos");
        } catch (error) {
            console.log(error);
            Swal.fire("Error al crear el producto", error?.response?.data || "Hubo un error al crear el producto", "error");
        }
    };

    return (
        <>
            <div className="product-create">
                <h2>Crear Producto</h2>
                <form className="form-create-product" onSubmit={submitFormulario}>
                    <legend>Campos obligatorios*</legend>
                    <div className="campo">
                        <label htmlFor="fullname">Nombre*</label>
                        <input type="text" onChange={onInputForm} placeholder="Nombre Producto" name="fullname" />
                    </div>
                    <div className="campo">
                        <label htmlFor="brand">Descripción del producto*</label>
                        <input type="text" onChange={onInputForm} placeholder="Nombre Producto" name="description" />
                    </div>
                    <div className="campo">
                        <label htmlFor="brand">Categoría del producto*</label>
                        <div className="category">
                            <select onChange={onInputForm} name="category">
                                <option value="proteinas">Proteínas</option>
                                <option value="carbohidratos">Carbohidratos</option>
                                <option value="creatinas">Creatinas</option>
                                <option value="sin_lactosa">Sin Lactosa</option>
                            </select>
                        </div>
                    </div>
                    <div className="campo">
                        <label htmlFor="price">Precio*</label>
                        <input type="number" onChange={onInputForm} name="price" min="0.00" step="0.01" placeholder="Precio" />
                    </div>
                    <div className="campo">
                        <label htmlFor="stock">Unidades*</label>
                        <input type="number" onChange={onInputForm} name="quantity" min="0.00" step="0.01" placeholder="Stock productos" />
                    </div>
                    <div className="campo campo-imagen">
                        <label htmlFor="productImage"><img src={Upload} alt="icon" />Subir imagen</label>
                        <input type="file" id="productImage" onChange={imagenProductoForm} name="imageProduct" />
                    </div>
                    <div className="campo">
                        <input type="submit" className="createSubmit" value="Añadir stock" />
                    </div>
                </form>
            </div>

        </>
    );
};

import React, { useState } from "react";
import { clienteAxios } from "../../../api/axios";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { useNavigate } from "react-router";
import { Upload } from "../../../assets";
import "./ProductCreate.css";
const inputValues = {
    fullname: "",
    brand: "",
    price: 0,
    stock: 0
};
export const ProductCreate = () => {
    const navigate = useNavigate();
    const [agregarProducto, setAgregarProducto] = useState(inputValues);
    const { fullname, brand, price, stock } = agregarProducto;
    const onInputForm = ({ target: { name, value } }) => { setAgregarProducto({ ...agregarProducto, [name]: value }); };
    const imagenProductoForm = (e) => setImgProducto(e.target.files[0]);
    const [productImage, setImgProducto] = useState("");

    if (productImage) {
        Swal.fire("Imagen subida con éxito", "", "success");
    }
    const validarFormulario = () => {
        const validar = !fullname.length || !brand.length || price === 0 || stock === 0;
        return validar;
    };

    const submitFormulario = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("brand", brand);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("productImage", productImage);

        try {
            const { data: { message, ok } } = await clienteAxios.post("/products", formData);
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
                        <label htmlFor="brand">Marca*</label>
                        <input type="text" onChange={onInputForm} placeholder="Nombre Producto" name="brand" />
                    </div>
                    <div className="campo">
                        <label htmlFor="price">Precio*</label>
                        <input type="number" onChange={onInputForm} name="price" min="0.00" step="0.01" placeholder="Precio" />
                    </div>
                    <div className="campo">
                        <label htmlFor="stock">Unidades*</label>
                        <input type="number" onChange={onInputForm} name="stock" min="0.00" step="0.01" placeholder="Stock productos" />
                    </div>
                    <div className="campo campo-imagen">
                        <label htmlFor="productImage"><img src={Upload} alt="icon" />Subir imagen</label>
                        <input type="file" id="productImage" onChange={imagenProductoForm} name="productImage" />
                    </div>
                    <div className="campo">
                        <input type="submit" className="createSubmit" disabled={validarFormulario()} value="Añadir stock" />
                    </div>
                </form>
            </div>

        </>
    );
};

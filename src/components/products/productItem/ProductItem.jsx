import "./ProductItem.css";
import { Delete, Edit } from "../../../../public/index";
import { Link } from "react-router-dom";
import { springBootAxios } from "../../../api/axios";
import React, { useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all";

export const ProductItem = ({ productos }) => {
    const { id, fullname, description, price, quantity, imageProduct, category: { name } } = productos;
    const deleteProduct = (idProducto) => {
        Swal.fire({
            title: "Eliminar producto, estas seguro?",
            text: "Si no estas seguro puedes cancelar.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "No, cancelar",
            confirmButtonText: "Si, eliminar producto"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await springBootAxios.delete(`/products/${idProducto}`);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Producto eliminado correctamente",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } catch (error) {
                    console.error("Error al eliminar el producto:", error);
                }
            }
        });
    };

    useEffect(() => { }, [productos]);
    return (
        <>
            <tbody className="table-tbody">
                <tr>
                    <td className="fullname" data-titulo="Nombre:">{fullname}</td>
                    <td className="brand" data-titulo="Description:">{description}</td>
                    <td className="price" data-titulo="Precio Unitario:">{price}€</td>
                    <td className="stock" data-titulo="Stock:">{quantity} uds</td>
                    <td className="category" data-titulo="Categoría:">{name}</td>
                    <td className="img" data-titulo="Imagen:">
                        {imageProduct
                            ? (<img className="imgProduct" src={`${imageProduct}`} alt={imageProduct} />)
                            : null
                        }
                    </td>
                    <td data-titulo="Acciones:">
                        <Link
                            className="btn-edit-product"
                            to={`/productos/editar-producto/${id}`}
                        >
                            <img src={Edit} alt="icon" />
                        </Link>
                        <Link
                            className="btn-delete-product"
                            onClick={() => deleteProduct(id)}
                        >
                            <img src={Delete} alt="icon" />
                        </Link>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

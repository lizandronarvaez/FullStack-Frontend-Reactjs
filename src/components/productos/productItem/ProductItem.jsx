import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { clienteAxios } from "../../../api/axios";
import "./ProductItem.css";
import { Delete, Edit } from "../../../assets";
import { getEnv } from "../../../helpers/getEnv";
const { VITE_BASE_URL } = getEnv();
export const ProductItem = ({ productos }) => {
    const { _id, fullname, brand, price, productImage, stock } = productos;
    const eliminarProducto = (idProducto) => {
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
                await clienteAxios.delete(`/productos/${idProducto}`)
                    .then(response => {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Producto eliminado correctamente",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });
    };
    return (
        <>
            <tbody className="table-tbody">
                <tr>
                    <td className="fullname" data-titulo="Nombre:">{fullname}</td>
                    <td className="brand" data-titulo="Marca:">{brand}</td>
                    <td className="price" data-titulo="Precio Unitario:">{price}€</td>
                    <td className="stock" data-titulo="Stock:">{stock} uds</td>
                    <td data-titulo="Imagen:"><img className="imgProduct" src={`${VITE_BASE_URL}/uploads/${productImage}`} alt="img" /></td>
                    <td data-titulo="Acciones:">
                        <Link className="btn-edit-product" to={`/productos/editar-producto/${_id}`} >
                            <img src={Edit} alt="icon" />
                        </Link>
                        <Link className="btn-delete-product" onClick={() => eliminarProducto(_id)}>
                            <img src={Delete} alt="icon" />
                        </Link>
                    </td>
                </tr>
            </tbody>
        </>
    );
};

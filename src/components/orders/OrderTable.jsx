import React from "react";
import { Delete } from "../../../public/index";

export const OrderTable = ({ index, producto, cantidadProductos, eliminarProductoLista }) => {
    const { nombre, precio } = producto;
    return (
        <tbody>
            <tr>
                <td data-titulo="Pedido">{index + 1}</td>
                <td data-titulo="Articulo">{nombre}</td>
                <td data-titulo="Precio Unitario">{precio}€</td>
                <td data-titulo="Cantidad art.">
                    <input
                        type="number"
                        defaultValue={0}
                        min={0}
                        onChange={(e) => cantidadProductos(e, index)}
                    />
                </td>
                <td data-titulo="Acciones">
                    <button
                        type="button"
                        onClick={() => eliminarProductoLista(producto._id)}
                    >
                        <img src={Delete} alt="icon delete" />
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

import React from "react";
import Delete from "../../assets/delete.svg";
const PedidosProductos = (props) => {
    // Desestructuracion de los props
    const { index, producto, cantidadProductos, eliminarProductoLista } = props;
    // Desestructuracion de los productos
    const { nombre, precio } = producto;
    return (
        <tbody>
            <tr>
                <td data-titulo="Pedido">{index + 1}</td>
                <td data-titulo="Articulo">{nombre}</td>
                <td data-titulo="Precio Unitario">{precio}€</td>
                <td data-titulo="Cantidad art.">
                    <input type="number"
                        defaultValue={0}
                        min={0}
                        onChange={(e) => cantidadProductos(e, index)}
                    />
                </td>
                <td data-titulo="Acciones">
                    <button type="button"
                        onClick={() => eliminarProductoLista(producto._id)}
                    >
                        <img src={Delete} alt="icon delete" />
                    </button>
                </td>
            </tr>
        </tbody>
    );
};

export default PedidosProductos;

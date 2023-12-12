import React from "react";
import "./SearchProducts.css";
export const SearchProducts = ({ buscarProducto, valorInput }) => {
    return (
        <form className="search-products" onSubmit={buscarProducto}>
            <legend>Busca los productos para crear un pedido</legend>
            <div className="campo">
                <label>Productos:</label>
                <input type="text" placeholder="Busca el producto" name="productos" onChange={valorInput} />
            </div>
            <div className="campo">
                <input type="submit" value="Buscar producto" />
            </div>
        </form>
    );
};

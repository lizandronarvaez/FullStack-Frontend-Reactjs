import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { clienteAxios } from "../../../api/axios";
import { ProductItem } from "../";
import "./ProductAll.css";
export const ProductsAll = () => {
    const [productos, setProductos] = useState([]);
    const [buscarProducto, setBuscarProducto] = useState("");
    const [productsFilter, setProductsFilter] = useState([]);
    const [searchProduct, setSearchProduct] = useState(false);
    const consultaProductos = async () => {
        const { data } = await clienteAxios.get("/products");
        setProductos(data);
    };

    const handleBusquedaProductos = (e) => {
        e.preventDefault();
        const result = e.target.value;
        setBuscarProducto(result);
        setSearchProduct(true);
        filterProduct(result);
    };

    const filterProduct = (word) => {
        const filteredProducts = productos.filter((product) => {
            const { fullname, brand } = product;
            const searchValue = word.toLowerCase().trim();
            return (fullname.toLowerCase().includes(searchValue) || brand.toLowerCase().includes(searchValue));
        });
        setProductsFilter(filteredProducts);
    };
    useEffect(() => { consultaProductos(); }, [productos]);
    return (
        <>
            <div className="productsAll">
                <div className="header">
                    <h2>Productos</h2>
                    <Link to={"/productos/nuevo-producto"}>
                        Crear Producto
                    </Link>
                </div>
                <form className="form-search-product" onSubmit={handleBusquedaProductos}>
                    <div className="search-product">
                        <label htmlFor="word">Buscar un producto</label>
                        <input type="text" placeholder="Introduce el nombre de un producto" name="word"
                            value={buscarProducto}
                            onChange={handleBusquedaProductos} />
                        {searchProduct && productsFilter.length === 0 && <span className="product-notFound">No existe ningún producto</span>}
                    </div>
                    <div className="table-products">
                        <table className='list-products'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Marca</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Imagen</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            {!productsFilter.length
                                ? productos.map((product) => (<ProductItem key={product._id} productos={product} />))
                                : productsFilter.map((product) => (<ProductItem key={product._id} productos={product} />))}
                        </table>
                    </div>

                </form>
            </div>

        </>

    );
};

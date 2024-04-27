import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { springBootAxios } from "../../../api/axios";
import { ProductItem } from "../";
import "./ProductAll.css";
export const ProductsAll = () => {
    const [productsAll, setProductsAll] = useState([]);
    const [findProduct, setFindProduct] = useState("");
    const [productsFilter, setProductsFilter] = useState([]);
    const [searchProduct, setSearchProduct] = useState(false);
    const handleGetProductsDB = async () => {
        const { data } = await springBootAxios.get("/products");
        setProductsAll(data);
    };
    const handleSearchProducts = (e) => {
        e.preventDefault();
        const result = e.target.value;
        setFindProduct(result);
        setSearchProduct(true);
        filterProduct(result);
    };

    const filterProduct = (word) => {
        const filteredProducts = productsAll.filter((product) => {
            const { fullname, description } = product;
            const searchValue = word.toLowerCase().trim();
            return (fullname.toLowerCase().includes(searchValue) || description.toLowerCase().includes(searchValue));
        });
        setProductsFilter(filteredProducts);
    };
    useEffect(() => { handleGetProductsDB(); }, []);
    return (
        <>
            <div className="productsAll">
                <div className="header">
                    <h2>Productos</h2>
                    <Link to={"/productos/nuevo-producto"}>
                        Crear Producto
                    </Link>
                </div>

                {/* // TODO: CREAR FORMULARIO Y COMPONENTE PARA FILTRAR LOS PRODUCTOS POR CATEGORIA; */}

                <form className="form-search-product" onSubmit={handleSearchProducts}>
                    <div className="search-product">
                        <label htmlFor="word">Buscar un producto</label>
                        <input
                            type="text"
                            placeholder="Introduce el nombre de un producto"
                            name="word"
                            value={findProduct}
                            onChange={handleSearchProducts}
                        />
                        {searchProduct && productsFilter.length === 0 && <span className="product-notFound">No existe ningún producto</span>}
                    </div>
                    <div className="table-products">
                        <table className='list-products'>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Categoría</th>
                                    <th>Imagen</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            {!productsFilter.length
                                ? productsAll.map((product) => (<ProductItem key={product.id} productos={product} />))
                                : productsFilter.map((product) => (<ProductItem key={product.id} productos={product} />))}
                        </table>
                    </div>

                </form>
            </div>

        </>

    );
};

import React, { useEffect, useState } from "react";
import "./SearchProducts.css";
import { clienteAxios } from "../../../api/axios";
import { ListTableSearch } from "./ListTableSearch/ListTableSearch";
export const SearchProducts = ({ buscarProducto, onAddProduct }) => {
    const [searchProduct, setSearchProduct] = useState("");
    const [dbProducts, setdbProducts] = useState([]);
    const [dbProductFiltered, setdbProductsFiltered] = useState([]);

    const valorInput = ({ target: { value } }) => setSearchProduct(value);
    const SearchValueClean = searchProduct.trim().toLowerCase();

    const onSearchProductDB = async () => {
        if (SearchValueClean < 1) return;
        const { data } = await clienteAxios.get(`/products/clientes/${SearchValueClean}`);
        setdbProducts(data);
    };

    const filteredProducts = (e) => {
        const productsFilter = dbProducts.filter((product) => {
            const productName = product.fullname.toLowerCase();
            const brandName = product.fullname.toLowerCase();
            return productName.includes(SearchValueClean) || brandName.includes(SearchValueClean) || null;
        }
        );
        setdbProductsFiltered(productsFilter);
    };
    useEffect(() => {
        onSearchProductDB();
        filteredProducts();
    }, [searchProduct]);
    return (
        <>
            <form className="search-products">
                <legend>Busca los productos para crear un pedido</legend>
                <div >
                    <div className="campo">
                        <label>Productos:</label>
                        <input type="text"
                            placeholder="Busca el producto"
                            name="productos"
                            onChange={valorInput}
                        />
                    </div>
                    {
                        searchProduct.length > 1
                            ? < ListTableSearch dbProductFiltered={dbProductFiltered} onAddProduct={onAddProduct} />
                            : null
                    }
                </div>

            </form >
        </>
    );
};

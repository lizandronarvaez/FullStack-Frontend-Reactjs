/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
// Componentes de la pagina
import { Dashboard, Header, Home, Navegacion } from "./components/layout";
// Componentes de los routes
import { Routes, Route } from "react-router-dom";
import { Clientes, EditarCliente, NuevoCliente } from "./components/clientes";
import { EditarProducto, NuevoProducto, Productos } from "./components/productos";
import { NuevoPedido, PedidoPDF, PedidosTodos } from "./components/pedidos";
// hookContent
import { HOOKContext, AUTHContext } from "./hooks/authContext";
import NotFound from "./components/notFound/NotFound";
import { Login, Register } from "./components/auth";
import ResetPassword from "./components/auth/ResetPassword/ResetPassword";

const App = () => {
    // Uso del hook context
    const [auth, setAuth] = useContext(HOOKContext);
    return (
        <>
            <AUTHContext value={[auth, setAuth]}>
                <Header />
                <div className="grid contenedor contenido-principal">
                    <Navegacion />
                    <main className="caja-contenido col-9">
                        <Routes>
                            <Route exact path="/" Component={Home} />
                            <Route exact path="/users" Component={Dashboard} />

                            <Route exact path="/clientes" Component={Clientes} />
                            <Route exact path='/clientes/nuevo-cliente' Component={NuevoCliente} />
                            <Route exact path='/clientes/editar/:_id' Component={EditarCliente} />

                            <Route exact path="/productos" Component={Productos} />
                            <Route exact path="/productos/nuevo-producto" Component={NuevoProducto} />
                            <Route exact path="/productos/editar-producto/:_id" Component={EditarProducto} />

                            <Route exact path="/pedidos/clientes" Component={PedidosTodos} />
                            <Route exact path="/pedidos/nuevo/:_id" Component={NuevoPedido} />
                            <Route exact path="/pedidos/pdf/:_idPedido" Component={PedidoPDF} />

                            <Route exact path="/login" Component={Login} />
                            <Route exact path="/register" Component={Register} />
                            <Route exact path="/password-reset" Component={ResetPassword} />

                            <Route exact path="*" Component={NotFound} />
                        </Routes>
                    </main>
                </div>
            </AUTHContext>
        </>
    );
};
export default App;

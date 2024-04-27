import React from "react";
import { AuthProvider } from "./auth/context/authContext";
import { AppRouter } from "./router/AppRouter";
export const App = () => {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
};

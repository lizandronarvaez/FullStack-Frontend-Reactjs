import Swal from "sweetalert2/dist/sweetalert2.all";
// Respuesta correcta
export const handleSuccessResponse = async (data, status) => {
    if (status !== 200) {
        Swal.fire({
            title: "El cliente ya esta esta registrado o existe",
            text: "Hubo un conflicto de datos",
            icon: "error"
        });
        return;
    }
    Swal.fire(data.message, "", "success");
};

// Error en la respuesta
export const handleErrorResponse = async (err) => {
    if (err.response.status === 500) {
        Swal.fire({
            title: err.response.data,
            text: "",
            icon: "error"
        });
    }
    if (err.response.status === 404) {
        Swal.fire({
            title: "Campos obligatorios",
            text: "Los campos son obligatorios",
            icon: "error"
        });
    }
};

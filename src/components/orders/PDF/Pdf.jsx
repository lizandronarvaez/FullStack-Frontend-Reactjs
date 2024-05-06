import React from 'react'
import { Page, Text, View, Document, PDFViewer } from "@react-pdf/renderer";

export const Pdf = ({ data }) => {

    const { id, clientEntity: { fullname, phone, address, city }, details, total } = data;

    console.log(data)
    return (
        <>
            <PDFViewer width="100%" height="900px" showToolbar:true>
                <Document pageMode="fullScreen">
                    <Page size="A4" >
                        <View style={{ fontSize: 10, maxWidth: "95%", height: "760", margin: "10 auto", border: 1 }}>
                            <Text style={{ fontSize: 30, margin: "10 auto 20 auto" }}>Hoja de Pedido</Text>
                            <View style={{ flexDirection: "row", padding: "2 10" }}>
                                <View style={{ width: "50%" }}>
                                    <View style={{ flexDirection: "row", margin: 5 }}>
                                        <Text style={{ paddingBottom: 5, width: "50%" }}>N° PEDIDO:</Text>
                                        <Text style={{ paddingBottom: 5, width: "50%" }}>{id}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", margin: 5 }}>
                                        <Text style={{ paddingBottom: 5, width: "50%" }}>NOMBRE COMERCIAL:</Text>
                                        <Text style={{ paddingBottom: 5, width: "50%" }}>ProteinSHOP</Text>
                                    </View>
                                    <View style={{ border: 1, padding: 4, margin: "16 0 0 0 " }}>
                                        <Text style={{ paddingBottom: 5, fontSize: 16, textAlign: "center" }}>DATOS DE FACTURACIÓN</Text>
                                        <View style={{ flexDirection: "row", fontSize: 9 }}>
                                            <Text style={{ paddingBottom: 5, width: "50%" }}>Cliente:</Text>
                                            <Text style={{ paddingBottom: 5, width: "50%", textAlign: "right", textTransform: "capitalize" }}>{fullname}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", fontSize: 9 }}>
                                            <Text style={{ paddingBottom: 5, width: "50%" }}>Telefono:</Text>
                                            <Text style={{ paddingBottom: 5, width: "50%", textAlign: "right" }}>{phone}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", fontSize: 9 }}>
                                            <Text style={{ paddingBottom: 5, width: "50%" }}>Dirección Entrega:</Text>
                                            <Text style={{ paddingBottom: 5, width: "50%", textAlign: "right" }}>{address}, {city}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: "50%" }}>
                                    <View style={{ flexDirection: "row", marginBottom: 5, marginLeft: 10, marginTop: 5 }}>
                                        <Text style={{ paddingBottom: 5, width: "50%" }}>Pedido realizado:</Text>
                                        <Text style={{ paddingBottom: 5, width: "50%", textAlign: "center" }}>{new Date().toLocaleDateString()}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                                        <Text style={{ paddingBottom: 15, width: "50%" }}>Entrega del Pedido:</Text>
                                        <Text style={{ paddingBottom: 5, width: "50%", textAlign: "center" }}>{new Date().getDate() + 3}/{new Date().getMonth() + 1}/{new Date().getFullYear()}</Text>
                                    </View>
                                    <View style={{ border: 1, padding: 5, marginTop:15 }}>
                                        <Text style={{ paddingBottom: 5, fontSize: 16, textAlign: "center" }}>DATOS DE ENTREGA</Text>
                                        <View style={{ flexDirection: "row", fontSize: 9 }}>
                                            <Text style={{ paddingBottom: 5, width: "50%" }}>Entregar a:</Text>
                                            <Text style={{ paddingBottom: 5, width: "50%", textAlign: "right", textTransform: "capitalize" }}>{fullname}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", fontSize: 9 }}>
                                            <Text style={{ paddingBottom: 5, width: "50%" }}>Telefono:</Text>
                                            <Text style={{ paddingBottom: 5, width: "50%", textAlign: "right" }}>{phone}</Text>
                                        </View>
                                        <View style={{ flexDirection: "row", fontSize: 9 }}>
                                            <Text style={{ paddingBottom: 5, width: "50%" }}>Dirección Entrega:</Text>
                                            <Text style={{ paddingBottom: 5, width: "50%", textAlign: "right" }}>{address}, {city}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: 530, height: 200, border: 2, margin: "10 auto" }}>
                                <View style={{ borderBottom: 1, flexDirection: "row", justifyContent: "space-around", fontSize: 12 }}>
                                    <Text style={{ padding: "5 0", width: 207, margin: "0 auto", borderRight: 1, textAlign: "center" }}>Productos</Text>
                                    <Text style={{ padding: "5 40 5 0", width: 130, textAlign: "center", borderRight: 1, margin: "0 auto" }}>Precio</Text>
                                    <Text style={{ padding: "5 0 0 10", width: 95 }}>Cantidad</Text>
                                </View>
                                {
                                    details.map((item, i) => (

                                        < View View key={i} style={{ borderBottom: 1, flexDirection: "row", justifyContent: "space-around", fontSize: 13 }}>
                                            <Text style={{ padding: "5 0 5 0", width: 207, borderRight: 1, textAlign: "center" }}>{item.product?.fullname}</Text>
                                            <Text style={{ padding: "5 30 0 0", width: 130, textAlign: "center", borderRight: 1 }}>{item.price}</Text>
                                            <Text style={{ padding: "5 30 0 0", width: 47 }}>{item.quantity}</Text>
                                        </View>
                                    )
                                    )
                                }
                            </View>
                            <View style={{ border: 0, padding: 10, textAlign: "right", maxWidth: 520, margin: "50 30 0 auto" }}>
                                <Text style={{ marginBottom: 10, fontSize: 15, borderBottom: 1 }}>Total Pedido:</Text>
                                <Text style={{ fontSize: 20, fontWeight: 900 }}>{total.toFixed(2)}€</Text>
                            </View>
                        </View>
                    </Page>
                </Document>
            </PDFViewer >
        </>
    )
}

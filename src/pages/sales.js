import { ThemeProvider } from "@mui/material/styles";
import React, { Fragment, useEffect, useState } from "react";
import Auth from "../components/auth";
import { theme } from "../components/theme";
import Sales from "../components/sales/index"
import { App } from "@capacitor/app";
import { Dialog } from "@mui/material";

const SalesPage = () => {
    const [activeComponent, setActiveComponent] = useState("sales")
    const [reloadList, setReloadList] = useState(false)

    useEffect(() => {
        App.addListener('backButton', data => {
            Dialog.confirm({ title: "Confirm", massage: "Apakah anda ingin keluar?" })
            .then(response => {
                console.log("res: ", response)
                if (response && response.value) {
                    App.exitApp()
                }
            })
        })
        setReloadList(true)
    }, [])
    return (
        <Fragment>
            <Auth />
            <ThemeProvider theme={theme}>
                {activeComponent === "sales" && <Sales reloadList={reloadList} />}
            </ThemeProvider>
        </Fragment>
    )
}

export default SalesPage;
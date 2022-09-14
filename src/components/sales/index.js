import React, { useState, useEffect } from "react";
import { Storage } from "@capacitor/storage";
import { navigate } from "gatsby"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import Avatar from "@mui/material/Avatar";
import Tab from "@mui/material/Tab"
import TextField  from "@mui/material/TextField"
import SearchIcon from "@mui/icons-material/Search"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import EventIcon from '@mui/icons-material/Event'
import SpeedIcon from '@mui/icons-material/Speed'
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar"
import CardContent from '@mui/material/CardContent'
import InputAdornment from "@mui/material/InputAdornment"
import Snackbar from "@mui/material/Snackbar"
import Tabs from "@mui/material/Tabs"
import Fab from '@mui/material/Fab'
import Sidebar from "../sidebar"
import Loader from "../loader"
import axios from "axios"
import logo from "../../images/logo.png"

const Index = (props) => {
  console.log(props);
  const [showSidebar, setShowSidebar] = useState(false);
  const [session, setSession] = useState({
    expired_at: 0,
    employee_code: "",
    employee_name: "",
    position_name: "",
    status: 1,
    token: "",
    username: "",
    employee_img: "",
  });
  const [value, setValue] = useState(0);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (props.reloadList) {
      setLoading(true);
      Storage.get({ key: "user" }).then(
        (user) => {
          console.log(user);
          if (user.value) {
            user = JSON.parse(user.value);
            console.log(user);
            setSession(user);
            getListing(user)
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [props.reloadList]);

  const getListing = (user) => {
    setLoading(true)
    console.log("user", user)
    axios.get("https://us.izzibook.co.id/apilapakmobil/Car_info/offsetViewSales/0/0/0/0/0/0/0/20", {
        headers: {
            "Authorization": "Bearer " + user.token
        }
    })
    .then(function(response) {
        console.log("res: ", response)
        if (response && response.data) {
            setListings(response.data)
            console.log("listing: ", listings)
        } else {
            setListings([])
        }
        setLoading(false)
    })
    .catch(function (error) {
        console.log(error)
        let message = "TERJADI KESALAHAN PADA SISTEM. MOHON COBA BEBERAPA SAAT LAGI"
        if (error && error.response && error.response.data) {
            console.log(error.response.data)
            if (error.response.data.message) {
            message = error.response.data.message
            }
        }
        setLoading(false)
        setAlert(true)
        setAlertMessage(message)
        if (error.response.status == 401) {
            setTimeout(function () {
            Storage.remove({ key: "user" })
                .then(user => {
                navigate("/login")
                }, error => {
                console.log(error)
                }
            )
            }, 2000)
        }
    })
  }

  const hideSidebar = () => {
    setShowSidebar(false)
  }

  return (
    <Box className="index">
      <Box sx={{ backgroundColor: "#132f61", color: "#fff", borderRadius: "0 0 15px 15px" }}>
        <Card sx={{ backgroundColor: "#132f61", color: "#fff", padding: "10px", boxShadow: "none" }}>
        <CardHeader 
            sx={{color: "#fff"}} 
            avatar={<a href="profile"><Avatar src={"https://us.izzibook.co.id/apilapakmobil/" + session.employee_img}></Avatar></a>}
            title={"Hi, " + session.employee_name} subheader={session.position_name}
          />
          <CardContent sx={{ paddingBottom: "0 !important" }}>
            <TextField
                fullWidth
                className="search"
                variant="outlined"
                size="small"
                placeholder="Cari Mobil..."
                sx={{ 
                    backgroundColor: "#586c90",
                    color: "#fff",
                    borderRadius: "25px"
                }}
                InputProps={{
                    startAdornment:
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }}
            />
          </CardContent>
        </Card>
        <Tabs value={value} sx={{ margin: "0 30px" }}>
            <Tab label="Listing Mobil" sx={{ color: "#fff", textTransform: "none" }} />
        </Tabs>
      </Box>
      <br />
      <Box>
      {listings.map((item, index) =>
          <Card key={index} sx={{ display: "flex", flexDirection: "row", boxShadow: "3", width: "95%", borderRadius: "0px 10px 10px 0px", marginBottom: "10px" }}>
            <CardMedia
              component="img"
              image={item.ImageFilename ? "https://us.izzibook.co.id/apilapakmobil/" + item.ImageFilename : logo}
              sx={{ width: "30%", height: "180px", objectFit: "contain", backgroundColor: item.DirImage ? "#fff" : "#132f61" }}
            />
            <CardContent sx={{ width: "65%" }}>
              <Typography variant="body2" gutterBottom>
                <strong>{item.BrandName} {item.CarVariant} {item.CarType}</strong><br/>
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                <EventIcon sx={{ marginRight: "5px" }} /> {item.YearMade} <br />
                <SpeedIcon sx={{ marginRight: "5px", marginLeft: "10px" }} /> {item.CarSpeedometer}
              </Typography>
              <br/>
              <Button size="small" variant="contained" color="primary" sx={{ borderRadius: "25px", fontWeight: "bold", float: "right" }}>{item.SellCashPrice}</Button>
            </CardContent>
          </Card>
        )}
      </Box>
      <Fab color="primary" sx={{ position: "fixed", bottom: "25px", right: "25px" }}><DirectionsCarIcon /></Fab>
      <Sidebar showSidebar={showSidebar} hideSidebar={() => hideSidebar()} />
      <Loader open={loading} />
      <Snackbar open={alert} message={alertMessage} action={<IconButton color="inherit" size="small" onClick={() => setAlert(false)}><CloseIcon fontSize="small" /></IconButton>} />
    </Box>
  );
};

export default Index;

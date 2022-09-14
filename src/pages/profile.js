import { Storage } from "@capacitor/storage";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader"
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Avatar from "@mui/material/Avatar";
import React, { useState, useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import Typography from "@mui/material/Typography";
import TextField  from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Grid  from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TemporaryDrawer from "../components/popup";


const UserProfile = () => {
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

      useEffect(() => {
        Storage.get({ key: "user" }).then(
          (user) => {
            console.log(user);
            if (user.value) {
              user = JSON.parse(user.value);
              console.log(user);
              setSession(user);
            }
          }
        );
      }, []);

      const logout = () => {
        const confirm = window.confirm("are you sure?");
        if(confirm){
            window.location.href = "/login";
            Storage.remove({ key: "user" })
        }
    }

  return (
    <Box className="userProfile">
      <Box sx={{ backgroundColor: "#AAB9D2" }}>
        <Card sx={{ backgroundColor: "#132f61", color: "#fff", padding: "10px", boxShadow: "none", border: "1px solid #132f61", borderRadius: "0 0 15px 15px" }}>
          <div style={{ width:"100%", display: "flex", padding: "10px"}}>
              <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "5px" }}>
                  <a aria-label="Back" href={session.position_name === "Salesman" ? "/sales" : "/purchasing"} style={{ color: "#fff" }}><ArrowBackIosNewIcon  /></a>
              </div>
              <CardHeader sx={{ color: "fff", padding: "0 10px", width:"100%" }}  title="User Profile" />
              <div onClick={logout} style={{ display: "flex", justifyContent: "flex-end", marginTop: "5px", marginRight: "32px", cursor: "pointer" }}>
                  <LogoutIcon />
              </div>
          </div>
        </Card>
        <Card sx={{ backgroundColor: "#AAB9D2", padding: "10px", boxShadow: "none" }}>
          <div style={{ display: "flex", padding: "10px", marginLeft: "20px"}}>
              <CardHeader 
                sx={{color: "#fff", padding: "2px" }} 
                avatar={<Avatar sx={{ width: "100px", height: "100px" }} src={"https://us.izzibook.co.id/apilapakmobil/" + session.employee_img}></Avatar>} 
              />
            <Typography variant="body2" component="span" gutterBottom sx={{ marginRight: "20%", display: "flex", flexDirection: "column", color: "#000", justifyContent: "center" }}>
                <div style={{  display: "flex", alignItems: "center", marginTop: "10px" }}>
                  <PersonIcon sx={{ width: "30px", height: "30px", margin: "0 10px" }} /><strong>{session.employee_name}</strong>
                </div>
                <div style={{  display: "flex", alignItems: "center", marginBottom: "10px"}}>
                  <CallIcon sx={{ width: "30px", height: "30px", margin: "0 10px" }} /><strong>087123456793</strong>
                </div>
            </Typography>
          </div>
        </Card>
      </Box>
      <Grid>
        <Paper style={{ padding: "30px 20px", width: "300", margin: "20px auto", boxShadow: "none" }}>
            <div style={{ margin: "0px 10px", fontSize: "18px" }}>
              <div>
                <InputLabel>Nama</InputLabel>
                <TextField 
                  fullWidth 
                  disabled 
                  InputProps={{ style: { fontSize: 19 } }} 
                  variant="standard" 
                  value={session.employee_name} 
                  style={{ marginBottom: "10px" }} />
              </div>
              <div>
                <InputLabel>Jabatan</InputLabel>
                <TextField 
                  fullWidth 
                  disabled 
                  InputProps={{ style: { fontSize: 19 } }} 
                  variant="standard" 
                  value={session.position_name} 
                  style={{ marginBottom: "10px" }} 
                />
              </div>
              <div>
                <InputLabel>Nomor Handphone</InputLabel>
                <TextField 
                  fullWidth 
                  disabled 
                  InputProps={{ style: { fontSize: 19 } }} 
                  variant="standard" 
                  value="087123456793" 
                  style={{ marginBottom: "10px" }} 
                />
              </div>
              <div>
                <InputLabel>Alamat</InputLabel>
                <TextField 
                  fullWidth 
                  disabled 
                  InputProps={{ style: { fontSize: 19 } }} 
                  variant="standard"  
                  value="" 
                  style={{ marginBottom: "10px" }} 
                />
              </div>
              <div>
                <InputLabel>Password</InputLabel>
                <TemporaryDrawer />
              </div>
              <div>
                <InputLabel>Kode</InputLabel>
                  <TextField 
                  fullWidth 
                  disabled 
                  InputProps={{ style: { fontSize: 19 } }} 
                  variant="standard" 
                  value={session.employee_code} 
                  style={{ marginBottom: "10px" }} 
                />
              </div>
            </div>
        </Paper>
      </Grid>
    </Box>
  );
};

export default UserProfile;

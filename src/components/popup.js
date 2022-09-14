import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Grid  from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from '@mui/material/IconButton';
import InputLabel from "@mui/material/InputLabel";
import List from '@mui/material/List';
import LockIcon from '@mui/icons-material/Lock';
import Paper from "@mui/material/Paper";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function TemporaryDrawer() {
  const [state, setState] = useState({
    bottom: false,
  });
  const [OldPass, setOldPass] = useState({
    showPassword: false,
  });
  const [NewPass, setNewPass] = useState({
    showPassword: false,
  });
  const [ConfirmPass, setConfirmPass] = useState({
    showPassword: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const handleClickShowOldPassword = () => {
    setOldPass({
      ...OldPass,
      showPassword: !OldPass.showPassword,
    });
  };

  const handleClickShowNewPassword = () => {
    setNewPass({
      ...NewPass,
      showPassword: !NewPass.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPass({
      ...ConfirmPass,
      showPassword: !ConfirmPass.showPassword,
    });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
    >
      <List>
        <Grid sx={{ paddingBottom: "80px" }}>
            <Paper style={{ padding: "0 30px 0 20px", width: "300", margin: "20px auto", boxShadow: "none" }}>
                <div style={{ marginLeft: "10px", marginBottom: "25px", marginTop: "10px" }}>
                    <InputLabel sx={{ color: "#009688" }}><strong>Ganti Password</strong></InputLabel>
                </div>
                <div style={{ margin: "0px 10px" }}>
                    <div>
                        <InputLabel>Password Lama</InputLabel>
                        <TextField
                            fullWidth 
                            id="password-lama"  
                            variant="standard"
                            InputProps={{
                                type: OldPass.showPassword ? "text" : "password",
                                endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowOldPassword}
                                        edge="end"
                                      >
                                        {OldPass.showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                )  
                            }}
                            style={{ marginBottom: "10px" }} 
                        />
                    </div>
                    <div>
                        <InputLabel>Password Baru</InputLabel>
                        <TextField 
                            fullWidth 
                            id="password-baru" 
                            variant="standard"
                            InputProps={{
                                type: NewPass.showPassword ? "text" : "password",
                                endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowNewPassword}
                                        edge="end"
                                      >
                                        {NewPass.showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                )  
                            }}
                            style={{ marginBottom: "10px" }}
                        />
                    </div>
                    <div>
                        <InputLabel>Konfirmasi Password Baru</InputLabel>
                        <TextField
                            fullWidth  
                            id="Confirm-password"  
                            variant="standard"
                            InputProps={{
                                type: ConfirmPass.showPassword ? "text" : "password",
                                endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        edge="end"
                                      >
                                        {ConfirmPass.showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                )  
                            }}
                            style={{ marginBottom: "10px" }} 
                        />
                    </div>
                    <Button fullWidth variant="contained" sx={{ marginTop: "15px", backgroundColor: "#f4511e", borderRadius: "50px" }}>
                        Submit
                    </Button>
                </div>
            </Paper>
        </Grid>
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment key={'bottom'}>
          <Button fullWidth onClick={toggleDrawer('bottom', true)} style={{ padding: "0" }}>
            <TextField 
                fullWidth 
                disabled 
                id="standard-basic" 
                placeholder="&#9632;&#9632;&#9632;&#9632;&#9632;" 
                variant="standard" 
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                style={{ marginBottom: "10px" }}
            />
          </Button>
          <Drawer
            anchor={'bottom'}
            open={state['bottom']}
            onClose={toggleDrawer('bottom', false)}
          >
            {list('bottom')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

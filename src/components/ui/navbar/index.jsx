import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import MuiButton from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Hidden from "@mui/material/Hidden";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Dialog from "components/ui/dialog";
import Swal from "sweetalert2";
import http from "utils/http";
import { useNavigate } from "react-router-dom";

const settings = [
  { name: "Profile", url: "/profile" },
  { name: "Favorite Anime", url: "/favorite-anime" },
  { name: "My Reviews", url: "/my-reviews" },
  { name: "Logout", url: "/logout" },
];

const Button = ({ children, handleClick }) => (
  <MuiButton
    color="inherit"
    sx={{
      "&:hover": {
        backgroundColor: "transparent !important",
      },
      fontWeight: "600 !important",
    }}
    onClick={handleClick}
  >
    {children}
  </MuiButton>
);

const ButtonContained = ({ children, variant, handleClick }) => (
  <MuiButton
    variant={variant}
    color="error"
    sx={{ p: 0, borderRadius: 1, px: 4 }}
    onClick={handleClick}
  >
    {children}
  </MuiButton>
);

const ResponsiveAppBar = () => {
  let navigate = useNavigate();
  let profile = localStorage.getItem("profile");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [fullname, setFullname] = React.useState("");
  const [showModal, setShowModal] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleLogin = async () => {
    setShowModal(null);
    const request = await http.post("/auth/login", {
      email,
      password,
    });

    const result = request.data.data;

    localStorage.setItem("session", result.token);
    localStorage.setItem("profile", JSON.stringify(result.result));

    window.location.reload();
  };

  const handleRegister = async () => {
    setShowModal(null);

    if (password !== password2) {
      Swal.fire({
        title: "",
        html: "Confirm password is not matched",
        icon: "error",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    } else {
      await http.post("/auth/register", {
        fullname,
        email,
        password,
      });

      handleLogin();
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ bgcolor: "#fff", borderBottom: "1px solid #B4B4B4" }}
      >
        <Container>
          <Toolbar disableGutters>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              spacing={1}
            >
              <Grid item md={1.5} xs={12}>
                <img
                  src="/images/joi-logo-side.png"
                  alt="logo"
                  width="100%"
                  style={{ marginBottom: "-10px" }}
                />
              </Grid>
              <Grid item md={7} xs={12}>
                <Box ml="1vw">
                  <Button handleClick={() => navigate("/")}>Home</Button>
                  <Button handleClick={() => navigate("/news")}>News</Button>
                  <Button handleClick={() => navigate("/anime")}>Anime</Button>
                  <Button handleClick={() => navigate("/reviews")}>
                    Review
                  </Button>
                </Box>
              </Grid>
              <Hidden mdDown>
                <Grid item md={3}>
                  {profile ? (
                    <Box
                      sx={{ flexGrow: 0 }}
                      display="flex"
                      justifyContent="flex-end"
                    >
                      <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                          sizes="small"
                        />
                      </IconButton>
                      <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {settings.map((setting) => (
                          <MenuItem
                            key={setting.name}
                            onClick={() => navigate(setting.url)}
                          >
                            <Typography textAlign="center">
                              {setting.name}
                            </Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
                  ) : (
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                      <ButtonContained
                        variant="outlined"
                        handleClick={() => setShowModal("login")}
                      >
                        Login
                      </ButtonContained>
                      <ButtonContained
                        variant="contained"
                        handleClick={() => setShowModal("register")}
                      >
                        Sign Up
                      </ButtonContained>
                    </Box>
                  )}
                </Grid>
              </Hidden>
            </Grid>
          </Toolbar>
        </Container>
      </AppBar>

      <Dialog
        open={showModal === "login"}
        handleClose={() => setShowModal(null)}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <img src="/images/logo.png" alt="logo" width="100px" />
        </Box>

        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          type="password"
        />

        <MuiButton
          variant="contained"
          color="error"
          size="medium"
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleLogin}
        >
          Log In
        </MuiButton>

        <Box my={1}>
          <Typography align="center">
            Or login using your social account
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          <MuiButton
            startIcon={
              <img
                src="https://www.pngkey.com/png/full/887-8879913_facebook-logo-white-cross.png"
                alt="icons"
                width="20px"
              />
            }
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
          >
            Log in with Facebook
          </MuiButton>
          <MuiButton
            startIcon={
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                alt="icons"
                width="20px"
              />
            }
            variant="contained"
            color="inherit"
            size="medium"
            fullWidth
          >
            Log in with Google
          </MuiButton>
        </Box>
      </Dialog>

      <Dialog
        open={showModal === "register"}
        handleClose={() => setShowModal(null)}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <img src="/images/logo.png" alt="logo" width="100px" />
        </Box>

        <TextField
          label="Fullname"
          onChange={(e) => setFullname(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          type="password"
        />
        <TextField
          label="Confirm Password"
          onChange={(e) => setPassword2(e.target.value)}
          fullWidth
          type="password"
        />

        <MuiButton
          variant="contained"
          color="error"
          size="medium"
          fullWidth
          sx={{ mt: 1 }}
          onClick={handleRegister}
        >
          Sign Up
        </MuiButton>

        <Box my={1}>
          <Typography align="center">
            Or sign up using your social account
          </Typography>
        </Box>

        <Box display="flex" gap={1}>
          <MuiButton
            startIcon={
              <img
                src="https://www.pngkey.com/png/full/887-8879913_facebook-logo-white-cross.png"
                alt="icons"
                width="20px"
              />
            }
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
          >
            Sign up with Facebook
          </MuiButton>
          <MuiButton
            startIcon={
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                alt="icons"
                width="20px"
              />
            }
            variant="contained"
            color="inherit"
            size="medium"
            fullWidth
          >
            Sign up with Google
          </MuiButton>
        </Box>
      </Dialog>
    </>
  );
};
export default ResponsiveAppBar;

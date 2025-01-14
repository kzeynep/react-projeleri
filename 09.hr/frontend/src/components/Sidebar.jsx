import * as React from "react";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useDispatch, useSelector } from "react-redux";
import "../css/Dashboard.css";
import storageService from "../services/StorageService";
import { useNavigate } from "react-router-dom";
import { sideBarIcons } from "../statics/data/SideBarIcons";
import { setIsAuthenticate } from "../redux/slices/appSlice";
import Button from "@mui/material/Button";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";




import TreeView from "./TreeView";

const drawerWidth = 210;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar({ children }) {


  const {currentUser} = useSelector((store)=> store.app);

  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen , setMenuOpen] = useState(false);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawer = () => {
    setOpen(!open);
  };

  window.onresize = () => {
    if (window.screen.width <= 480) {
      setOpen(false);
    }
  };

  const logout = () => {
    storageService.removeToken();
    storageService.removeRefreshToken();
    dispatch(setIsAuthenticate(false));
    navigate("/login");
  };

  const { menuList } = useSelector((store) => store.menu);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#2f4050" }}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={{
                marginRight: "5px",
              }}
            >
              <MenuIcon sx={{ fontSize: "17px" }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontSize: "17px", fontFamily: "arial" }}
            >
              İnsan Kaynakları
            </Typography>
          </div>

          <Button
            id="demo-positioned-button"
            className="logout"
            aria-controls={menuOpen ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? "true" : undefined}
            onClick={handleClick}
          >
            <div style={{display:'flex' , alignItems:'center', justifyContent:'center'}}>
             <CgProfile className="profile" style={{marginRight:'5px'}} />
             <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ fontSize: "13px", fontFamily: "arial", textTransform:'none' , color:'lightgrey' }}
            >
            {currentUser.firstname}
            </Typography>
             </div>
          </Button>

          <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
       
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}><CgProfile className="menu-icon"/> Hesabım</MenuItem>
        <MenuItem onClick={handleClose}><IoMdSettings className="menu-icon"/>Ayarlar</MenuItem>
        <MenuItem onClick={logout }><IoLogOutOutline className="menu-icon" /> Çıkış</MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            backgroundColor: "#2f4050",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link to="/">
            <Box
              component="img"
              sx={{ width: "50px", height: "50px" }}
              src="src/assets/hr-logo.png"
            />
          </Link>
        </DrawerHeader>
        <Divider sx={{ borderBottomWidth: "0.2px" }} />
        <List
          sx={{
            backgroundColor: "#2f4050",
            color: "lightgrey",
            height: "100vh",
          }}
        >
          <TreeView open={open} />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

export default Sidebar;

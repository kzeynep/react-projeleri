import React  from "react";
import Dashboard from "../pages/Dashboard";
import Layout from "../pages/Layout";
import { useSelector } from "react-redux";
import menuService from "../services/MenuService";
import { useLocation } from "react-router-dom";


 const PrivateRoutes = ({children})=>{
  const { menuList } = useSelector((store) => store.menu);
  const location = useLocation();

  return menuService.isAccessMenu(menuList, location.pathname) ?  <Layout children={children} /> :  <Layout children={<Dashboard/>} />;

}


export default PrivateRoutes


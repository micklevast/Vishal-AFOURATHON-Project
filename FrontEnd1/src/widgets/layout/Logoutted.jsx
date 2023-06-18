import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Breadcrumbs,
    Input,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
  } from "@material-tailwind/react";
  import {
    UserCircleIcon,
    Cog6ToothIcon,
    BellIcon,
    ClockIcon,
    CreditCardIcon,
    Bars3Icon,
  } from "@heroicons/react/24/solid";
  import {
    useMaterialTailwindController,
    setOpenConfigurator,
    setOpenSidenav,
  } from "@/context";
import { useState } from "react";
// import { removeCookie,remove  } from "js-cookie";
import Cookies from 'js-cookie';
// import jwt from 'jwt-decode';

export default function Logoutted() {
    
const history = useNavigate();

useEffect(()=>{
  // document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  // document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// history('/auth/sign-in');

 },[])

function handleLogout() {
    // Remove the token from local storage
    // setisLogin(true);
    
    localStorage.removeItem('jwt');
    // remove("jwt", { path: "/" });
    Cookies.remove('jwt'); // removes the 'name' cookie
    Cookies.remove('name'); // removes the 'name' cookie
    
    // Remove the JWT from the cookie
    // document.cookie = "jwt=;";
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Get the `history` object from the `useHistory` hook
    
    
    // Redirect the user to the login page
    console.log("############## logout ############")
    history('/auth/sign-in');
    }


  return (
    <div>
            <Button
              variant="text"
              color="blue-gray"
              className="hidden items-center gap-1 px-4 xl:flex"
            >
              <UserCircleIcon className="h-5 w-5 text-blue-gray-500" />
              <button onClick={handleLogout}>-Logout-</button>
            </Button>      
    </div>
  )
}

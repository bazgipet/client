import React, {useEffect} from "react";

function LogOut () {
    useEffect(()=>{
        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString) : null;

        if (token) {
            localStorage.removeItem("token");
            console.log('Sucessfully token removed')
        } else {
            console.log('No token available to remove.')
        }
    },[])
}
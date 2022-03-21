import React, { Component, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import LeftSide from '../leftSide/LeftSide';
import RightSide from '../RightSide/RightSide';

function Home() {
      const location  = useNavigate()
    useEffect(() => {
        const loginStatus = sessionStorage.getItem('login')
        if(loginStatus == null){
            location('/login')
        }
    },[])
    return (
        <>
            <Header/>
            <div className="content">
                <LeftSide/>
                <RightSide/>
            </div>
        </>
    );
}

export default Home;
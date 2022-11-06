import React, { useState, useEffect } from 'react'
import logo from '../assets/Logo.svg';
import navbarBasketIcon from '../assets/navbarBasketIcon.svg'
import logoutIcon from '../assets/logout.svg'

import { useSelector } from "react-redux";
import { itemsSelector } from "../features/items";
import styled from 'styled-components';

import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function Navbar() {
    const { totalPrice } = useSelector(itemsSelector);

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setName(data.name);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);

    return (
        <NavbarWrapper>
            <Container>
                <LoginInfo>
                    <div>
                        Logged in as
                        <div>{name}</div>
                        <div>{user?.email}</div>
                    </div>
                    <button onClick={logout}>
                        <img src={logoutIcon} alt="logout" />
                        Logout
                    </button>
                </LoginInfo>
                <Logo>
                    <img src={logo} alt="logo" />
                </Logo>
                <Basket>
                    <img src={navbarBasketIcon} alt="basket" />
                    <p>₺{totalPrice.toFixed(2)}</p>
                </Basket>
            </Container>
        </NavbarWrapper>
    )
}

const NavbarWrapper = styled.nav`
    display: flex;
    top: 0;
    justify-content: center;
    background-color: #1EA4CE;
    width: 100%;
    height: 76px;
`
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1190px;
`

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 76px;
`

const Basket = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #147594;
    padding: 0 22px;
    color: #FFFFFF;
`

const LoginInfo = styled(Basket)`
    gap:10px;
    
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`


export default Navbar;
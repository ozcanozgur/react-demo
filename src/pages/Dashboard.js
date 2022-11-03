import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

import styled from "styled-components";

function Dashboard() {
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
        <Container>
            <DashboardContainer>
                Logged in as
                <Wrapper>{name}</Wrapper>
                <Wrapper>{user?.email}</Wrapper>
                <DashboardButton className="dashboard__btn" onClick={logout}>
                    Logout
                </DashboardButton>
            </DashboardContainer>
        </Container>
    );
}
export default Dashboard;

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #dcdcdc;
    padding: 30px;
`

const DashboardButton = styled.div`
    padding: 10px;
    font-size: 18px;
    margin-top: 10px;
    border: none;
    color: white;
    background-color: black;
`
const Wrapper = styled.div`
    margin-top: 7px;
`
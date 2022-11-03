import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase";
import styled from "styled-components";

function Reset() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <Container className="reset">
            <ResetContainer className="reset__container">
                <ResetTextBox
                    type="text"
                    className="reset__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <ResetButton
                    className="reset__btn"
                    onClick={() => sendPasswordReset(email)}
                >
                    Send password reset email
                </ResetButton>
                <Wrapper>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </Wrapper>
            </ResetContainer>
        </Container>
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ResetContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #dcdcdc;
    padding: 30px;
`;

const ResetTextBox = styled.input`
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
`;

const ResetButton = styled.button`
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
    border: none;
    color: white;
    background-color: black;
`;

const Wrapper = styled.div`
    margin-top: 7px;
`;

export default Reset;


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

import { useForm } from 'react-hook-form';

function Login() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) navigate("/dashboard");
    }, [user, loading]);

    return (
        <Container>
            <LoginForm onSubmit={handleSubmit((data) => logInWithEmailAndPassword(data.email, data.password))}>
                <LoginTextBox
                    type="text"
                    {...register("email", {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })}
                    placeholder="E-mail Address"
                />
                {errors.email?.message && <p>{errors.email?.message}</p>}
                <LoginTextBox
                    type="password"
                    autocomplete="on"
                    {...register('password', { required: true })}
                    placeholder="Password"
                />
                {errors.password && <p>Password is required.</p>}
                <LoginButton
                    type="submit"
                >
                    Login
                </LoginButton >
                <LoginGoogle className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </LoginGoogle>
                <Wrapper>
                    <Link to="/reset">Forgot Password</Link>
                </Wrapper>
                <Wrapper>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </Wrapper>
            </LoginForm>
        </Container>
    );
}

const Container = styled.div`
   
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #dcdcdc;
    padding: 30px;
`;

const LoginTextBox = styled.input`
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
`;

const LoginButton = styled.button`
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
    border: none;
    color: white;
    background-color: black;
`;

const LoginGoogle = styled.button`
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

export default Login;



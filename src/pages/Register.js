import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    registerWithEmailAndPassword,
    signInWithGoogle,
} from "../firebase";
import styled from "styled-components";

import { useForm } from 'react-hook-form';

function Register() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (loading) return;
        if (user) navigate("/dashboard");
    }, [user, loading]);
    return (
        <Container>
            <RegisterForm onSubmit={handleSubmit((data) => registerWithEmailAndPassword(data.name, data.email, data.password))}>
                <RegisterTextBox
                    type="text"
                    {...register('name', { required: true })}
                    placeholder="Full Name"
                />
                {errors.fullName && <p>Full Name is required.</p>}
                <RegisterTextBox
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
                <RegisterTextBox
                    type="password"
                    autocomplete="on"
                    {...register('password', { required: true })}
                    placeholder="Password"
                />
                {errors.password && <p>Password is required.</p>}
                <RegisterButton
                    type="submit"
                >
                    Register
                </RegisterButton >
                <RegisterButton
                    onClick={signInWithGoogle}
                >
                    Register with Google
                </RegisterButton>
                <Wrapper>
                    Already have an account? <Link to="/">Login</Link> now.
                </Wrapper>
            </RegisterForm>
        </Container >
    );
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const RegisterForm = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    background-color: #dcdcdc;
    padding: 30px;
`;

const RegisterTextBox = styled.input`
    padding: 10px;
    font-size: 18px;
    margin-bottom: 10px;
`;

const RegisterButton = styled.button`
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
export default Register;
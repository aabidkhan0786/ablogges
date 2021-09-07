import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import MailIcon from '@material-ui/icons/Mail';
// import {login} from "../images/login.png"
import Link from "next/link"
import { auth } from "../firebase"
import Router from 'next/router'


export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerts, setAlerts] = useState(false);
    const [msg, setMsg] = useState('')

    console.log(name, email, password);

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const result = await auth.createUserWithEmailAndPassword(email, password)
            await result.user.updateProfile({
                displayName: name
            })
            setMsg("Account Created !! Redirecting to aBlogges...")
            setAlerts(true)
            Router.push("/")
        } catch (error) {
            setMsg(error.message)
            setAlerts(true)
            console.log(error)
        }
    }

    return (
        <>
            <div className="row-fluid signup_blog">
                <div className="col-11 col-lg-8 mx-auto shadow-lg p-3 mb-5 bg-body rounded  ">
                    {alerts && <>
                        <div class="alert alert-dismissible alert-primary">
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            <strong> {msg}</strong>
                        </div>
                    </>}
                    <div className="form-group">
                        <h1 className="text-center"><u>SignUp With Us!</u></h1>
                        <label className="form-label mt-4">Welcome to aBlogges!</label>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control text-capitalize" id="floatingInput" onChange={e => setName(e.target.value)} placeholder="Aabid Khan" />
                            <label for="floatingInput">Full Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} id="floatingPassword" placeholder="Password" />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div className="d-grid gap-2 my-3">
                            <button className="btn btn-lg   btn-outline-info" onClick={handleForm} type="button">SIGNUP</button>
                        </div>
                        <h5>Already Registered ? <Link href="/login" color="primary"><a className="text-warning"> Log In!</a></Link></h5>
                    </div>
                </div>
            </div>

        </>
    );
}

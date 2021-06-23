import React, { useState } from 'react';
// import {login} from "../images/login.png"
import Link from "next/link"
import { auth } from "../firebase"
import Router from 'next/router'


export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alerts, setAlerts] = useState(false);
    const [msg, setMsg] = useState('')


    console.log(email, password);

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const result = await auth.signInWithEmailAndPassword(email, password)
            // alert("welcome")
            setMsg("Welcome to aBlogges!")
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
            <div className="row-fluid login_blog">
                <div className="col-12 col-lg-8 mx-auto shadow-lg p-3 mb-5 bg-body rounded  ">
                    {alerts && <>
                        <div class="alert alert-dismissible alert-primary">
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            <strong> {msg}</strong>
                        </div>
                    </>}
                            <div className="form-group">
                                <h1 className="text-center">LogIn With Us!</h1>
                                <label className="form-label mt-4">Welcome to aBlogges!</label>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
                                    <label for="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating">
                                    <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} id="floatingPassword" placeholder="Password" />
                                    <label for="floatingPassword">Password</label>
                                </div>
                                <div className="d-grid gap-2 my-3">
                                    <button className="btn btn-lg   btn-outline-info" onClick={handleForm} type="button">LOGIN</button>
                                </div>
                                <h5>Create account ? <Link href="/signup" color="primary"><a className="text-warning"> Sign Up!</a></Link></h5>
                            </div>
                        </div>
                    </div>

        </>
                );
}



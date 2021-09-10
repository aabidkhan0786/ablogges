import React, { useState } from 'react';
import { auth } from "../firebase";
import Link from 'next/link'
import router from 'next/router';


export default function NavBar({ user , alignType }) {
  console.log(alignType);
  const [active, setActive] =useState(false)

  const signOut = () => {
    auth.signOut();
    router.push("/login")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary  shadow " style={{ "height": "70px" }}>
        <div className="container-fluid">
          <Link className="navbar-brand mx-5" href="/" ><a class="btn btn-info ">aBlogges</a></Link><h4 className="text-capitalize pt-2 text-white">{user && `,${user.displayName}`}</h4>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav ms-auto bg-primary">
              {
                user ?
                  <>
                    <li className="nav-item mx-3 py-2">
                      <Link href="/createblog"><a class="btn btn-sm btn-outline-light">Create </a></Link>
                    </li>
                    <li className="nav-item mx-3 py-2">
                      <button type="button" onClick={() => signOut()} class="btn btn-sm  btn-danger">LogOut</button>
                    </li>
                    <div className="btn-group hide" role="group" aria-label="Basic example">
                <button type="button" className="btn  btn-info" onClick={()=>alignType(true)} ><i className="fas fa-list"></i> </button>
                <button type="button" className="btn  btn-info" onClick={()=>alignType(false)}><i className="fas fa-th-large"></i></button>
              </div>
                  </>
                  :
                  <li className="nav-item mx-3 py-2">
                    <Link href="/login"><a className="btn btn-sm  btn-outline-secondary" color="inherit">LogIn</a></Link>
                  </li>
              }

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

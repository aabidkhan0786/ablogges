import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { auth } from "../firebase";
import Link from 'next/link'
import router from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar({user}) {
  const classes = useStyles();
  console.log(user);

  const signOut=()=>{
    auth.signOut();
    router.push("/login")
  }

  return (
    <>
<nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" style={{"height":"80px"}}>
  <div className="container-fluid">
    <Link className="navbar-brand mx-5"  href="/" ><a class="btn btn-info btn-lg">aBlogges</a></Link><h3 className="text-capitalize pt-2 text-white">{user &&`,${user.displayName}`}</h3>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav ms-auto bg-primary">

        {
          user ?
          <>
        <li className="nav-item mx-3 py-2">
          <Link href="/createblog"><a  class="btn btn-outline-light">Create</a></Link>
        </li>
        <li className="nav-item mx-3 py-2">
          <button type="button" onClick={() =>signOut()} class="btn btn-danger">LogOut</button>
        </li>
        </>
        :
        <li className="nav-item mx-3 py-2">
          <Link href="/login"><a className="btn btn-outline-secondary" color="inherit">LogIn</a></Link>
        </li>
        }


      </ul>

    </div>
  </div>
</nav>

    </>
  );
}

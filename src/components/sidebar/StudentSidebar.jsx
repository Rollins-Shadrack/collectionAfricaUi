import React,{useContext, useEffect, useState} from 'react'
import './sidebar.scss'
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useLocation, useNavigate} from "react-router-dom";
import { DarkModeContext } from '../../context/darkModeContext';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import { useMediaQuery } from '@mui/material';
import { logout } from '../../state/authSlice'
import { useLogoutMutation } from '../../state/studentsSlice';
import {useDispatch} from 'react-redux'





const StudentSidebar = () => {
    const [showText, setShowText] = useState(true);
    const { dispatch } = useContext(DarkModeContext);
    const [showMenu, setShowMenu] = useState(false);

    const location = useLocation()


  const isMediumScreen = useMediaQuery('(min-width: 576px) and (max-width: 991.98px)');
  const isSmallScreen = useMediaQuery('(max-width: 575.98px)');

    const shouldHideDiv = isSmallScreen || isMediumScreen;

  const toggleText = () => {
    setShowText((prevShowText) => !prevShowText);
  };
  const ToggleMenu = () =>{
    setShowMenu(!showMenu)
  }

  
  useEffect(() => {
    if (isMediumScreen || isSmallScreen) {
      setShowText(false);
    } else {
      setShowText(true);
    }
  }, [isMediumScreen, isSmallScreen]);

  const LogOutdispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutApiCall] = useLogoutMutation()

  const logoutHandler = async() =>{
    try{
      await logoutApiCall().unwrap()
        LogOutdispatch(logout())
        navigate('/')


    }catch(error){
    console.log(error)
    }
  }

  return (
    <div className={`sidebar ${!showText ? 'small' : ''}`}>
        <div className="top">
            <MenuIcon style={{color:'#6439ff'}} onClick={toggleText} />
        </div>
        <hr />
        <div className="center">
            <ul>
                {location.pathname === '/student/profile' && <><li>
                    <Link to='/student/profile' style={{textDecoration:"none"}}>
                    <AccountCircleOutlinedIcon className="icon" />
                    
                    {showText && <span>Edit Profile</span>}
                    </Link>
                </li>
                <li>
                    <Link to='/student/courses/enrolled' style={{textDecoration:"none"}}>
                    <DashboardIcon className="icon" />
                    {showText && <span>Courses Enrolled</span>}
                    </Link>
                </li></>}
                <li>
                    <Link to='/student/courses/performance' style={{textDecoration:"none"}}>
                    <InfoIcon className="icon" />
                    {showText && <span>Quiz Performance</span>}
                    </Link>
                </li> 
                <p className="title">USER</p>
                <li onClick={logoutHandler}>
                    <ExitToAppIcon className="icon" />
                    {showText &&<span>LogOut</span>}
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOptions" onClick={()=> dispatch({type:'LIGHT'})}></div>
            <div className="colorOptions " onClick={()=> dispatch({type:'DARK'})}></div>
        </div>
    </div>
  )
}

export default StudentSidebar
import React,{useContext, useEffect, useState} from 'react'
import './sidebar.scss'
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate} from "react-router-dom";
import { DarkModeContext } from '../../context/darkModeContext';
import MenuIcon from '@mui/icons-material/Menu';
import SubtitlesRoundedIcon from '@mui/icons-material/SubtitlesRounded';
import InfoIcon from '@mui/icons-material/Info';
import { useMediaQuery } from '@mui/material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../../state/authSlice'
import { useLogoutMutation } from '../../state/adminSlice';




const Sidebar = () => {
    const [showText, setShowText] = useState(true);
    const { dispatch } = useContext(DarkModeContext);
    const [showMenu, setShowMenu] = useState(false);


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
        navigate('/admin/auth')


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
                <li>
                    <Link to='/admin' style={{textDecoration:"none"}}>
                    <DashboardIcon className="icon" />
                    {showText && <span>Home</span>}
                    </Link>
                </li>
                <li>
                    <Link to='/admin/courses' style={{textDecoration:"none"}}>
                    <SubtitlesRoundedIcon className="icon" />
                    {showText &&<span>Courses</span>}
                    </Link>
                </li>
                <li>
                    <Link to='/admin/courses/new' style={{textDecoration:"none"}}>
                    <FiberNewIcon className="icon" />
                    {showText &&<span>New Courses</span>}
                    </Link>
                </li>
                <li>
                    <Link to='/admin/users/admins' style={{textDecoration:"none"}}>
                    <AdminPanelSettingsIcon className="icon" />
                    {showText && <span>Admins</span>}
                    </Link>
                </li>
                <li>
                    <Link to='/admin/users/students' style={{textDecoration:"none"}}>
                    <PeopleAltIcon className="icon" />
                    {showText && <span>Students</span>}
                    </Link>
                </li>
                <p className="title">USEFULL</p>
                <li>
                    <SettingsSystemDaydreamOutlinedIcon className="icon" />
                    {showText &&<span>Stats</span>}
                </li>
                <p className="title">USER</p>
                <li>
                    <Link to='/admin/profile' style={{textDecoration:"none"}}>
                    <AccountCircleOutlinedIcon className="icon" />
                    {showText &&<span>Profile</span>}
                    </Link>
                </li>
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

export default Sidebar
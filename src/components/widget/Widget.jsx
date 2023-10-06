import {useEffect, useState} from 'react'
import './widget.scss'
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import { useGetAllUsersQuery } from '../../state/studentsSlice';
import { useGetCoursesQuery } from '../../state/adminSlice';
import Loader from '../Loader';
import { Link } from 'react-router-dom';

const Widget = ({type}) => {
  const {data:users, isLoading, refetch} = useGetAllUsersQuery()
  const {data:courses, isLoading:loadingCourses, refetch:fetchingCourses} = useGetCoursesQuery()

 

  useEffect(() => {
    refetch();
    fetchingCourses()
  }, [users,courses]);

  if (isLoading || !users || !courses || loadingCourses) {
    return <Loader/>;
  }

  //temporary
  const diff  = 20;
  let data;
  switch(type){
    case 'admin':
      data={
        title:"ADMIN",
        isMoney:false,
        amount : (users.filter(user => user.role === 'admin')).length,
        link:<Link to="/admin/users/admins" style={{textDecoration:'none', color:'black'}}>See all admins</Link>,
        icon:(
          <PersonOutlinedIcon className='icon'
          style={{
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "goldenrod",
          }} />
        )
      }
      break;
      case 'students':
      data={
        title:"STUDENTS",
        isMoney:false,
        amount : (users.filter(user => user.role === 'student')).length,
        link:<Link to="/admin/users/students" style={{textDecoration:'none', color:'black'}}>See all Students</Link>,
        icon:(
          <PersonOutlinedIcon className='icon'
          style={{
            backgroundColor: "rgba(218, 165, 32, 0.2)",
            color: "goldenrod",
          }} />
        )
      }
      break;
      case 'course':
      data={
        title:"COURSES",
        isMoney:false,
        link:<Link to="/admin/courses" style={{textDecoration:'none', color:'black'}}>View all Courses</Link>,
        amount : courses.length,
        icon:(
          <ShoppingCartOutlinedIcon className='icon' 
          style={{
            color: "crimson",
            backgroundColor: "rgba(255, 0, 0, 0.2)",
          }} />
        )
      }
      break;

      default:
        break;
  }
  return (
    <div  className='widget'>
        <div className="left">
          <div className="title">{data?.title}</div>
          <div className="counter">{data?.amount}</div>
          <div className="link">{data?.link}</div>
        </div>
        <div className="right">
          <div className="percentage positive"><KeyboardArrowUpIcon /> {diff}%</div>
          {data?.icon}
        </div>
    </div>
  )
}

export default Widget
import React,{useContext} from 'react'
import './navbar.scss'
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from '../../context/darkModeContext';
import { Button, Container, Form, Nav, Navbar} from 'react-bootstrap'
import { useSelector} from 'react-redux'
import { useGetSpecificStudentQuery } from '../../state/studentsSlice';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import logo from '../../static/cal_logo.png'


const Navigation = () => {
  const { dispatch, darkMode} = useContext(DarkModeContext);
  const {userInfo} = useSelector(state => state.auth);
  const {data, isLoading:loading, refetch} = useGetSpecificStudentQuery()

  return ( 
    <>
      <Navbar expand="lg" className={darkMode ? "navigation darkmode " : "navigation "} >
      <Container >
      <Navbar.Brand href="/"><img src={logo} style={{width:'170px', height:'70px'}} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" className='toggleButton' />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0 ">
            <Nav.Link className='item'>
              <DarkModeOutlinedIcon className="icon" onClick={()=> dispatch({type:'TOGGLE'})} />
            </Nav.Link>
            {!userInfo &&<><Nav.Link className='item' href='/sign_in'>
            Sign In
            </Nav.Link>
            <Nav.Link className='item' href='/sign_up'>
            Sign Up
            </Nav.Link></>}
            { userInfo && <>
            {userInfo.role === 'student' && <>
            <Nav.Link className='item' href="/student/dashboard">
            <MapsHomeWorkIcon className="icon" />
            Home
            </Nav.Link>
            <Nav.Link className='item' href="/student/courses/enrolled">
            <ListOutlinedIcon className="icon" />
            My Courses
            </Nav.Link>
            </>}

            <Nav.Link href={userInfo.role === 'student' ? "/student/profile" : '/admin/profile'}>
              <img
                src={data?.image ? `https://collectionafrica-elearning.onrender.com/${data?.image}` : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} 
                alt=""
                className="avatar"
              />
            </Nav.Link></>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Navigation



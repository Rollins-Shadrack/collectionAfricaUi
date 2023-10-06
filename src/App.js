import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { DarkModeContext } from "./context/darkModeContext";
import './style/dark.scss'
import Home from './Pages/home/Home'
import Disclaimer from './components/disclaimer/Disclaimer';
import Courses from './Pages/courses/Courses';
import PrivateRoute from './components/secure/PrivateRoute';
import Students from './Pages/register/Students';
import LoginStudents from './Pages/login/Students'
import StudentAccountVerification from './Pages/register/StudentAccountVerification';
import LoginAdmin from './Pages/login/Admin'
import RegisterAdmin from './Pages/register/Admin'
import AdminDashboard from './Pages/dashboard/AdminDashboard';
import NewCourses from './Pages/courses/NewCourses';
import { useSelector } from 'react-redux';
import StudentCourses from './Pages/courses/StudentCourses';
import StudentProfile from './Pages/profile/Students'
import SingleCourse from './Pages/courses/SingleCourse';
import Payment from './components/Courses/Payment';
import SingleEnrolledCourse from './Pages/courses/SingleEnrolledCourse';
import CourseStats from './Pages/stats/CourseStats';
import SingleCourseStats from './Pages/stats/SingleCourseStats';
import Users from './components/users/Users';
import CoursesEnrolled from './components/Courses/CoursesEnrolled';
import StudentQuizes from './components/Courses/StudentQuizes';
import StudentPerformance from './components/Courses/StudentPerformance';
import Loader from './components/Loader';

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const {userInfo} = useSelector(state =>state.auth)
  return (
    <div className={darkMode ? "app dark darkmode" : "app"}>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
        <Route path='/' >
        <Route index element={<Home/>} />
        <Route path='/disclaimer/:page' element={<Disclaimer/>} />
        <Route path='/courses' element={<StudentCourses/>} />
        <Route path='/sign_up' element={<Students/>} />
        <Route path='/sign_up/:verify' element={<Students/>} />
        <Route path='/verify/:id' element={<StudentAccountVerification/>} />
        <Route path='/sign_in' element={<LoginStudents/>} />
        <Route path='/admin/auth' element={<LoginAdmin/>} />
        <Route path='/admin/register' element={<RegisterAdmin/>} />
        <Route path ='loader' element={<Loader/>}/>

        {/* Private routes */}
        <Route path='' element={<PrivateRoute/>}>
          {userInfo?.role === 'admin' &&
           <Route path='admin'>
            <Route index element={<AdminDashboard/>}/>
            <Route path='courses'>
              <Route index element={<Courses/>}/>
              <Route path='new' element={<NewCourses/>}/>
              <Route path='new/:id' element={<NewCourses/>}/>
            </Route>
            <Route path='profile' element={<StudentProfile/>}/>
            <Route path='course'>
              <Route path='stats'>
                <Route index element={<CourseStats/>}/>
                <Route path=':courseId' element={<SingleCourseStats/>}/>
              </Route>
            </Route>
            <Route path='users'>
              <Route path='admins' element={<Users/>}/>
              <Route path='students' element={<Users/>}/>
            </Route>
          </Route>}

          {userInfo?.role === 'student' &&
           <Route path='student'>
            <Route path='dashboard' element={<StudentCourses/>}/>
            <Route path='profile' element={<StudentProfile/>}/>
            <Route path='courses/enrolled'>
              <Route index element={<CoursesEnrolled/>}/>
              <Route path='payment/:courseId' element={<Payment/>}/>
              <Route path='quizes/:courseId' element={<StudentQuizes/>}/>
              <Route path=':courseId' element={<SingleEnrolledCourse/>}/>
            </Route>
            <Route path='courses/performance' element={<StudentPerformance/>} />
            <Route path='courses/:id' element={<SingleCourse/>} />
          </Route>}
        </Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import {useEffect, useState} from 'react'
import StudentSidebar from '../sidebar/StudentSidebar'
import Navigation from '../navbar/Navigation'
import './styles.scss'
import { useGetCoursesQuery } from '../../state/adminSlice';
import { useGetSpecificStudentQuery } from '../../state/studentsSlice';
import Loader from '../Loader';
import { Button, Form } from 'react-bootstrap';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';

const CoursesEnrolled = () => {
    const { data, isLoading, refetch } = useGetCoursesQuery();
    const { data:student, isLoading:loadingStudent, refetch:refetchingStudent } = useGetSpecificStudentQuery();
    const [showCategory, setShowCategory] = useState(false);
    const [showAuthor, setShowAuthor] = useState(false);

    const coursesByCategory = {};
    const coursesByAuthor = {};
    
    useEffect(() =>{
        refetch()
        refetchingStudent()
    },[data, student])

    if(!data || !student || isLoading || loadingStudent){
        return <Loader/>
    }

    let enrolled = data.filter((courses) => student.enrolledCourses.map(courseEnrolled => courseEnrolled === courses._id) )

    const ToggleCategory = () => {
        setShowCategory(!showCategory);
      };
    
      const ToggleAuthor = () => {
        setShowAuthor(!showAuthor);
      };

      enrolled.forEach((course) => {
        if (course.category in coursesByCategory) {
          coursesByCategory[course.category].push(course);
        } else {
          coursesByCategory[course.category] = [course];
        }
    
        if (course.createdBy.name in coursesByAuthor) {
          coursesByAuthor[course.createdBy.name].push(course);
        } else {
          coursesByAuthor[course.createdBy.name] = [course];
        }
      });
  return (
    <div className='coursesEnrolled'>
        <StudentSidebar/>

        <div className="coursesEnrolledBody">
            <Navigation/>
            <div className="coursesNavbar container">
          <div className="categoryAuthor">
            <div className="category">
              <div onClick={ToggleCategory} style={{ cursor: 'pointer', position: 'relative' }}>
                <span>Category</span>
                {showCategory ? <ArrowDropDownRoundedIcon style={{ color: '#7451f8', fontSize: '35px' }} /> : <ArrowDropUpRoundedIcon style={{ color: '#7451f8', fontSize: '35px' }} />}
                {showCategory && (
                  <ul className="Dropdown">
                    {Object.keys(coursesByCategory).map((category) => (
                      <li key={category} style={{ listStyle: 'none' }}>
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="author">
              <div onClick={ToggleAuthor} style={{ cursor: 'pointer', position: 'relative' }}>
                <span>Author</span>
                {showAuthor ? <ArrowDropDownRoundedIcon style={{ color: '#7451f8', fontSize: '35px' }} /> : <ArrowDropUpRoundedIcon style={{ color: '#7451f8', fontSize: '35px' }} />}
                {showAuthor && (
                  <ul className="Dropdown">
                    {Object.keys(coursesByAuthor).map((authorName) => (
                      <li key={authorName} style={{ listStyle: 'none' }}>
                        {authorName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          <div className="search">
            <Form className="d-flex search">
              <Form.Control type="search" placeholder="Search course" className="me-2 input" aria-label="Search" />
              <Button variant="outline-success">
                <SearchOutlinedIcon />
              </Button>
            </Form>
          </div>
        </div>
        <div className="allcoursesBody container">
          <div className="row mt-5">
            {enrolled.length > 0 ?
              enrolled.map((course) => (
                <div className="col-lg-3 col-md-4 col-sm-6 my-2" key={course._id}>
                  <Link to={`/student/courses/${course._id}`} style={{ textDecoration: 'none' }} className="card">
                    <img className='courseImage' src={`https://collectionafrica-elearning.onrender.com/${course.addedSlides[0]}`} style={{}} alt="" />
                    <div className="cardBody">
                      <h4 className='text-center'>{course.title}</h4>
                      <p>
                        {course.description.split(' ').slice(0, 10).join(' ')}
                        {course.description.split(' ').length > 10 ? '...' : ''}
                      </p>
                      <div className="instructorPrice">
                        <div className="instructor">
                          <img src={course.createdBy ? `https://collectionafrica-elearning.onrender.com/${course.createdBy.image}`:'https://www.pngitem.com/pimgs/m/287-2876223_no-profile-picture-available-hd-png-download.png'} alt="" className="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                          <p style={{ fontSize: '13px' }}>{course?.createdBy?.name}</p>
                        </div>
                        <p className='coursePrice'>KES. {course.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              )) : <h3 className='text-center'>You are not enrolled in any Course</h3>}
          </div>
        </div>
        <Footer/>
        </div>
    </div>
  )
}

export default CoursesEnrolled
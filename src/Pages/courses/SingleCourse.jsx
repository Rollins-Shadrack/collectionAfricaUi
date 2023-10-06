import {useEffect} from 'react'
import StudentSidebar from '../../components/sidebar/StudentSidebar'
import Navigation from '../../components/navbar/Navigation'
import './courses.scss'
import { useParams, Link } from 'react-router-dom'
import { useGetCoursesQuery } from '../../state/adminSlice';
import { useGetSpecificStudentQuery } from '../../state/studentsSlice'
import Loader from '../../components/Loader';
import {Row, Col} from 'react-bootstrap'

const SingleCourse = () => {
    const {id} = useParams()
    const { data, isLoading, refetch } = useGetCoursesQuery();
    const { data:student, isLoading:loadingStudent, refetch:refetchingStudent } = useGetSpecificStudentQuery();

    useEffect(() => {
        refetch();
        refetchingStudent()
      }, [data, student]);
    
      if (isLoading || !data || !student || loadingStudent) {
        return <Loader />;
      }
      const selectedCourse = data.filter(course => course._id === id)

      let isEnrolled = student.enrolledCourses.includes(id)
      console.log(isEnrolled)
  return (
    <div className="singleCourse">
        <StudentSidebar/>

        <div className="singleCourseBody">
            <Navigation/>

            <div className="container">
                <h1 style={{fontSize:'22px', color:'#6439ff'}}>{selectedCourse[0].title}</h1>
                <h4 style={{fontSize:'18px', color:'#6439ff'}} className='my-3'>Preview what you'll learn in the course with this overview.</h4>
            <video controls width="100%" height="400">
                <source src={`https://collectionafrica-elearning.onrender.com/${selectedCourse[0].addedVideos[0]}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

                <Row className='my-4'>
                    <Col  md='8'>
                        <div className="my-3">
                            <h4 style={{fontSize:'18px', color:'#6439ff'}} >Course Description</h4>
                            <p>{selectedCourse[0].description}</p>
                        </div>
                        <div className="my-3">
                            <h4 style={{fontSize:'18px', color:'#6439ff'}} >Course Objectives</h4>
                            <p>{selectedCourse[0].objectives}</p>
                        </div>
                        <div className="my-3">
                            <h4 style={{fontSize:'18px', color:'#6439ff'}} >Course Prerequisites</h4>
                            <p>{selectedCourse[0].prerequisites}</p>
                        </div>
                    </Col>
                    <Col  md='4' className='my-3'>
                        <p style={{fontSize:'16px'}}> <span style={{color:'#6439ff'}}>Category:</span>  <b>{selectedCourse[0].category}</b></p>
                        <p style={{fontSize:'16px'}}> <span style={{color:'#6439ff'}}>Duration:</span> <b>{selectedCourse[0].duration}</b></p>
                        <p style={{fontSize:'16px'}}> <span style={{color:'#6439ff'}}>Level:</span> <b>{selectedCourse[0].level}</b></p>
                        <p style={{fontSize:'16px'}}> <span style={{color:'#6439ff'}}>Price:</span> <b>Ksh. {selectedCourse[0].price}</b></p>
                        {isEnrolled ? <Link to={`/student/courses/enrolled/${selectedCourse[0]._id}`} style={{float:'right'}} className="btn btn-primary">Continue Learning</Link> : <Link to={`/student/courses/enrolled/payment/${selectedCourse[0]._id}`} style={{float:'right'}} className="btn btn-warning">Enroll Now</Link>}
                    </Col>
                </Row>
            </div>
        </div>
    </div>
  )
}

export default SingleCourse
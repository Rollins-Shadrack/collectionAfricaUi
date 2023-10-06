import React, { useEffect, useState } from 'react';
import './home.scss';
import Navigation from '../../components/navbar/Navigation';
import {Link} from 'react-router-dom'
import dataAnalysis from '../../static/dataAnalysisCourse.jpg'
import powerPoint from '../../static/powerpointCourse.png'
import phonecall from '../../static/phonecallCourse.jpg'
import finance from '../../static/financial.png'
import Footer from '../../components/footer/Footer';
import {useGetCoursesQuery} from '../../state/adminSlice'
import Loader from '../../components/Loader'
import { useSelector } from 'react-redux';


const Home = () => {
  const {data, isLoading, refetch} = useGetCoursesQuery()
  const [currentSlide, setCurrentSlide] = useState(0);
  const {userInfo} = useSelector(state => state.auth)

  console.log(data)

  const slides = [
    <div className="slide1">
      <div className="row container">
        <div className="col-lg-6 col-12 d-flex flex-column justify-content-end container mb-5">
          <h3>Swift Insights</h3>
          <p>Enhance skills through unique debt collection training with global impact.</p>
          <Link to='/sign_up' className='btn btn-warning'>Enroll Now</Link>
        </div>
      </div>
    </div>,
    <div className="slide2">
      <div className="row container">
        <div className="col-lg-6 col-12 d-flex flex-column justify-content-end container mb-5">
          <h3>Market Mastery</h3>
          <p>Gain expertise for successful entry with our comprehensive training content</p>
          <Link to='/sign_up' className='btn btn-warning'>Enroll Now</Link>
        </div>
      </div>
    </div>,
    <div className="slide3">
      <div className="row container">
        <div className="col-lg-6 col-12 d-flex flex-column justify-content-end container mb-5">
          <h3>Mastery Unleashed</h3>
          <p>Unveil the realms of expertise with our comprehensive syllabus and insights.</p>
          <Link to='/sign_up' className='btn btn-warning'>Enroll Now</Link>
        </div>
      </div>
    </div>,
  ];

  useEffect(() => {
    refetch()
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 30000); // Adjust the delay to your preferred value

    return () => clearInterval(interval);
  }, [slides.length, data]);


  if(isLoading || !data){
    return <Loader/>
  }

  const firstFourCourses = data?.slice(0, 4);

  

  return (
      <div className="home">
        <Navigation />
        <div className="homeBody">
          <div className="slide">
            <div className="row">
              <div className="">
                {slides[currentSlide]}
              </div>
            </div>
          </div>
          <div className="coursesBody container">
<h3>Featured Courses</h3>

<div className="row">
          {firstFourCourses.length === 0  ? <h4 className='text-center'>No Courses to display</h4> : null}
          {firstFourCourses.map(course => (
            <div className="col-lg-3 col-md-4 col-sm-6 my-2" key={course._id}>
              <Link to={userInfo ? '/payment' : '/sign_in'} style={{ textDecoration: 'none' }} className="card">
                {/* Use appropriate image source */}
                <img className='courseImage' src={`https://collectionafrica-elearning.onrender.com/${course.addedSlides[0]}`} alt="" />
                <div className="cardBody">
                  <h4 className='text-center'>{course.title}</h4>
                  <p>
                        {course.description.split(' ').slice(0, 10).join(' ')}
                        {course.description.split(' ').length > 10 ? '...' : ''}
                    </p>
                  <div className="instructorPrice">
                    <div className="instructor">
                      <img src={course.createdBy.image ? `https://collectionafrica-elearning.onrender.com/${course.createdBy.image}` : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt="" className="avatar" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                      <p>{course?.createdBy?.name}</p>
                    </div>
                    <p className='coursePrice'>KES. {course.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
{firstFourCourses.length > 0  &&
<div className="text-center my-5">
<Link to='/courses' className='btn btn-warning'>View All Courses</Link>
</div>}
</div>
<Footer/>
        </div>
      </div>
  );
};

export default Home;
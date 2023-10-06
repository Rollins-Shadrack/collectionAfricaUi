import React, { useState, useEffect } from 'react';
import { useGetCoursesQuery } from '../../state/adminSlice';
import { Button, Form } from 'react-bootstrap';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import { Link } from 'react-router-dom';
import './courses.scss';
import Navigation from '../../components/navbar/Navigation';
import Sidebar from '../../components/sidebar/Sidebar';
import Footer from '../../components/footer/Footer';
import Loader from '../../components/Loader';

const Courses = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const { data, isLoading, refetch } = useGetCoursesQuery();

  const coursesByCategory = {};
  const coursesByAuthor = {};

  useEffect(() => {
    refetch();
  }, [data]);

  if (isLoading || !data) {
    return <Loader />;
  }
  console.log(data)

  const ToggleCategory = () => {
    setShowCategory(!showCategory);
  };

  const ToggleAuthor = () => {
    setShowAuthor(!showAuthor);
  };

  data.forEach((course) => {
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
    <div className="courses">
      <Sidebar />
      <div className="coursesBody">
        <Navigation />
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
            {data.length > 0 &&
              data.map((course) => (
                <div className="col-lg-3 col-md-4 col-sm-6 my-2" key={course._id}>
                  <Link to={`/admin/courses/new/${course._id}`} style={{ textDecoration: 'none' }} className="card">
                    <img className='courseImage' src={`https://collectionafrica-elearning.onrender.com/${course.addedSlides[0]}`} style={{}} alt="" />
                    <div className="cardBody">
                      <h4 className='text-center'>{course.title}</h4>
                      <p>
                        {course.description.split(' ').slice(0, 10).join(' ')}
                        {course.description.split(' ').length > 10 ? '...' : ''}
                      </p>
                      <div className="instructorPrice">
                        <div className="instructor">
                          <img src={course.createdBy ? `https://collectionafrica-elearning.onrender.com/${course.createdBy.image}`:'https://www.pngitem.com/pimgs/m/287-2876223_no-profile-picture-available-hd-png-download.png'} alt="" className="avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                          <p style={{ fontSize: '13px' }}>{course?.createdBy?.name}</p>
                        </div>
                        <p className='coursePrice'>KES. {course.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Courses;

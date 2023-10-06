import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StudentSidebar from '../../components/sidebar/StudentSidebar';
import Navigation from '../../components/navbar/Navigation';
import { useGetCoursesQuery, useUpdateCourseMutation } from '../../state/adminSlice';
import './courses.scss';
import Loader from '../../components/Loader';
import { Button, Modal, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import GalleryModal from '../../components/GalleryModal';
import { Link } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';

const SingleEnrolledCourse = () => {
  const { courseId } = useParams();
  const { data, isLoading, refetch } = useGetCoursesQuery();
  const [validated, setValidated] = useState(false);
  const [comment, setComment] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [updateCourse] = useUpdateCourseMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [reply, setReply] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () =>setShow(true);
  const [viewReplies, setViewReplies ] = useState(false)
  const [sendReply, setSendReply ] = useState(false)


  useEffect(() => {
    refetch();
  }, [data]);

  if (isLoading || !data) {
    return <Loader />;
  }

  const selectedCourse = data.filter((course) => course._id === courseId);
  console.log(selectedCourse)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      toast.error('Please Provide a Comment');
    } else {
      setValidated(true);
      updateCourse({ courseId, comment: [{ issuedBy: userInfo._id, message: comment }] })
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
        })
        .catch((err) => {
          toast.error(err?.message || err?.data?.message);
        });
    }
  };

  const openModal = (index, mediaa) => {
    setSelectedImageIndex(index);
    setShowModal(true);
    setMediaType(mediaa)
  };
  
  const closeModal = () => {
    setSelectedImageIndex(null);
    setShowModal(false);
  };

  const handleReply = (comment) =>{

  }

  return (
    <div className='SingleEnrolledCourse'>
      <StudentSidebar />

      <div className='SingleEnrolledCourseBody'>
        <Navigation />
        <div className='enrolledCourse'>
          <div className='displayEnrolledCourse container'>
            <h3>{selectedCourse[0].title}</h3>
            <p>
              <b className='titles'>Prerequisites:</b> {selectedCourse[0].prerequisites}
            </p>
            <p>
              <b className='titles'>Description:</b> {selectedCourse[0].description}
            </p>
            <p>
              <b className='titles'>Objectives:</b> {selectedCourse[0].objectives}
            </p>

            <video className='mt-5' controls width='100%' height='350'>
              <source
                src={`https://collectionafrica-elearning.onrender.com/${selectedCourse[0].addedVideos[0]}`}
                type='video/mp4'
              />
              Your browser does not support the video tag.
            </video>

            <div className='my-4 row'>
              <div className="col-sm-6">
              <h3>Additional Notes</h3>
              {selectedCourse[0].resources.map((file) => (
                <p key={file}>
                  <a style={{ textDecoration: 'none', color: 'black' }}href={`https://collectionafrica-elearning.onrender.com/${file.split('/').pop()}`}>
                  {file.split('/').pop()}
                </a>
                </p>
              ))}
              </div>
              <div className="col-sm-6 text-center ">
                <Link to={`/student/courses/enrolled/quizes/${courseId}`}><div className="btn btn-warning"><QuizIcon/> Quizes</div></Link>
                <div className="btn btn-info mx-5" onClick={handleShow}>Comments</div>
              </div>
            </div>

            <div className='my-4'>
              <h3>Comment Section</h3>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className='mt-3' controlId='validationCustom03'>
                  <Form.Label>Comment Section:</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Write a Comment'
                    as={'textarea'}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please provide a Comment.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant='primary' type='submit' className='m-3' style={{ float: 'right' }}>
                  Comment
                </Button>
              </Form>
            </div>
          </div>

          <div className='enrolledCourseSidebar'>
            <div className='courseVideos container'>
              <h3>Video Lessons</h3>
              {selectedCourse[0].addedVideos.length === 0 ? (
                <h3>No Video Lessons Available</h3>
              ) : (<>
                {selectedCourse[0].addedVideos.map((video, index) => (
                  <div key={index}>
                    <video className='mt-5' width='100%' height='100' onClick={() => openModal(index, 'Video')}>
                      <source
                        src={`https://collectionafrica-elearning.onrender.com/${video}`}type='video/mp4'/>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}</>
              )}
            </div>
            <GalleryModal show={showModal} onHide={closeModal} selectedIndex={selectedImageIndex} media={selectedCourse[0]} mediaType={mediaType}/>
            <div className='courseSlides'>
              <h3>Slide Lessons</h3>
              {selectedCourse[0].addedSlides.length === 0 ? (
                <h3>No Slide Lessons Available</h3>
              ) : (
                <div className='text-center'>
                  {selectedCourse[0].addedSlides.map((slide, index) => (
                    <img
                      key={index}
                      src={`https://collectionafrica-elearning.onrender.com/${slide}`}
                      style={{ width: '90%', height: '100px' }}
                      alt=''
                      onClick={() => openModal(index, 'Slides')}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
  <Modal.Title style={{fontSize:'16px'}}> Comments</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedCourse[0].comment.length === 0 ? <p className='text-center'>No Comment</p>:<>
    {selectedCourse[0].comment.map(comments =>(
      <div style={{maxHeight:'450px', overflowY:'scroll'}}>
      <div className="py-2 container" style={{display:'flex'}}>
      <div style={{flex:'3'}}>
      <img
        src={`https://collectionafrica-elearning.onrender.com/${comments.issuedBy.image}`}
        style={{ width: '50px', height: '50px', borderRadius: '50%',  }}
        alt=""
      />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', flex:'7' }}>
        <span style={{ fontSize: '14px' }}>{comments.message}</span>
        <span style={{ fontSize: '10px', float: 'left' }}>
          {new Date(comments.createdAt).toLocaleString()}
        </span>
        <div className="container my-3" style={{ display:'flex', justifyContent:'space-between',  fontSize: '12px', cursor:'pointer'}}>
          <span onClick={() => {viewReplies ? setViewReplies(false) : setViewReplies(true)}}>View Replies</span>
          <span onClick={() =>  {sendReply ? setSendReply(false) : setSendReply(true)}}>Reply</span>
        </div>
      </div>
    </div>
    {viewReplies ?<div className="container" style={{maxHeight:'300px', overflowY:'scroll'}}>
            {comments && comments.replies.length === 0 ? <p>There are no Replies</p>:<>
            {comments && comments.replies.map(reply =>(
                <div className="py-2 container" style={{display:'flex', width:'80%', border:'1px solid #9999', borderRadius:'10px', marginBottom:'10px'}}>
                <div style={{flex:'3'}}>
                <img
                  src={`https://collectionafrica-elearning.onrender.com/${reply.issuedBy.image}`}
                  style={{ width: '50px', height: '50px', borderRadius: '50%',  }}
                  alt=""
                />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', flex:'7' }}>
                  <span style={{ fontSize: '14px' }}>{reply.message}</span>
                  <span style={{ fontSize: '10px', float: 'left' }}>
                    {new Date(reply.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            )) }
            </>}
        </div> : null}
        {sendReply ? <div className="replySection">
        <input type="text" className="form-control my-3" placeholder='Reply...' value={reply} onChange={(e) => setReply(e.target.value)} />
        <Button variant="primary" onClick={() => handleReply(comment)}>
          Reply
        </Button>
        </div>: null}
    </div>
    ))}
    </>}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
};

export default SingleEnrolledCourse;

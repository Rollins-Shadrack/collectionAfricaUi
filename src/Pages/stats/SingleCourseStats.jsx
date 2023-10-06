import { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navigation from '../../components/navbar/Navigation'
import './stats.scss'
import { useParams } from 'react-router-dom'
import { useGetAllUsersQuery } from '../../state/studentsSlice'
import { useSetQuizMutation,useGetCoursesQuery, useReplyCommentMutation } from '../../state/adminSlice'
import Loader from '../../components/Loader'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {toast} from 'react-toastify' 
import { useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'

const SingleCourseStats = () => {
    const {courseId} = useParams()
    const {data, isLoading, refetch} = useGetAllUsersQuery()
    const {data:course, isLoading:loading, refetch:refetching} = useGetCoursesQuery()
    const [quizData, setQuizData] = useState([{ question: '', answers: ['', '', '', ''], correctAnswer: 0 }]);
    const [correctAnswers, setCorrectAnswers] = useState(quizData.map(() => 0)); 
    const [quizTitle, setQuizTitle] = useState('')
    const [setQuiz] = useSetQuizMutation()
    const {userInfo} = useSelector(state => state.auth)
    const [show, setShow] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);
    const [reply, setReply] = useState('')
    const [replyComment] = useReplyCommentMutation()
    const handleClose = () => setShow(false);

    const handleShow = (comment) => {
        setSelectedComment(comment);
        setShow(true);
      };


    useEffect(()=>{
        refetch()
        refetching()
    },[data, course])

    if(!data || isLoading || !course || loading){
        return <Loader/>
    }
     const studentsWithCourse = data.filter((student) =>
        student.enrolledCourses.includes(courseId)
        );


    const thisCourse = course.filter(thiscourse => thiscourse._id === courseId)


    const handleQuizInputChange = (questionIndex, event, answerIndex) => {
        if (event) {
            const { name, value } = event.target;
            const updatedQuizData = [...quizData];
    
            if (answerIndex !== null) {
            updatedQuizData[questionIndex].answers[answerIndex] = value;
            } else {
            updatedQuizData[questionIndex][name] = value;
            }
    
            setQuizData(updatedQuizData);
        }
        };

          const handleCorrectAnswerChange = (questionIndex, event) => {
    const updatedCorrectAnswers = [...correctAnswers];
    updatedCorrectAnswers[questionIndex] = parseInt(event.target.value, 10);
    setCorrectAnswers(updatedCorrectAnswers);
  };
          

    const addQuizQuestion = () => {
    setQuizData((prevData) => [
        ...prevData,
        {
        question: '',
        answers: ['', '', '', ''],
        correctAnswer: 0, 
        },
    ]);
    };

    const removeQuizQuestion = (questionIndex) => {
    setQuizData((prevData)=> {
        // Create a new array without the question to be removed
        const updatedData = prevData.filter((_, index) => index !== questionIndex);
        return updatedData;
    });
    };

    const saveQuiz = (e) =>{
        e.preventDefault()
        if(!quizTitle || !quizData){
            toast.error("Quiz title or data is missing!")
        }
        const completeQuizData = quizData.map((item, index) => {
            const correctAnswerIndex = correctAnswers[index]; 
            const correctAnswerValue = item.answers[correctAnswerIndex]; 
            return {
              question: item.question,
              answers: item.answers,
              correctAnswer: correctAnswerValue, 
            };
          });
        setQuiz({completeQuizData, courseId, quizTitle, createdBy:userInfo._id}).unwrap().then(res => {
            toast.success(res?.message)
        }).catch(err =>{
            toast.error(err?.message || err?.data?.message)
        })

    }

    const handleReply = async(e) =>{
        e.preventDefault()
        replyComment({courseId,commentId:selectedComment._id, message:reply, issuedBy:userInfo._id}).unwrap().then(res =>{
            toast.success(res?.message)
        }).catch(err =>{
            toast.error(err?.data?.message || err?.message)
        })
    }

    console.log(selectedComment)
    
  return (
    <>
    <div className='SingleCourseStats'>
        <Sidebar/>

        <div className="SingleCourseStatsBody">
            <Navigation/>

            <div className="stats">
            <div className='CourseQuiz container'>
                <h3 className='text-center'>Course Assessment Quiz</h3>
                <h3 className="my-3 container">Quiz Title</h3>
                <input type="text" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} className="form-control mb-3" placeholder='Quiz Title' />
                <h3 className="my-3 container">Quiz Questions</h3>
                {quizData.map((quizItem, questionIndex) => (
                <div key={questionIndex}className='container mb-4'style={{ display: 'flex', flexDirection: 'column' }}>
                    <input type='text' name='question' className='form-control'placeholder={`Question ${questionIndex + 1}`}value={quizItem.question}onChange={(e) => handleQuizInputChange(questionIndex, e, null)}/>
                    {quizItem.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className='d-flex mt-2'>
                        <div className='me-2'>
                        <span>{String.fromCharCode(65 + answerIndex)}</span>
                        </div>
                        <input type='text' name={`answer-${questionIndex}-${answerIndex}`}className='form-control' placeholder={`Answer ${answerIndex + 1}`}value={answer} onChange={(e) => handleQuizInputChange(questionIndex, e, answerIndex)}/>
                    </div>
                    ))}
                    <select className='form-select mt-2' value={correctAnswers[questionIndex]} onChange={(e) => handleCorrectAnswerChange(questionIndex, e)} >
                    {quizItem.answers.map((_, index) => (
                        <option key={index} value={index}>
                        Correct Answer: {String.fromCharCode(65 + index)}
                        </option>
                    ))}
                    </select>
                    <button style={{ float: 'left' }}className='btn btn-warning m-3 'onClick={() => removeQuizQuestion(questionIndex)}>Remove Question </button>
                </div>
                ))}
                <button style={{ float: 'right' }}className='btn btn-primary m-3 'onClick={addQuizQuestion}>Add Question </button>
                <button className='btn btn-success m-3 'onClick={saveQuiz}>Save Quiz</button>
      </div>

                <div className="studentsEnrolled">
                    <h3 className="text-center"> <p><ArrowForwardIosIcon/></p> Enrolled Students</h3>
                    {studentsWithCourse.length === 0 ? <h3 className='text-center'>No Student has Enrolled</h3>:<>
                    {studentsWithCourse.map(student =>(
                        <div key={student._id} className='container' style={{borderBottom:'1px solid #6439ff'}}>
                            <div className="py-2" style={{display:'flex', justifyContent:'space-between'}}>
                                <img src={`https://collectionafrica-elearning.onrender.com/${student.image}`} style={{width:'50px', height:'50px', borderRadius:'50%'}} alt="" />
                                <div className="" style={{display:'flex', flexDirection:'column', fontSize:'13px'}}>
                                    <span>{student.name}</span>
                                    <span style={{fontSize:'10px'}}>{student.email}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    </>}
                </div>
                <div className="comments">
                    <h3 className="text-center">Comments</h3>
                    {thisCourse[0].comment.length === 0 ? <h3 className='text-center'>No Student has Commented</h3>:<>
                    {thisCourse[0].comment.map(comment =>(
                        <div key={comment._id} className='container' style={{borderBottom:'1px solid #6439ff', cursor:'pointer'}} onClick={() => handleShow(comment)}>
                        <div className="py-2" style={{display:'flex', justifyContent:'space-between'}}>
                            <img src={`https://collectionafrica-elearning.onrender.com/${comment.issuedBy.image}`} style={{width:'50px', height:'50px', borderRadius:'50%'}} alt="" />
                            <div className="" style={{display:'flex', flexDirection:'column', fontSize:'13px'}}>
                                <span>{comment.issuedBy.name}</span>
                                <span style={{fontSize:'12px'}}>{comment.message}</span>
                                <span style={{fontSize:'10px', float:'left'}}>{new Date(comment.createdAt).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                        ))}
                    </>}
                </div>
            </div>
        </div>
        <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    {selectedComment && <Modal.Title style={{fontSize:'16px'}}>Comment From {selectedComment.issuedBy.name}</Modal.Title>}
  </Modal.Header>
  <Modal.Body>
    {selectedComment && (
      <>
        <div className="py-2 container" style={{display:'flex'}}>
          <div style={{flex:'3'}}>
          <img
            src={`https://collectionafrica-elearning.onrender.com/${selectedComment.issuedBy.image}`}
            style={{ width: '50px', height: '50px', borderRadius: '50%',  }}
            alt=""
          />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: '13px', flex:'7' }}>
            <span style={{ fontSize: '14px' }}>{selectedComment.message}</span>
            <span style={{ fontSize: '10px', float: 'left' }}>
              {new Date(selectedComment.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
        <div className="container " style={{maxHeight:'300px', overflowY:'scroll'}}>
            {selectedComment && selectedComment.replies.map(reply =>(
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
        </div>
        <input type="text" className="form-control" placeholder='Reply...' value={reply} onChange={(e) => setReply(e.target.value)} />
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
  <Button variant="primary" onClick={handleReply}>
      Reply
    </Button>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
    </div>
    

    </>
  )
}

export default SingleCourseStats
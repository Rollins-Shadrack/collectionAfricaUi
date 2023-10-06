import { useEffect, useState } from 'react';
import StudentSidebar from '../sidebar/StudentSidebar';
import Navigation from '../navbar/Navigation';
import './styles.scss';
import { useGetQuizesQuery } from '../../state/adminSlice';
import { useStudentPerformanceMutation } from '../../state/studentsSlice';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify'
import { useSelector } from 'react-redux';

const StudentQuizes = () => {
  const { data, isLoading, refetch } = useGetQuizesQuery();
  const { courseId } = useParams();
  const [index, setIndex] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [studentPerformance] = useStudentPerformanceMutation()
  const {userInfo} = useSelector(state => state.auth)

  useEffect(() => {
    refetch();
  }, [data]);

  let thisCourseQuizzes = data?.filter((quizes) => quizes.courseId === courseId);

  if (isLoading || !data) {
    return <Loader />;
  }

  

  const handleSubmit = () => {
  let score = 0;
  const quizData = thisCourseQuizzes[index].completeQuizData;

  for(let i = 0; i< quizData.length; i++){
    const correctAnswer = quizData[i].correctAnswer;
    const userAnswer = userAnswers[i]?.answer

    if(userAnswer === correctAnswer){
      score++
    }
  }

let percentagePerformance =  Math.round((score / quizData.length) * 100);

  studentPerformance({percentagePerformance, studentId:userInfo._id, score,totalQuestions:quizData.length, courseId:thisCourseQuizzes[index]._id}).unwrap().then(res => {
    toast.info(res.message)
  }).catch(err =>{
    toast.error(err?.message || err?.data?.message)
  })

  };

  return (
    <div className="studentQuizes">
      <StudentSidebar />

      <div className="studentQuizesBody">
        <Navigation />
        <div className="quizBody">
          <div className="quizes container">
            {thisCourseQuizzes.length === 0 ? (
              <p className="text-center">No Quizes are available</p>
            ) : (
              <>
                {thisCourseQuizzes.map((quiz, idx) => (
                  <p
                    key={idx}
                    onClick={() => setIndex(idx)}
                    style={{ cursor: 'pointer', color: '#6439ff' }}
                  >
                    {quiz.quizTitle}
                  </p>
                ))}
              </>
            )}
          </div>
          <div className="exactQuizBody container">
            <h3 className="text-center">Working space</h3>
            {thisCourseQuizzes.length === 0 ? (
              <p className="text-center">No Workspace available</p>
            ) : (
              <>
                {(index || index === 0) && (
                  <div>
                    <h3 className="text-center">
                      {thisCourseQuizzes[index].quizTitle}
                    </h3>
                    {thisCourseQuizzes[index].completeQuizData.map((question, questionIndex) => (
                      <div key={questionIndex}>
                        <h4><b style={{color:'#6439ff'}}>Question:</b> {question.question}</h4>
                        <form>
                          {question.answers.map((answer, answerIndex) => (
                            <div key={answerIndex}>
                              <label>
                                <input
                                  type="radio"
                                  name={`question-${questionIndex}`}
                                  value={answer}
                                  onChange={() => {
                                    const newAnswers = [...userAnswers];
                                    newAnswers[questionIndex] = {
                                      questionIdx: questionIndex,
                                      answer: answer,
                                    };
                                    setUserAnswers(newAnswers);
                                  }}
                                />
                                {answer}
                              </label>
                            </div>
                          ))}
                        </form>
                      </div>
                    ))}
                    <button className='btn btn-warning my-4' onClick={handleSubmit}>Submit Answers</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuizes;

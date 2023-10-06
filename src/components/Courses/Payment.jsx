import {useEffect, useState} from 'react'
import StudentSidebar from '../sidebar/StudentSidebar'
import Navigation from '../navbar/Navigation'
import './styles.scss'
import mpesa from '../../static/mpesa.png'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetCoursesQuery } from '../../state/adminSlice'
import { useGetSpecificStudentQuery, useHandlePaymentMutation } from '../../state/studentsSlice'
import Loader from '../Loader'
import { Button, Form } from 'react-bootstrap'
import {toast} from 'react-toastify'

const Payment = () => {
    const {courseId} = useParams()
    const { data, isLoading, refetch } = useGetCoursesQuery();
    const { data:student, isLoading:loadingStudent, refetch:refetchingStudent } = useGetSpecificStudentQuery();
    const [mobile, setMobile] = useState('')
    const [handlePayment] = useHandlePaymentMutation()
    const navigate = useNavigate()

    useEffect(() => {
        refetch();
        refetchingStudent()

        if(student){
            setMobile(student.mobile)
        }
      }, [data, student]);

      if (isLoading || !data || !student || loadingStudent) {
        return <Loader />;
      }
    
    const Course = data.filter(course => course._id === courseId)

    const handlePaymentFunction = async(e) =>{
      e.preventDefault()
      if(student.enrolledCourses.includes(courseId)){
        toast.error('You Already enrolled')
      }else{
        handlePayment({courseId, amount:Course[0].price, studentId:student._id, mobile}).unwrap().then(res => {
          toast.success(res?.message)
          setTimeout(() =>{
            navigate(`/student/courses/enrolled/${courseId}`)
          }, 3000)
        }).catch(err =>{
          console.log(err?.message || err?.data?.message)
          toast.error(err?.message || err?.data?.message)
        })
      }

    }
  return (
    <div className='payment'>
        <StudentSidebar/>

        <div className="paymentBody">
            <Navigation/>
            <div className="row my-5">
                <div className="col-md-8 m-auto card">
                    <div className="text-center">
                        <img src={mpesa} className='img-fluid' style={{width:'120px', height:'80px'}} alt="" />
                    </div>
                    <div className="">
                        <p><b><i>Payment For:</i></b> {Course[0].title}</p>
                        <p><b><i>Course Price:</i></b> KES.{Course[0].price}</p>
                        <div className="my-3 mx-5">
                        <Form onSubmit={handlePaymentFunction}>
                        <Form.Group className='mt-3' controlId="validationCustom03">
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control type="text" placeholder="Phone Number" value={mobile}
                        onChange={(e) => setMobile(e.target.value)} required />
                        <Form.Control.Feedback type="invalid">
                        Please provide Phone Number.
                        </Form.Control.Feedback>
                        </Form.Group>

                        {isLoading && 'loading...'}
                        {!isLoading && <Button variant='success' className='mt-3'  type="submit">Confirm</Button>}
                        </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment
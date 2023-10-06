import React, { useEffect } from 'react';
import { useVerifyAccountQuery } from '../../state/studentsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navigation from '../../components/navbar/Navigation'
import './register.scss'

const StudentAccountVerification = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {id} = params
  const { data, isLoading } = useVerifyAccountQuery(id);
  

  useEffect(() => {
    if(data){
        toast.success(data?.message)
        setTimeout(() =>{
            navigate('/sign_in')
        },4000)
    }

    
  }, []);

  if(isLoading){
    return 'Loading...'
  }

 

  return (
    <div className='students' style={{display:'flex', flexDirection:"column"}}>
        <Navigation/>
        <div className="studentsBody">
            <div className="studentsCard">
            <div className="top">
                <h1 className='text-center'> Account Verified</h1>
            </div>
            <div className="bottom">
            Thank you for verifying your account!
        </div>
            </div>
        </div>
    </div>
  );
};

export default StudentAccountVerification;

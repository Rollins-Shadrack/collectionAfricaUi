import React, { useEffect } from 'react'
import StudentSidebar from '../sidebar/StudentSidebar'
import Navigation from '../navbar/Navigation'
import './styles.scss'
import { useGetSpecificStudentQuery } from '../../state/studentsSlice'
import Loader from '../Loader'

const StudentPerformance = () => {
    const {data, isLoading, refetch} = useGetSpecificStudentQuery()

    useEffect(() => {
        refetch()
    },[data])

    if(isLoading || !data){
        return <Loader/>
    }

  return (
    <div className='studentPerformance'>
        <StudentSidebar/>

        <div className="studentPerformanceBody">
            <Navigation/>

            {data.performance.length === 0 ? <p className='text-center'>Please Do A Quiz!</p>:<>
            {data.performance.map((performances, idx) =>(
                <div key={idx} style={{display:'flex', justifyContent:'space-between', borderBottom:'1px solid gray'}} className='container'>
                    <div className="">
                        <p>Quiz Name: <br /><b>{performances.courseId.quizTitle}</b></p>
                    </div>
                    <div className="">
                        <p>Score  <br /> {performances.score}/{performances.totalQuestions}</p>
                    </div>
                    <div className="">
                        <p>Percentage Performance</p>
                        <p style={{width:`150px`, height:'10px', backgroundColor:'#9999',borderRadius:'5px'}} className='text-center'>
                            <p className='text-center' style={{width:`${performances.percentagePerformance}%`, backgroundColor:'greenyellow', height:'11px', fontSize:'10px', borderRadius:'5px'}}>{performances.percentagePerformance}%</p>
                        </p>
                    </div>
                </div>
            ))}
            </>}
        </div>
    </div>
  )
}

export default StudentPerformance
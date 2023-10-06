import './courses.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navigation from '../../components/navbar/Navigation'
import {Button, Form, Row, Col} from 'react-bootstrap';
import React, {useEffect, useState} from 'react'
import SlideUploader from '../../components/SlideUploader';
import VideoUploader from '../../components/VideoUploader';
import { useNewCourseMutation, useUploadSlideMutation, useGetSingleCourseQuery, useUpdateCourseMutation, useDeleteCourseMutation } from '../../state/adminSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {  useParams, Link, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import DeleteIcon from '@mui/icons-material/Delete';

const NewCourses = () => {
    const {userInfo} = useSelector(state => state.auth)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [duration, setDuration] = useState('')
    const [level, setLevel] = useState('')
    const [addedSlides, setAddedSlides] = useState([])
    const [addedVideos, setAddedVideos] = useState([])
    const [prerequisites, setPrerequisites] = useState('')
    const [objectives, setObjectives] = useState('')
    const [resources, setResources] = useState([])
    const [modules, setModules] = useState([{ moduleTitle: '', sessions: [] }]);
    const [price, setPrice] = useState('')
    const [newCourse, {isLoading:loadingnewCourse}] = useNewCourseMutation()
    const [uploadSlide, {isLoading:savingSlide}] = useUploadSlideMutation()
    const [updateCourse, {isLoading:updationgCourse}] = useUpdateCourseMutation()
    const [deleteCourse] = useDeleteCourseMutation()

    const {id} = useParams()
    const navigate = useNavigate()
    const {data, isLoading, refetch} = useGetSingleCourseQuery(id)
    const inputHeader = (text) =>{
        return(
            <h5 className="text-xl mt-2">{text}</h5>
        )
    }
    const inputDescription = (text) =>{
        return(
            <p className='text-secondary fs-10'>{text}</p>
        )
    }
    const preInput = (header, description2 ) =>{
        return(
            <>
                {inputHeader(header)}
                {inputDescription(description2)}
            </>
        )
    }
    useEffect(() =>{
        refetch()
        if(data){
            setTitle(data.title)
            setDescription(data.description)
            setCategory(data.category)
            setDuration(data.duration)
            setLevel(data.level)
            setAddedSlides(data.addedSlides)
            setAddedVideos(data.addedVideos)
            setObjectives(data.objectives)
            setPrerequisites(data.prerequisites)
            setResources(data.resources)
            setPrice(data.price)
            setModules(data.modules)
        }
    },[data])

    if(id){
        if(isLoading || !data){
            return <Loader/>
        }
    }
    const uploadDocumentFunction = async(event) =>{
        event.preventDefault()
        const files = event.target.files;
        const data = new FormData();
        for(let i = 0; i < files.length; i++){
            data.append('photos', files[i])
        }
        uploadSlide(data).unwrap().then(res =>{
            setResources(prev =>{
                return [...prev, ...res];
            })
        }).catch(err =>{
            toast.error(err?.data?.message || err?.message)
        })
    }
    const courseData = {createdBy:userInfo, title, description,category, duration, level, addedSlides,addedVideos, prerequisites,
        objectives,resources,price, modules}

    const updatedcourseData = {courseId:id, title, description,category, duration, level, addedSlides,addedVideos, prerequisites,
        objectives,resources,price, modules}


    const handleNewCourse = async(event) =>{
        event.preventDefault()
        if(id){
            updateCourse(updatedcourseData).unwrap().then(res =>{
                toast.success(res?.message)
            }).catch(err =>{
                console.log(err)
                toast.error(err?.message || err?.data?.message)
            })

        }else{
            newCourse(courseData).unwrap().then(res =>{
                toast.success(res?.message)
            }).catch(err =>{
                toast.error(err?.data.message || err?.message)
            })
        }
    }

    const handleDeleteCourse = async(event) => {
        event.preventDefault()
        deleteCourse({id}).unwrap().then(res => {
            toast.success(res?.message)

            setTimeout(() => {
                navigate('/admin/courses')
            },[3000])
        }).catch(err => {
            toast.error(err?.data?.message || err?.message)
        })
    }
  return (
    <div className='NewCourses'>
      <Sidebar/>

      <div className="NewCoursesBody">
        <Navigation/>
        {id && <div style={{float:'right'}} className='mx-3'>
            <Link to={`/admin/course/stats/${id}`} className='btn btn-primary mx-4'>Course Assessments</Link>
            <Button onClick={handleDeleteCourse} variant={'danger'}><DeleteIcon/></Button>
            </div>}
        <Form style={{margin:'20px 0'}} className="container" onSubmit={handleNewCourse}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
        {preInput('Course Title', 'The name of the course. Should be short and catchy as in advertisement')}
        <Form.Control value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="title, for example: Introduction to Data Analysis" name="title" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
        {preInput('Course Description', 'A brief overview of what the course covers')}
        <Form.Control  value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder="Course Description" name="address" />
        </Form.Group>

        <Row>
            <Form.Group as={Col} sm='4' className="mb-3" controlId="formBasicAddress">
            {preInput('Course Category ', 'The subject area or category the course falls under')}
            <Form.Control  value={category} onChange={e => setCategory(e.target.value)} type="text" placeholder="Course Category" name="address" />
            </Form.Group>

            <Form.Group as={Col} sm='4' className="mb-3" controlId="formBasicAddress">
            {preInput('Course Duration', 'The estimated time required to complete the course')}
            <Form.Control  value={duration} onChange={e => setDuration(e.target.value)} type="text" placeholder="Course Duration" name="address" />
            </Form.Group>

            <Form.Group as={Col} sm='4' className="mb-3" controlId="formBasicAddress">
            {preInput('Course Level', 'The intended level of the course (e.g., beginner)')}
            <Form.Control  value={level} onChange={e => setLevel(e.target.value)} type="text" placeholder="Course Level" name="address" />
            </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formBasicAddress">
        {preInput('Prerequisites', 'Any knowledge or skills required before taking the course')}
        <Form.Control  value={prerequisites} onChange={e => setPrerequisites(e.target.value)} type="text" placeholder="Prerequisites" name="address" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAddress">
        {preInput('Learning Objectives', 'Clear goals that students will achieve by completing the course')}
        <Form.Control as={'textarea'}  value={objectives} onChange={e => setObjectives(e.target.value)} type="text" placeholder="Learning Objectives" name="address" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
        {preInput('Image Slides', 'more = better')}
        <SlideUploader addedPhotos={addedSlides} onChange={setAddedSlides}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPhoto">
        {preInput('Video Lessons', 'Videos will follow course modules, starting with course overview.')}
        <VideoUploader addedVideos={addedVideos} onChange={setAddedVideos}/>
        </Form.Group>

        <Row>
            <Form.Group as={Col} sm='6' className="mb-3" controlId="formBasicAddress">
            {preInput('Resources', 'Supplementary materials like downloadable documents, links, or references')}
            <label style={{cursor:"pointer", border:'1px solid #f2ac20', background:'transparent', borderRadius:'15px', color:'#293855'}} className='py-2 px-3 text-center'>
                <input
                    type="file"
                    accept=".doc, .docx, .pdf, .ppt, .pptx" 
                    style={{display:"none"}}
                    name=""
                    id=""
                    onChange={uploadDocumentFunction} 
                />
                <i className="fa fa-upload"></i> Upload Document
            </label>
            {resources.map(resource => (
                <p>{resource.split('/').pop()}</p>
            ))}
            </Form.Group>

            <Form.Group as={Col} sm='6' className="mb-3" controlId="formBasicAddress">
            {preInput('Price', 'The cost of the course (if not free)')}
            <Form.Control   value={price} onChange={e => setPrice(e.target.value)} type="text" placeholder="Price" name="address" />
            </Form.Group>
        </Row>

        <Button style={{background:"#293855", color:"#c2e7c9"}} type="submit" className='mb-5' >
        Save
        </Button>
        </Form>
      </div>
    </div>
  )
}

export default NewCourses
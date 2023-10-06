import {useEffect, useState} from 'react'
import './profile.scss'
import StudentSidebar from '../../components/sidebar/StudentSidebar'
import Navigation from '../../components/navbar/Navigation'
import {Button,Col, Form, InputGroup, Row,} from 'react-bootstrap'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {useSelector} from 'react-redux'
import { useAddImageMutation, useUpdateUserMutation, useGetSpecificStudentQuery} from '../../state/studentsSlice'
import Loader from '../../components/Loader'
import {toast} from 'react-toastify'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'

const Students = () => {
  const [validated, setValidated] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [location, setLocation] = useState('')
  const [password, setPassword] = useState('')
  const [image, setImage] = useState('')
  const [addImage] =useAddImageMutation();
  const [updateUser, {isLoading}] = useUpdateUserMutation()
  const [imageUploaded, setImageUploaded] = useState(false);
  const {data, isLoading:loading, refetch} = useGetSpecificStudentQuery()
  const locationApi = useLocation()


  const handleFile = (e) =>{
    e.preventDefault();
    const file = e.target.files[0]
    setImagePreview(URL.createObjectURL(file));
    const data = new FormData();
    data.append('photo', file);

    addImage(data).unwrap().then((res) =>{
      setImage(res)
      setImageUploaded(true)
  }).catch(err =>{
      toast.error(err?.data?.message || err?.message);
  })
}

const handleSubmit = (event) => {
  event.preventDefault();
  const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);
        //check if image is uploaded before saving everything
        const userData = {name, location, email, mobile, image, password}
        updateUser(userData).unwrap().then(res =>{
            toast.success(res?.message)
        }).catch(err =>{
            toast.error(err?.data?.message || err?.message);
        })
}

useEffect(() =>{
  refetch()
  if(data){
    setName(data.name)
    setLocation(data.location)
    setEmail(data.email)
    setMobile(data.mobile)
    setImage(data.image)
  }

},[data])

if(loading || !data){
  return <Loader/>
}



  return (
    <div className="studentsProfile">
      {locationApi.pathname === '/admin/profile' ? <Sidebar/> :<StudentSidebar/>}

      <div className="studentsProfileBody">
        <Navigation/>

        <Form noValidate validated={validated} onSubmit={handleSubmit} className='form'>
        <div style={{width:'150px', height:'150px', margin:'0 auto', position:'relative'}} className="signup-profile-pic__container">
            <img style={{width:'150px', height:'150px', borderRadius:"50%", border:'2px solid gray', objectFit:'cover'}} src={image ? `https://collectionafrica-elearning.onrender.com/${image}` : imagePreview || 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}  />
            <label htmlFor="file" className="image-upload-label">
                <AddPhotoAlternateIcon style={{position:'absolute', bottom:'15px',right:'10px', color:'black', background:'white', cursor:'pointer', zIndex:'99'}}/>
            </label>
            <input type="file" name='file' id='file' accept="image/*" hidden onChange={handleFile}  />
            </div>
            <Row className='m-3'>
            <Form.Group as={Col} sm='6' controlId='validationCustom01'>
                  <Form.Label>Full Name:</Form.Label>
                  <Form.Control value={name} onChange={e => setName(e.target.value)} required type='text' placeholder='Full Name'/>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm='6' controlId='validationCustom01'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control value={email} onChange={e => setEmail(e.target.value)} required type='email' placeholder='Email address'/>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className='m-3'>
            <Form.Group as={Col} sm='6' controlId='validationCustom01'>
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control value={mobile} onChange={e => setMobile(e.target.value)} required type='text' placeholder='Phone Number'/>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} sm='6' controlId='validationCustom01'>
                  <Form.Label>Location:</Form.Label>
                  <Form.Control value={location} onChange={e => setLocation(e.target.value)} required type='text' placeholder='Location... e.g Kisumu'/>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <h4 style={{fontSize:'18px', color:'#6439ff'}} className='m-3'>Change Password <small>(Optional)</small></h4>
            <Form.Group className='m-3' as={Col} sm='6' controlId='validationCustom01'>
                  <Form.Label>New Password:</Form.Label>
                  <Form.Control value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Password'/>
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            <Button variant='info' className='mx-4'  type="submit">Edit Profile</Button>
        </Form>
      </div>
    </div>
  )
}

export default Students
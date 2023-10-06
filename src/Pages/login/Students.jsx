import Navigation from '../../components/navbar/Navigation'
import './login.scss'
import {Button, Form} from 'react-bootstrap'
import {useState, useEffect} from 'react' 
import {useLoginMutation} from '../../state/studentsSlice' 
import { Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import {setCredentials} from '../../state/authSlice'

const Students = () => {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [department, setDepartment] = useState('')
    const [login, {isLoading}] = useLoginMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {userInfo} = useSelector(state => state.auth);



    const handleSubmit = async(event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            setValidated(true);
            login({email, password, isAdmin:false}).unwrap().then(res =>{
                dispatch(setCredentials({...res}))
                navigate('/student/dashboard')
            }).catch(err =>{
                toast.error(err?.message || err?.data?.message)
            })

        }
    }
  return (
    <div className='studentsLogin'>
        <Navigation/>
        <div className="studentsLoginBody">
            <div className="studentsCard">
            <div className="top">
                <h1 className='text-center'>Sign In</h1>
            </div>
            <div className="bottom">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className='mt-3' controlId="validationCustom03">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control type="email" placeholder="Email Address" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
            Please provide an Email Address.
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className='mt-3'  controlId="validationCustom06">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <Form.Control.Feedback >
            Looks Good!
            </Form.Control.Feedback>
            </Form.Group>

            {isLoading && 'loading...'}
            <Button variant='warning' className='mt-3'  type="submit">Sign In</Button>
            <p className='mt-3'  style={{float:'right'}}>Need an account? <Link to='/sign_up'>Sign Up</Link></p>
            </Form>
        </div>
            </div>
        </div>
    </div>
  )
}

export default Students
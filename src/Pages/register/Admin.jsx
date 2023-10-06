import Navigation from '../../components/navbar/Navigation'
import './register.scss'
import {Button,Col, Form, InputGroup, Row} from 'react-bootstrap'
import {useState} from 'react' 
import {useRegisterMutation} from '../../state/adminSlice' 
import { Link, useNavigate, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'


const Admin = () => {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [register, {isLoading}] = useRegisterMutation()
    const params = useParams()

    const navigate = useNavigate()


    const handleSubmit = async(event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            setValidated(true);
            if(password !== cpassword){
                toast.error("Passwords don't match")
            }else if(name.trim().split(' ').length === 1){
                toast.error("Please Provide Full Names")
            }else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/.test(password)){
                toast.error("Password: 8+ chars, letter, number, @#")
            }else{
                register({role:'admin', name, password,email}).unwrap().then(res =>{
                    toast.success(res?.message)
                }).catch(err =>{
                    toast.error(err?.message || err?.data?.message)
                })
            }
        }
    }
  return (
    <div className='studentsregister'>
        <Navigation/>
        <div className="studentsregisterBody">
            <div className="studentsCard">
            <div className="top">
                <h1 className='text-center'> {params.verify === 'verify' ? 'Account Verification' : 'Sign Up'}</h1>
            </div>
            <div className="bottom">
            {params.verify === 'verify' ? <>
            <p className="text-center">Check your email for a verification link to complete your account setup. We've sent it to your inbox</p>
            </> 
            :<Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group  className='mt-3'  controlId="validationCustomUsername">
            <Form.Label>Full Name</Form.Label>
            <InputGroup hasValidation>
            <Form.Control type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} aria-describedby="inputGroupPrepend" required/>
            <Form.Control.Feedback type="invalid">
            Please provide Student's Full Name.
            </Form.Control.Feedback>
            </InputGroup>
            </Form.Group>

            <Form.Group className='mt-3' controlId="validationCustom03">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control type="email" placeholder="Email Address" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
            Please provide an Email Address.
            </Form.Control.Feedback>

            </Form.Group>
            <Row className="my-3">
            <Form.Group as={Col} sm="6" controlId="validationCustom06">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <Form.Control.Feedback >
            Looks Good!
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} sm="6" controlId="validationCustom06">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
            Please Confirm the Password.
            </Form.Control.Feedback>
            </Form.Group>
            </Row>
            <p className="mt-3" style={{fontWeight:'700'}}>
            By signing up, I embrace Collection Africa's Online Training Academy's <Link to='/disclaimer/terms'>Terms of Use</Link> &  <Link to='/disclaimer/privacy'>Privacy Policy</Link>, unlocking a world of knowledge and growth
            </p>
            <Button variant='warning' className='mt-3'  type="submit">{isLoading ? 'Loading ...' : 'Sign Up'}</Button>
            <p className='mt-3'  style={{float:'right'}}>Already have an account? <Link to='/sign_in'>Log in</Link></p>
            </Form>}
        </div>
            </div>
        </div>
    </div>
  )
}

export default Admin
import React from 'react'
import {Link} from 'react-router-dom'
import './footer.scss'

const Footer = () => {
  return (
    <footer className="">
  <div className="footer container">
  <h1>&copy; Collection Africa Online Training Academy 2023</h1>
  <div className="text-center links">
    <Link to='/disclaimer/terms' className='link'>Terms of Use</Link>
    <Link to='/disclaimer/privacy' className='link'>Privacy Policy</Link>
  </div>
  </div>
</footer>
  )
}

export default Footer
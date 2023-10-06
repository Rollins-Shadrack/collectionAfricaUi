import { useParams } from "react-router-dom"
import Navigation from "../navbar/Navigation"
import Footer from "../footer/Footer"

const Disclaimer = () => {
    const params = useParams()
    console.log(params)
  return (
    <div className='disclaimer'>
        <Navigation/>
    <div className='disclaimerBody'>
        {params.page === 'terms' ? (
        <div className='container'>
        <h4 style={{color:'#6439ff', fontWeight:'600', fontSize:'22px'}}>Terms of Use</h4>
        <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Terms</h4>
        <p>By accessing this School, you are agreeing to be bound by these Terms of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, 
            you are prohibited from using or accessing this site. The materials contained in this School are protected by applicable copyright and trademark law.</p>

            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Use License</h4>
            <ul>
                <li>Permission is granted to temporarily download one copy of any downloadable materials on the School’s website for personal, non-commercial transitory viewing only.
                     This is the grant of a license, not a transfer of title, and under this license you may not:
                     <ul>
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                        <li>attempt to decompile or reverse engineer any software contained on the School’s web site;</li>
                        <li>remove any copyright or other proprietary notations from the materials</li>
                        <li>transfer the materials to another person or 'mirror' the materials on any other server.</li>
                     </ul>
                     </li>
                     <li>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Company at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.</li>
            </ul>

            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Disclaimer</h4>
            <p>The materials on the School’s website are provided 'as is'. The School makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, 
                including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, the School does not warrant or make any representations concerning the accuracy, likely results,
                 or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.</p>

            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Limitations</h4>
            <p>In no event shall the School be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the School’s website, even if the School or an authorized of the School has been notified orally or in writing of the possibility of such damage.
                 Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>

                 <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Revisions </h4>
                 <p>The materials appearing on the School’s website may include technical, typographical, or photographic errors. The School does not warrant that any of the materials on its web site are accurate, complete, or current. The School may make changes to the materials contained on its web site at any time without notice.
                     The School does not, however, make any commitment to update the materials.</p>

            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Links</h4>
            <p>The School has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by the School of the site. 
                Use of any such linked website is at the user's own risk.</p>
            
            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Site Terms of Use Modifications</h4>
            <p>The School may revise these Terms of Use for its website at any time without notice. 
                By using this website you are agreeing to be bound by the then current version of these Terms of Use.</p>

            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}> Governing Law</h4>
            <p>Any claim relating to the School’s website shall be governed by the laws of the School Owner’s home jurisdiction without regard to its conflict of law provisions.</p>
        </div>
    ) : null}
    {params.page === 'privacy' ? (
        <div className="container">
            <h4 style={{color:'#6439ff', fontWeight:'600', fontSize:'22px'}}>Privacy Policy</h4>
            <p>This Privacy Policy governs the manner in which the School collects, uses, maintains and discloses information collected from users (each, a “Student”) of the School. 
                This Privacy Policy applies to the School and all Courses offered by the School.</p>

            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Personal identification information</h4>
            <p>We may collect personal identification information from Students in a variety of ways, including, but not limited to, when Students enroll in the School or a Course within the School, subscribe to a newsletter, and in connection with other activities, services, features, or resources we make available in our School. 
                Students may visit the School anonymously. We will collect personal identification information from Students only if they voluntarily submit such information to us.
                 Students can refuse to supply personal identification information but doing so may prevent them from engaging in certain School related activities.</p>

            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>How we use collected information</h4>
            <p>The School may collect and use Students’ personal identification information for the following purposes:</p>
            <ul>
                <li><b><i>To improve customer service</i></b> <br />Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
                <li><b><i>To personalize user experience</i></b> <br />We may use information in the aggregate to understand how our Students as a group use the services and resources provided in our School.</li>
                <li><b><i>To send periodic emails</i></b> <br />We may use Student email addresses to send Students information and updates pertaining to their order. Student email addresses may also be used to respond to Student inquiries, questions, or other requests..</li>
            </ul>

            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Sharing your personal information</h4>
            <p>We do not sell, trade, or rent Student personal identification information to others.</p>

            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Changes to this Privacy Policy</h4>
            <p>The School has the discretion to update this Privacy Policy at any time. We encourage Students to frequently check this page for any changes. 
                You acknowledge and agree that it is your responsibility to review this Privacy Policy periodically and become aware of modifications.</p>

            <h4 style={{color:'#6439ff', fontWeight:'400', fontSize:'20px', marginTop:'20px'}}>Your acceptance of these terms</h4>
            <p>By enrolling in the School, you signify your acceptance of this Privacy Policy. If you do not agree to this Privacy Policy, please do not enroll in the School. Your continued enrollment in the School following the posting of changes to this Privacy Policy will be deemed your acceptance of those changes.</p>
        </div>
    ) : null}</div>
    <Footer/>
    </div>
  )
}

export default Disclaimer
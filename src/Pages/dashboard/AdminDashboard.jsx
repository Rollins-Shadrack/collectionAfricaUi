import './styles.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navigation from '../../components/navbar/Navigation'
import Widget from '../../components/widget/Widget'

const AdminDashboard = () => {
  return (
    <div className='adminDashboard'>
      <Sidebar/>

      <div className="adminDashboardBody">
        <Navigation/>

        <div className="widgets ">
          <Widget type='admin' />
          <Widget type='students' />
          <Widget type='course' />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
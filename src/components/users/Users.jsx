import { useLocation } from "react-router-dom"
import { useGetAllUsersQuery, useDeleteUserMutation } from "../../state/studentsSlice"
import { useEffect } from "react"
import Loader from "../Loader"
import Sidebar from "../sidebar/Sidebar"
import Navigation from "../navbar/Navigation"
import './users.scss'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';
import {toast} from 'react-toastify'

const Users = () => {
    const {pathname} = useLocation()
    const {data, isLoading,refetch} = useGetAllUsersQuery()
    const {userInfo} = useSelector(state => state.auth)
    const [deleteUser] = useDeleteUserMutation()

    useEffect(() =>{
        refetch()
    },[data])

    if(isLoading || !data){
        return <Loader/>
    }

    const admins = data.filter(users => users.role === 'admin')
    const students = data.filter(users => users.role === 'student')

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        {field: 'image',headerName: 'Image',width: 150,
            renderCell: (params) => {
              return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={params.value ? `https://collectionafrica-elearning.onrender.com/${params.value}` : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'}  style={{ width: '40px', height: '40px', borderRadius:'50%' }} />
                </div>
              );
            },
          },
        {field: "name",headerName: "Company Name",width: 150,},
        {field: "email",headerName: "Contact Person",width: 200,},
        {field: "mobile",headerName: "Mobile Number",width: 150,},
        {field: "location",headerName: "Location",width: 150,},
        { field: "actions", headerName: "Actions", width: 130,
          renderCell: (params) => {
            const isCurrentUser = params.row.id === userInfo._id;
            const isAdmin = userInfo.role === 'admin'
            
            if (isCurrentUser) {
              return null; 
            }
            if(isAdmin){
              return (
                <button
                  onClick={() => handleDelete(params.row.id)} 
                  className="btn btn-danger btn-sm"
                >
                  <DeleteIcon/>
                </button>
              );
            }
          },
},
      ];

      const rowData = pathname === '/admin/users/admins' ? admins : students
      const rows = rowData.map((item) =>({
        id: item._id,
        image:item.image,
        name:item.name,
        email:item.email,
        mobile:item.mobile,
        location:item.location
      }))

  const handleDelete = async(id) => {
    deleteUser({id}).unwrap().then(res =>{
      toast.success(res?.message)
    }).catch(err =>{
      toast.error(err?.data?.message || err?.message)
    })
    };
    
  return (
    <div className="users">
        <Sidebar/>

        <div className="usersBody">
            <Navigation/>
            <DataGrid rows={rows} columns={columns} pageSize={20} />
        </div>
    </div>
  )
}

export default Users
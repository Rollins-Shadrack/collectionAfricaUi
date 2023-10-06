import {toast} from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {useState} from 'react'
import { useUploadVideoMutation } from '../state/adminSlice';


const VideoUploader = ({addedVideos, onChange}) => {
    const [uploadVideo] = useUploadVideoMutation()

    const removeVideo = async(e, link) =>{
        e.preventDefault()
        onChange([...addedVideos.filter(video => video !== link)])
    }

    const uploadVideoFunction = async(event) =>{
        event.preventDefault()
        const files = event.target.files;
        const data = new FormData();
        for(let i = 0; i < files.length; i++){
            data.append('videos', files[i])
        }
        uploadVideo(data).unwrap().then(res =>{
            onChange(prev =>{
                return [...prev, ...res];
            })
        }).catch(err => toast.error(err?.data?.message || err?.message))
        
    }
    const selectAsMainVideo = async(e, link) =>{
        e.preventDefault()
        const addedVideoWithoutSelected = [...addedVideos.filter(video => video !== link)]
        const newAddedVideo = [link,...addedVideoWithoutSelected]
        onChange(newAddedVideo)
    }
  return (
    <div>
        <div className="mt-2 g-2 row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 row-cols-xxl-8">
        {addedVideos.length > 0 && addedVideos.map(link => (
            <div className="position-relative" key={link}>
                <video controls style={{ width: "100%", minWidth: "185px", height: "100%", maxHeight: "150px", borderRadius: "10px" }}>
                <source src={`https://collectionafrica-elearning.onrender.com/${link}`} type="video/mp4" />
                Your browser does not support the video tag.
                </video>
                <div onClick={(e) => removeVideo(e, link)} style={{ cursor: "pointer", width: '50px', color: '#c2e7c9', textDecoration: 'none' }} className="text-center pt-1 position-absolute bottom-0 end-0">
                <DeleteIcon />
                </div>
                <div onClick={(e) => selectAsMainVideo(e, link)} style={{ cursor: "pointer", width: '50px', color: '#c2e7c9', textDecoration: 'none' }} className="text-center pt-1 position-absolute bottom-0 start-0">
                {link === addedVideos[0] && (
                    <StarBorderIcon style={{ color: "#f2ac20" }} />
                )}
                {link !== addedVideos[0] && (
                    <StarBorderIcon />
                )}
                </div>
            </div>
            ))}
            <label style={{ cursor: "pointer", border: '1px solid #f2ac20', background: 'transparent', borderRadius: '15px', color: '#293855' }} className='py-2 px-3 text-center'>
            <input
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                name=""
                id=""
                onChange={uploadVideoFunction}
            />
            <i className="fa fa-upload"></i> Upload Video
            </label>

        </div>

    </div>
  )
}

export default VideoUploader






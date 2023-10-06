import {useState} from 'react'
import { Form } from 'react-bootstrap'
import { useUploadSlideMutation, useAddSlideByLinkMutation } from '../state/adminSlice'
import {toast} from 'react-toastify'
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const SlideUploader = ({addedPhotos, onChange}) => {
    const [photoLink, setPhotoLink] = useState('')
    const [uploadSlide, {isLoading:savingSlide}] = useUploadSlideMutation()
    const [addSlideByLink, {isLoading:savingLinkSlide}] = useAddSlideByLinkMutation()

    const addPhotoByLink = async(event) =>{
        event.preventDefault()
        addSlideByLink({link:photoLink}).unwrap().then(res =>{
            onChange(prev =>{
                return [...prev, res];
            })
            setPhotoLink('')
        }).catch(err =>{
            toast.error(err?.data?.message || err?.message)
        })
    }
    const uploadPhoto = async(event) =>{
        event.preventDefault()
        const files = event.target.files;
        const data = new FormData();
        for(let i = 0; i < files.length; i++){
            data.append('photos', files[i])
        }
        uploadSlide(data).unwrap().then(res =>{
            onChange(prev =>{
                return [...prev, ...res];
            })
        }).catch(err =>{
            toast.error(err?.data?.message || err?.message)
        })
    }

    const removePhoto = async(e,link) =>{
        e.preventDefault()
        onChange([...addedPhotos.filter(photo => photo !== link)])
    }

    const selectAsMainPhoto = async(e, link) =>{
        e.preventDefault()
        const addedPhotosWithoutSelected = [...addedPhotos.filter(photo => photo !== link)]
        const newAddedPhotos = [link,...addedPhotosWithoutSelected]
        onChange(newAddedPhotos)
    }
    console.log(addedPhotos)
  return (
    <div>
        <div className="d-flex">
            <Form.Control type="text"  value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using a link .....jpg" name="photo" />
            <button onClick={addPhotoByLink } style={{cursor:"pointer", border:'1px solid #f2ac20', background:'#f2ac20', borderRadius:'15px', color:'#293855'}}  className='px-2 mx-2'>Add&nbsp;Slide</button>
            </div>
            
            <div className="mt-2 g-2 row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 row-cols-xxl-8">
                {addedPhotos.length > 0 && addedPhotos.map(link =>(
                    <div className='position-relative' key={link}>
                        <img style={{ width: "100%", minWidth: "185px", height: "100%", maxHeight: "150px", borderRadius: "10px" }} src={`https://collectionafrica-elearning.onrender.com/${link}`} alt="" />
                        <div onClick={(e) => removePhoto(e,link)} style={{cursor:"pointer",width:'50px', color:'#c2e7c9',textDecoration:'none'}}  className=" text-center pt-1 position-absolute bottom-0 end-0">
                            <DeleteIcon/>
                        </div>
                        <div onClick={(e) => selectAsMainPhoto(e,link)} style={{cursor:"pointer",width:'50px', color:'#c2e7c9',textDecoration:'none'}}   className="text-center pt-1 position-absolute bottom-0 start-0">
                            {link === addedPhotos[0] && (
                                <StarBorderIcon style={{color:"#f2ac20"}} />
                            )}
                            {link !== addedPhotos[0] && (
                                <StarBorderIcon/>
                            )}
                            
                        </div>
                    </div>
                ))}
            <label style={{cursor:"pointer", border:'1px solid #f2ac20', background:'transparent', borderRadius:'15px', color:'#293855'}} className='py-2 px-3 text-center'>
                <input type="file" multiple style={{display:"none"}} name="" id="" onChange={uploadPhoto} />
                <i className="fa fa-upload"></i> Upload Slide
            </label>
            </div>
    </div>
  )
}

export default SlideUploader
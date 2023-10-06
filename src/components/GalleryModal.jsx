import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './outside.scss'

const GalleryModal = ({ show, onHide, selectedIndex, media, mediaType }) => {
  const files = mediaType === 'Slides' ? media.addedSlides : media.addedVideos;
  const [currentIndex, setCurrentIndex] = useState(selectedIndex);

  useEffect(() => {
    setCurrentIndex(selectedIndex);
  }, [show, selectedIndex]);

  const handleNext = () => {
    if (currentIndex < files.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Modal show={show} fullscreen={true} onHide={onHide} className='GalleryModal'>
      <Modal.Header closeButton>
        <Modal.Title>{mediaType === 'Slides' ? <h1>Slide Lessons</h1> : <h1>Video Lessons</h1>}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container containBody">
          <div className="left">
          {currentIndex > 0 && (
              <div className="btn btn-outline-dark" onClick={handlePrevious}>
                <ArrowBackIosNewIcon />
              </div>
            )}
          </div>
          <div className="center">
            {mediaType === 'Slides' && <img src={`https://collectionafrica-elearning.onrender.com/${files[currentIndex]}`} style={{ width: '85%', height: '100%' }} alt='' />}
            {mediaType === 'Video' && <video className='mt-5' controls width='85%%' height='100%'>
              <source src={`https://collectionafrica-elearning.onrender.com/${currentIndex ? files[currentIndex] : files[selectedIndex]}`} type='video/mp4' />
              Your browser does not support the video tag.
            </video>}
          </div>
          <div className="right">
          {currentIndex < files.length - 1 && (
              <div className="btn btn-outline-dark" onClick={handleNext}>
                <ArrowForwardIosIcon />
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default GalleryModal;

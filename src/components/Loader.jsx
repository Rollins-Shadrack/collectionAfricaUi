import { Spinner } from "react-bootstrap"
import './loader.css'

const Loader = () => {
  return (
    <div className="loaderContainer">
      <div class="loader">
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__bar"></div>
      <div class="loader__ball"></div>
</div>
    </div>
  )
}

export default Loader
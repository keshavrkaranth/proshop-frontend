import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const notify = (message) =>{
  toast.error(message,{position:toast.POSITION.TOP_RIGHT})
}

export default notify


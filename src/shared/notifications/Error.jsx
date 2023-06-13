import React from 'react'
import '../../styles/blocks/notification.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
export default function Error(props) {

    const handleClose = () => {
        props.close.setShowError(false)
    }
    
  return (
    <div className='error'><p>{props.message}</p> <FontAwesomeIcon className='icon' onClick={handleClose} icon={faCircleXmark} /></div>
  )
}

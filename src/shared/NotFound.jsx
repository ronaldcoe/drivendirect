import React from 'react'
import '../styles/blocks/notfound.css'

export default function NotFound() {
  return (
    <div className='notfound'>
        <h1>It seems like you got lost...</h1>
        <p>We couldn't find the page you were looking.</p>
        <a href="/dashboard">← Go back to home</a>
    </div>
  )
}

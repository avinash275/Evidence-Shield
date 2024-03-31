import React from 'react'
import { Link } from 'react-router-dom'
import './police.css'

export default function Police() {
  return (
    <div className='police'>
            <div className='container2' style={{marginTop:"100px", textAlign:"center", width:"500px", borderRadius:"30px"}}><h2>Police Login</h2></div>

      <div className="boxes">
          <div className="box1"><Link className='link' to="/viewComplaints">View Complaints</Link></div>
      </div>
    </div>
  )
}

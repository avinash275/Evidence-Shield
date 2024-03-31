import React from 'react'
import { Link } from 'react-router-dom'

export default function ComplainantPage() {
  return (
    <div className='police'>
      <div className='container2' style={{marginTop:"100px", textAlign:"center", width:"500px", borderRadius:"30px"}}><h2>Complainant Login</h2></div>
      <div className="boxes">
          <div className="box1"><Link className='link' to="/trackYourComplaint">Track Your Complaint</Link></div>
          <div className="box1"><Link className='link' to="/complainant">View Complaints</Link></div>
          <div className='box1'><Link className='link' to="/reportCrime">Report New Crime</Link></div>
      </div>

    </div>
  )
}

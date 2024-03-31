import React from 'react'
import { Link } from 'react-router-dom'

export default function Hospital() {
  return (
    <div className='hospital'>
      <div className='container2' style={{marginTop:"100px", textAlign:"center", width:"500px", borderRadius:"30px"}}><h2>Hospital Login</h2></div>
      <div className="boxes">
          <div className="box1"><Link className='link' to="/uploadReport">View Complaints</Link></div>
      </div>
    </div>
  )
}

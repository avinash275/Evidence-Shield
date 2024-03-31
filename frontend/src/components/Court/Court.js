import React from 'react'
import { Link } from 'react-router-dom'

export default function Court() {
  return (
    <div className="court">
      <div className='container2' style={{marginTop:"100px", textAlign:"center", width:"500px", borderRadius:"30px"}}><h2>Court Login</h2></div>

      <div className="boxes">
          <div className="box1"><Link className='link' to="/checkCases">Check Updates</Link></div>
      </div>
    </div>
  )
}

import React from 'react'
import Styles from './Dash.module.css'
const OperationDash = () => {
  return (
    <div className='p-4 text-dark d-flex flex-row justify-content-between align-items-center '>
      <div className={`m-3 p-4 px-5 border rounded w-50 ${Styles.bgcontainer}`}>
        <h3 className={`mb-2 pb-2 ${Styles.heading}`}>Final Quotations</h3>
        <ul className='px-1'>
            <li>Machine 1</li>
            <li>Machine 2</li>
            <li>Machine 3</li>
            <li>Machine 4</li>
        </ul>
      </div>
      <div className={`m-3 p-4 px-5 border rounded w-50 ${Styles.bgcontainer}`}>
        <h3 className={`mb-2 pb-2 ${Styles.heading}`}>Marching</h3>
        <ul className='px-1'>
            <li>Machine 1</li>
            <li>Machine 2</li>
            <li>Machine 3</li>
            <li>Machine 4</li>
        </ul>
      </div>
    </div>
  )
}

export default OperationDash

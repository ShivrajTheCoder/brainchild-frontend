import React from 'react'
import CoursesContainer from '../Components/HomeComponents/CoursesContainer'
import ComingTestContainer from '../Components/HomeComponents/ComingTestContainer'

export default function Home() {
  return (
    <div className='mx-20 my-10'>
      <ComingTestContainer/>
      <CoursesContainer/>
    </div>
  )
}

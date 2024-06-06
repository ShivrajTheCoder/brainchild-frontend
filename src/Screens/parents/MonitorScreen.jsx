import React from 'react'
import ChildWatchedVideos from '../../Components/ParentComponents/ChildWatchedVideos'

export default function MonitorScreen() {
  return (
    <div className='p-10'>
      <h1 className='font-bold text-xl '>Watched Videos</h1>
      <ChildWatchedVideos/>
    </div>
  )
}

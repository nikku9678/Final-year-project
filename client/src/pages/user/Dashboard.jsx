import React from 'react'
import { useSelector } from 'react-redux'
import UserProfile from './UserProfile'
import Admin from '../admin/Admin'

const Dashboard = () => {
  const {user} = useSelector((state)=>state.auth)
  return (
    <div>
      {!user?.isAdmin ?<><UserProfile/></>:<><Admin/></> }
    </div>
  )
}

export default Dashboard

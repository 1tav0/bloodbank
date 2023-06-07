import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const { currentUser } = useSelector((state) => state.users)
  return (
    <div>
      <h1>Home</h1>
      {currentUser.email}
    </div>
  )
}

export default Home
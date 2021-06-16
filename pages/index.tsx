import React from 'react'
// Modules
import { NextPage } from 'next/types'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <Dashboard />
    </>
  )
}

export default HomePage

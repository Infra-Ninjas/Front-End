import React from 'react'
import Header from '../../components/Homepage-Components/Header'
import SpecialityMenu from '../../components/Homepage-Components/SpecialityMenu'
import TopDoctors from '../../components/Homepage-Components/TopDoctors'
import Banner from '../../components/Homepage-Components/Banner'

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home

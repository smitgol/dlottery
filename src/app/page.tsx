import NavBar from '@/components/Navbar/Navbar'
import React from 'react'
import Hero from "../components/Hero/Hero";
import ExploreLotteries from '@/components/ExploreLotteries/ExploreLotteries';

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <ExploreLotteries />
    </React.Fragment>
  )
}

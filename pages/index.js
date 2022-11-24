import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Feed from '../components/Feed'

export default function Home() {
  const [toggle, setToggle] = useState(false);
  const [category, setCategory] = useState("All")
  return (
    <div className=''>
      <Feed category={category}/>
    </div>
  )
}

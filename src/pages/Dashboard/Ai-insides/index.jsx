import React, { useState } from 'react'
import Layout from '../layout'
import DropDown, { SelectForm } from '@/Props/Dropdown'
import AIDataCard from '@/Props/AIDataCard'
import { ResizableDemo } from '@/Props/ResizeableCard'
  
const FirewallAI = () => {
    const [showDemo, setShowDemo] = useState(false);
  return (
    <Layout>
        <div className='shadow-xl m-[20px] rounded-xl p-[15px] border-2  '>
            <h1 className='text-xl font-bold dark:text-white text-black'>Firewall AI/ML</h1>
        </div>
        <div className='shadow-xl m-[20px] rounded-2xl p-[15px] border-2  '>
      <SelectForm setShowDemo={setShowDemo} />
        </div>
        {showDemo && ( // Conditionally render ResizableDemo
        <div className="shadow-xl m-[20px] rounded-2xl p-[15px] border-2">
          <ResizableDemo />
        </div>
      )}
    </Layout>
  )
}

export default FirewallAI

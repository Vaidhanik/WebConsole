import React from 'react'
import Layout from '../layout'
import DropDown, { SelectForm } from '@/Props/Dropdown'
import AIDataCard from '@/Props/AIDataCard'
import { ResizableDemo } from '@/Props/ResizeableCard'
  
const FirewallAI = () => {
  return (
    <Layout>
        <div className='shadow-xl m-[20px] rounded-xl p-[15px] border-2  '>
            <h1 className='text-xl font-bold'>Firewall AI/ML</h1>
        </div>
        <div className='shadow-xl m-[20px] rounded-2xl p-[15px] border-2  '>
      <SelectForm />
        </div>
        <div className='shadow-xl m-[20px] rounded-2xl p-[15px] border-2 '>
        <ResizableDemo />
        </div>
    </Layout>
  )
}

export default FirewallAI

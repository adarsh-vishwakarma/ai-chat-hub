import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const WorkSpaceHeader = ({fileName}) => {
  return (
    <div className='p-4 flex justify-between shadow-md'>
        <Image src={'/logo.png'} alt='logo' width={120} height={120} />
        <h2>{fileName}</h2>
        <div className='flex gap-5 items-center'>
          <Button>Save</Button>

        <UserButton />
        </div>
    </div>
  )
}

export default WorkSpaceHeader
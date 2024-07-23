import React from 'react'
import { Button } from './ui/button'
import Image from "next/image";

interface ButtonProps{
    isLoading: boolean,
    className?: string,
    children: React.ReactNode,
}

const SubmitButton = ({isLoading, className, children}: ButtonProps) => {
  return (
    <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
        {isLoading ? (
            <div className='flex gap-4 items-center'>
                <Image
                     src="/assets/icons/loader.svg"
                     height={24}
                     width={24}
                     alt="loader"
                    className="animate-spin"
                    onError={(e) => {
                      // Fallback to a default image or handle the error
                      (e.target as HTMLImageElement).src = '/assets/icons/default-loader.svg';
                    }}
                 />
                 Loading...
            </div>
        ): children}

    </Button>
  )
}

export default SubmitButton
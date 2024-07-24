import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';

const Register = async({params: {userId} }: SearchParamProps) => {

    const user = await getUser(userId);


  return (
    <div className="flex h-screen max-h-screen">

      <div className="pic-section p-1 max-w-[420px]">
        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="register"
          className="side-img"
        />
      </div>

      <section className="container remove-scrollbar m-2 h-auto">

        <div className="sub-container max-w-[840px] flex-1 flex-col p-2 h-auto">
          <div className="logo-section flex flex-row gap-1">
              <Image
              src="/assets/icons/logo-icon.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-11 h-10 w-fit float-left"
              />
            <div className="title float-right w-[200px] h-10">
              <h1 className="text-3xl">Medi Plus</h1>
            </div>

          </div>
            <RegisterForm user={user}/>
          {/* </div> */}


            <div className="copy-right mt-10 text-12-regular flex flex-row items-center justify-center">
              <p className=" text-dark-600 xl:text-left">All Rights Reserved © SupunThewahettige | 2024</p>
            </div>

         </div>
        
      </section>

      
    </div>
  )
}

export default Register
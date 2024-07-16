import React from 'react'
import Link from 'next/link'
import Image from "next/image";
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';

const Register = async({params: {userId} }: SearchParamProps) => {

    const user = await getUser(userId);


  return (
    <div className="flex h-screen max-h-screen">

      <div className="pic-section p-1 bg-red-200 max-w-[50%]">
        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="register"
          className="side-img object-center max-w-[410px]"
        />
      </div>

      <section className="container remove-scrollbar m-2 bg-blue-200">

        <div className="sub-container max-w-[850px] flex-1 flex-col bg-yellow-100 p-2">
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

          <div className="text-14-regular flex mt-10 flex-row items-center justify-center">
          {/* <p className="justify-items-end text-dark-600 xl:text-left">© 2024 MediPlus</p> */}
          <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>

          <div className="copy-right mt-6 text-12-regular flex flex-row items-center justify-center">
          <p className=" text-dark-600 xl:text-left">All Rights Reserved © 2024 MediPlus</p>
          </div>

        </div>
      </section>

      
    </div>
  )
}

export default Register
import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Success = async ({params: {userId}, searchParams }: SearchParamProps) => {

    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);
    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)


  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
        <div className="success-img">
            <Link href='/'>
                <div className="logo-section flex flex-row gap-1">
                    <Image
                    src="/assets/icons/logo-icon.svg"
                    height={1000}
                    width={1000}
                    alt="patient"
                    className="mb-11 h-10 w-fit float-left"
                    />
                    <div className="title float-right w-[150px] h-10">
                        <h1 className="text-3xl">Medi Plus</h1>
                    </div>
                </div>
            </Link>

            <section className='flex flex-col items-center'>
                <Image
                    src="/assets/gifs/success.gif"
                    height={300}
                    width={280}
                    alt="success"
                    unoptimized
                />
                <h2 className="header mb-6 max-w-[600px] text-center">
                    Your <span className='text-green-500'>appointment request</span> has been successfully submitted!
                </h2>
                <p>We'll connect with you soon to confirm.</p>
            </section>

            <section className='request-details'>
                <p>Requested Appointment Details:</p>
                <div className='flex items-center gap-3'>
                    <Image
                        src={doctor?.image!}
                        height={100}
                        width={100}
                        alt="doctor"
                        className='size-6'
                    />
                    <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                </div>

                <div className='flex gap-2'>
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="calendar"
                    />
                    <p>{formatDateTime(appointment.schedule).dateTime}</p>
                </div>
            </section>

            <Button variant="outline" className='shad-primary-btn' asChild>
                <Link href={`/patients/${userId}/new-appointment`}>
                    New Appointment
                </Link>
            </Button>

            <div className="copy-right mt-8 text-12-regular flex flex-row items-center justify-center">
              <p className=" text-dark-600 xl:text-left">All Rights Reserved © SupunThewahettige | 2024</p>
            </div>
        </div>
       
    </div>
  )
}

export default Success
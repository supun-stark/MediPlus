import {DataTable} from '@/components/table/DataTable'
import StatCard from '@/components/StatCard'
import {columns} from '@/components/table/columns'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Admin = async () => {

  const appointments = await getRecentAppointmentList()

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
            <Link href="/" className='cursor-pointer'>
                <div className="logo-section flex flex-row gap-1">
                    <Image
                    src="/assets/icons/logo-icon.svg"
                    height={1000}
                    width={1000}
                    alt="logo"
                    className="w-fit float-left h-9"
                    />
                    <div className="title float-right w-[150px]">
                        <h1 className="text-3xl">Medi Plus</h1>
                    </div>

                </div>
            </Link>

            <p className='text-16-semibold'>Admin Dashboard</p>
        </header>

        {/* Main section */}
        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header !text-[#4D2DB7]'>Welcome, Admin!</h1>
                <p className='text-dark-700'>Get Ahead by Managing Today's Appointments!</p>
            </section>

            <section className='admin-stat'>
                <StatCard
                 type="appointments"
                 count={appointments.scheduledCount}
                 label="Scheduled appointments"
                 icon="/assets/icons/appointments.svg"
                />

                <StatCard
                 type="pending"
                 count={appointments.pendingCount}
                 label="Pending appointments"
                 icon="/assets/icons/pending.svg"
                />

                <StatCard
                 type="cancelled"
                 count={appointments.cancelledCount}
                 label="Cancelled appointments"
                 icon="/assets/icons/cancelled.svg"
                />

            </section>

            {/* Data table */}
           <DataTable columns={columns} data={appointments.documents}/> 
          
        </main>
          <div className="text-15-regular flex flex-row items-center justify-end !mr-[140px] !mt-3">
            <Link href="/" className="text-red-500">Logout</Link>
          </div>

          <div className="copy-right mt-8 text-12-regular flex flex-row items-center justify-center">
            <p className=" text-dark-600 xl:text-left">All Rights Reserved © SupunThewahettige | 2024</p>
          </div>
    </div>
  )
}

export default Admin
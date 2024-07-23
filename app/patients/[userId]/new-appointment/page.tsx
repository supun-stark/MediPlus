import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({params: {userId}}: SearchParamProps) {

  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="container remove-scrollbar my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
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
       
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
           />

          <div className="text-14-regular flex mt-8 flex-row items-center justify-center">
          {/* <p className="justify-items-end text-dark-600 xl:text-left">© 2024 MediPlus</p> */}
            <Link href="/" className="text-red-500">Logout</Link>
          </div>

          <div className="copy-right mt-8 text-12-regular flex flex-row items-center justify-center">
            <p className=" text-dark-600 xl:text-left">All Rights Reserved © 2024 MediPlus</p>
          </div>

        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img bg-bottom max-w-[390px]"
      />

    </div>
  );
}

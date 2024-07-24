import PatientForm from "@/components/forms/PatientForm";
import PasskeyModel from "@/components/PasskeyModel";
import Image from "next/image";
import Link from "next/link";


const Home = ({searchParams}: SearchParamProps) => {

  //const isAdmin = searchParams.admin === 'true';
  const isAdmin = searchParams?.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">

     {isAdmin && <PasskeyModel/>}

      <div className="pic-section my-4 px-10 max-w-[50%] py-5">
        <Image
          src="/assets/images/doctor-lady.jpg"
          height={1000}
          width={1000}
          alt="patient"
          className="side-img opacity-77 object-center"
          priority
        />
      </div>

      <section className="container remove-scrollbar my-auto m-4">
        <div className="sub-container max-w-[498px] py-4 px-1">
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
          <PatientForm/>

          <div className="text-14-regular flex mt-10 flex-row items-center justify-center">
          {/* <p className="justify-items-end text-dark-600 xl:text-left">© 2024 MediPlus</p> */}
          <Link href="/?admin=true" className="text-green-500">Admin</Link>
          
          </div>

          <div className="copy-right mt-6 text-12-regular flex flex-row items-center justify-center">
          <p className=" text-dark-600 xl:text-left">All Rights Reserved © SupunThewahettige | 2024</p>
          </div>

        </div>
      </section>

      
    </div>
  );
}

export default Home

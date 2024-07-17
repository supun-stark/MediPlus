"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import Image from "next/image"
import { SelectItem } from "../ui/select"

 
const AppointmentForm= ({
    userId, patientId, type}: {
        userId: string;
        patientId: string;
        type: "create" | "cancel" | "schedule";
    }) => {
  const router = useRouter();
  const[isLoading, setIsLoading] = useState(false);


  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 

  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    try{
      const userData = {name, email, phone};

      const user = await createUser(userData);

      if(user) router.push(`/patients/${user.$id}/register`)
    } catch(error){
      console.log(error);
    }

    setIsLoading(false)
  }

    let buttonLabel;

    switch (type) {
        case 'cancel':
            buttonLabel = 'Cancel Appointment';
            break;
        case 'create':
            buttonLabel = 'Create Appointment';
            break;
        case 'schedule':
            buttonLabel = 'Schedule Appointment';
            break;
        default:
            break;
    }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-10 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Schedule Your Next Doctor's Appointment Today!</p>
        </section>

        {type !== "cancel" && (
            <>
                <CustomFormField
                        fieldType={FormFieldType.SELECT}
                        control={form.control}
                        name="primaryPhysician"
                        label="Doctor's Name"
                        placeholder="Select your doctor"
                >
                {Doctors.map((doctor) => (
                    <SelectItem key={doctor.name}
                     value={doctor.name}>
                        <div className="cursor-pointer items-center gap-2 flex">
                            <Image
                                src={doctor.image}
                                height={32}
                                width={32}
                                alt={doctor.name}
                                className="border border-dark-500 rounded-full"
                            />
                            <p>{doctor.name}</p>
                        </div>

                    </SelectItem>
                ))}
              </CustomFormField>  

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="schedule"
                label="Expected appointment date"
                showTimeSelect
                dateFormat="MM/dd/yyyy - h:mm aa"
              />

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="reason"
                    label="Reason for appointment"
                    placeholder="Enter appointment reason"
                />

                <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="notes"
                    label="Special notes"
                    placeholder="Enter any note"
                />
              </div>
            
            </>
        )}

        {type === "cancel" && (
            <CustomFormField
             fieldType={FormFieldType.TEXTAREA}
             control={form.control}
             name="cancellationReason"
             label="Reason for cancellation"
             placeholder="Enter cancellation reason"
            />
        )}
      
      <SubmitButton isLoading={isLoading} className={`${type === "cancel" ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLabel}</SubmitButton>
    </form>
  </Form>
  )
}

export default AppointmentForm
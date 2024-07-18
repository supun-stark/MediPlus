"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image";
import FileUploader from "../FileUploader"

 
 
const RegisterForm= ({user}: {user: User}) => {
  const router = useRouter();
  const[isLoading, setIsLoading] = useState(false);


  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
        ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);

    let formData;

    if(values.identificationDocument && values.identificationDocument.length >0){
        const blobFile = new Blob([values.identificationDocument[0]], {
            type: values.identificationDocument[0].type,
        })

        formData = new FormData();
        formData.append('blobFile', blobFile);
        formData.append('fileName', values.identificationDocument[0].name)
    }

    try{
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      }

      // @ts-ignore
      const patient = await registerPatient(patientData);

      if(patient) router.push(`/patients/${user.$id}/new-appointment`)

    } catch(error){
      console.log(error);
    }

    setIsLoading(false);
  }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-1">
          <h1 className="header">Hey there!</h1>
          <p className="text-dark-700">Share more about yourself with us..</p>
        </section>

        
        <section className="space-y-6 bg-[#2E236C]">
         <div className="mb-9 space-y-1 p-2">
            <h2 className="sub-header">Personal Information</h2>
         </div>
        </section>
        

        <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
             label="Full Name"
            placeholder="David Smith"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="E-mail"
                placeholder="davidsmith@gmail.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
            />

            <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
                placeholder="07* *******"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthDate"
                label="Date of Birth"
            />

            <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="gender"
                label="Gender"
                renderSkeleton={(field) =>(
                    <FormControl>
                        <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        {GenderOptions.map((option) =>(
                            <div key={option} className="radio-group">
                                <RadioGroupItem value={option} id={option} />
                                <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                            </div>
                        )
                        )}
                        </RadioGroup>
                    </FormControl>
                )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="address"
                label="Address"
                placeholder="1st Lane, Colombo 05."
            />

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="occupation"
                label="Occupation"
                placeholder="Software Engineer"
            />

        </div>


        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="emergencyContactName"
                label="Emergency Contact Name"
                placeholder="Guardian's Name"
            />

            <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="emergencyContactNumber"
                label="Emergency Contact Number"
                placeholder="07* *******"
            />
        </div>
    

         <section className="space-y-6 bg-[#2E236C]">
            <div className="mb-9 space-y-1 p-2">
                <h2 className="sub-header">Medical Information</h2>
            </div>
        </section>

        <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Primary Physician"
                placeholder="Select a Physician"
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



        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insuranceProvider"
                label="Insurance Provider"
                placeholder="Fare First Insurance"
            />

            <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="insurancePolicyNumber"
                label="Insurance Policy No"
                placeholder="ABCD-1234"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="allergies"
                label="Allergies(If any)"
                placeholder="Penicillin, Tomato, Pollen"
            />

            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="currentMedication"
                label="Current Medication(If any)"
                placeholder="Paracetamol 200mg, Ibuprofen 100mg"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="familyMedicalHistory"
                label="Family Medical History"
                placeholder="Grand-mother had breast cancer"
            />

            <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="pastMedicalHistory"
                label="Past Medical History"
                placeholder="Tonsillectomy, Appendectomy"
            />
        </div>

        <section className="space-y-6 bg-[#2E236C]">
            <div className="mb-9 space-y-1 p-2">
                <h2 className="sub-header">Identification & Verification</h2>
            </div>
        </section>

        <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="identificationType"
                label="Identification Type"
                placeholder="Select an Identification Document"
            >
                {IdentificationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                        {type}
                    </SelectItem>
                ))}
         </CustomFormField>  

         <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="identificationNumber"
                label="identification No"
                placeholder="1234-5678"
            />

            <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="identificationDocument"
                label="Scanned Copy of Identification Document"
                renderSkeleton={(field) =>(
                    <FormControl>
                      <FileUploader files={field.value} onChange={field.onChange}/>
                    </FormControl>
                )}
            />

        <section className="space-y-6 bg-[#2E236C]">
            <div className="mb-9 space-y-1 p-2">
                <h2 className="sub-header">Privacy & Consent</h2>
            </div>
        </section>

        <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="treatmentConsent"
                label="I consent to treatments"
        />

        <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="disclosureConsent"
                label="I consent to disclosure of Information"
        />

        <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="privacyConsent"
                label="I consent to privacy & policy"
        />



      <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
    </form>
  </Form>
  )
}

export default RegisterForm
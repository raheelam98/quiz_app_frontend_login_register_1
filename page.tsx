"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/layout/Button';
import { FormType } from '@/lib/utils/types';
import Link from 'next/link';


const page = () => {

  //let formData = new FormData();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm<FormType>();

  const loginFn = async (data: FormType) => {
    const response = await fetch(`api/api/Signin`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      }
    );    // response
    if (!response.ok) {
      setError(await response.json())
    }
    else{
      //setError("");
      console.log(await response.json()) 
    }
    
    console.log("FormData  ", FormData)
    console.log("loginFn ",data)
  }; // loginFn
  return (
    <main className='h-screen flex justify-center items-center  bg-slate-200'>

      <div className='w-1/3 p-6 rounded-md  bg-white flex flex-col gap-2 justify-center items-center'>
        <h1 className='md:text-2xl text-xl font-bold text-gray-900 m-2'>Quiz Hub</h1>
        <p className='text-red-500'>{error ? error : ""}</p>
        <form onSubmit={handleSubmit(loginFn)} className='flex flex-col gap-4 justify-center items-center'>
        
          <input className='rounded-md border p-1.5' type="email" placeholder='userEmail' {...register("user_email", {
            required: true
          })} />
          <input className='rounded-md border p-1.5' type="password" placeholder='userPassword' {...register("user_password", {
            required: true,
            minLength: 6
          })} />
          <Button buttonType='submit'>
            Sign In
          </Button>
        </form>

        <h1 className='md:text-xl text-gray-900 m-2'>
          Don't have an account?
        </h1>
        <Link href={"/register"}>
          <Button buttonType='button'>
            Sign Up
          </Button>
        </Link>
      </div>
    </main>
  )
}

export default page


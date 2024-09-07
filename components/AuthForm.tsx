'use client';
import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import SignUp from '@/app/auth/sign-up/page';
import { useRouter } from 'next/navigation';
import { signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';

const formSchema = z.object({
    email: z.string().email(),
  })
  

const AuthForm = ({type}:{type:string}) => {
    const router = useRouter();
    const [user,setUser] = useState(null);
    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "" 
        },
      })
     
      const onSubmit= async (data: z.infer<typeof formSchema>)=> {
       
        try {
            if(type === 'sign-up'){
                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    address1: data.address1!,
                    city: data.city!,
                    state: data.state!,
                    postalCode: data.postalCode!,
                    dateOfBirth: data.dateOfBirth!,
                    ssn: data.ssn!,
                    email: data.email,
                    password: data.password
                  }
                const newUser = await signUp(userData);
                setUser(newUser);
            }
            if(type==='sign-in'){
              const response = await signIn({
                email:data.email,
                password: data.password,
              })
              if (response) router.push('/')
            }
        } catch (error) {
            console.log(error);
        }finally{

        }
      }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/"
            className='mb-12 cursor-pointer flex items-center gap-1'>
                <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt=''/>
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
                  PayStudio
                </h1>
            </Link>
            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {user ? 'Link account' : type === 'sign-in' ? 'Sign In' : 'Sign up'}
                    <p className="text-16 font-normal text-gray-600">
                {user 
                  ? 'Link your account to get started'
                  : 'Please enter your details'
                }
              </p>  
                </h1>
            </div>
        </header>
        {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user}  variant="primary" />
        </div>
      ): (
        <>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {type==='sign-up' && (
        <>
        <div className='flex gap-4'>
        <CustomInput 
        control={form.control}
        name ='firstName'
        label='First name'
        placeholder='First name' 
        />
         <CustomInput 
        control={form.control}
        name ='lastName'
        label='Last name'
        placeholder='Last name' 
        />
        </div>
         <CustomInput 
        control={form.control}
        name ='address1'
        label='Address'
        placeholder='Enter your Address' 
        />
         <CustomInput 
        control={form.control}
        name ='city'
        label='City'
        placeholder='Enter your city' 
        />
        <div className='flex gap-4'>
         <CustomInput 
        control={form.control}
        name ='state'
        label='State'
        placeholder='ex: HYD' 
        />
         <CustomInput 
        control={form.control}
        name ='postalCode'
        label='Postal code'
        placeholder='ex: 502032' 
        />
        </div>
         <CustomInput 
        control={form.control}
        name ='dateOfBirth'
        label='Date of Birth'
        placeholder='yyyy-mm-dd' 
        />
        <CustomInput 
        control={form.control}
        name ='ssn'
        label='SSN'
        placeholder='ex: 1234' 
        />
        </>
        )}
        <CustomInput 
        control={form.control}
        name ='email'
        label='Email'
        placeholder='Enter your Email' 
        />
        <CustomInput 
        control={form.control}
        name ='password'
        label='Password'
        placeholder='Enter your password' 
        />
        <div className='flex flex-col gap-4'>
        <Button type="submit" className='text-white bg-blue-500 hover:bg-blue-700 cursor-pointer font-inter'>{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</Button>
        </div>
      </form>
    </Form>
      <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
              ? "Don't have an account yet?"
              : "Already have an account"}
            </p>
            <Link href={type === 'sign-in' ? '/auth/sign-up' : '/auth/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
          </>
  )}
    </section>
  )
}

export default AuthForm
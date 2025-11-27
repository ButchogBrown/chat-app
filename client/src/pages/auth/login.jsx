import {React, useState} from 'react'
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "../../components/custom/Link";
import { Checkbox } from '@/components/ui/checkbox';
import { CircleX } from 'lucide-react';
import axios from 'axios';

const login = () => {
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
         "http://localhost:3000/api/v1/auth/login",
         formData
      )
      console.log(res.data)
    }catch(error) {
      setError(error.response.data.message)
      setTimeout(() => {
        setError("")
      }, 3000);
    }
  }

  return (
    <div className='bg-container flex justify-center items-center w-screen h-screen'>
        <div className='flex flex-col justify-center items-center'>
          <section className='flex flex-col text-center'>
            <h1 className='text-3xl '>Welcome Back</h1>
            <p className='text-sm text-gray-600'>Sing in to you Account.</p>
          </section>
          <section className='bg-white rounded-xl p-5 text-gray-600 mt-5 w-96'>
            {error && 
              <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg flex items-center gap-3">
                <CircleX />
                <span>{error}</span>
              </div>
            }     
            <form onSubmit={handleSubmit}>
              <div>
                <Label>Email Address</Label>
                <Input type="email" placeholder="john@example.com" className="rounded-xl"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className='mt-3'>
                <Label>Password</Label>
                <Input type="password" className="rounded-xl"
                  onChange={(e) => setFormData({...formData, password: e.target.value}) }
                />
              </div>
              <section className='flex justify-between mt-4 mb-2 items-center'>
                <div className='flex gap-2'>
                    <Checkbox className="rounded" />
                  <Label>Remember me </Label>
                </div>
                <Link href="#">Forgot password?</Link>
              </section>
              <Button type="submit" className="w-full rounded-xl mt-3 bg-btn text-white hover:bg-btn_hover">Sign in</Button>
            </form>

            <div className='flex justify-center items-center mt-5 gap-1'> 
              <p>Don't have an account?</p>
              <Link href='#'>Sign up</Link>
            </div>
          </section>
        </div>
    </div>
  )
}

export default login
import { React, useContext, useState } from 'react'
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "../../components/custom/Link";
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import { CircleX } from 'lucide-react';
import { AuthContext } from '@/context/AuthProvider';
import { replace, useNavigate } from 'react-router-dom';

const register = () => {
  const navigate = useNavigate()  
  const { refetchUser } = useContext(AuthContext)
  const [error, setError] = useState()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "12345678",
    confirmPassword: "12345678"
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register", formData, {
          withCredentials: true
        }
      );
      console.log("this is the data", res.data)
      await refetchUser()
      navigate('/home')

    }catch (error) {
      setError(error.response.data.message)

      setTimeout(() => {
        setError("")
      }, 3000)
    }
  }
  return (
    <div className='bg-container flex justify-center items-center w-screen h-screen'>
        <div className='flex flex-col justify-center items-center'>
          <section className='flex flex-col text-center'>
            <h1 className='text-3xl '>Create Account</h1>
            <p className='text-sm text-gray-600'>Sing up to get started.</p>
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
                <Label>Full Name</Label>
                <Input type="text" placeholder="John Doe" className="rounded-xl"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className='mt-3'>
                <Label>Email Address</Label>
                <Input type="email" placeholder="john@example.com" className="rounded-xl" 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className='mt-3'>
                <Label>Password</Label>
                <Input type="password" className="rounded-xl" 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              
							<div className='mt-3'>
                <Label>Confirm Password</Label>
                <Input type="password" className="rounded-xl"
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
              <Button type="submit" className="w-full rounded-xl mt-3 bg-btn text-white hover:bg-btn_hover">Sign in</Button>
            </form>

            <div className='flex justify-center items-center mt-5 gap-1'> 
              <p>Don't have an account?</p>
              <Link href='/login'>Sign in</Link>
            </div>
          </section>
        </div>
    </div>
  )
}

export default register
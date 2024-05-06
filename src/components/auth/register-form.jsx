'use client'

import { useForm } from 'react-hook-form'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import CardWrapper from './card-wrapper'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function RegisterForm () {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword.message = 'Passwords do not match'
    }
    const { confirmPassword, ...userData } = data
    await axios
      .post('/api/auth/register', userData)
      .then((res) => {
        toast.success('Account created successfully')
        if (res.status === 200) router.push('/auth/login')
        console.log(res)
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      })
    console.log(data)
  })

  return (
    <>
      <CardWrapper
        label="Enter your information to create an account"
        title="Sign Up"
        backButtonHref="/auth/login"
        backButtonLabel="Already have an account? Sign in"
      >
        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <Label
              htmlFor="username"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Username
            </Label>
            <Input
              type="text"
              id="username"
              placeholder="johnbrown"
              {...register('username', {
                required: {
                  value: true,
                  message: 'Username is required'
                },
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters'
                }
              })}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="mb-2">
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Email address
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="johnbrown@example.com"
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required'
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'Email is not valid'
                }
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-2">
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Password
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="********"
              {...register('password', {
                required: {
                  value: true,
                  message: 'Password is required'
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    'Password must contain 8 characters, at least one letter and one number'
                }
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="confirmPass"
              className="block text-sm font-medium text-muted-foreground mb-1"
            >
              Confirm Password
            </Label>
            <Input
              type="password"
              id="confirmPass"
              placeholder="********"
              {...register('confirmPassword', {
                required: {
                  value: true,
                  message: 'Confirm password is required'
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    'Password must contain at least one letter and one number'
                },
                validate: (value) =>
                  value === document.getElementById('password').value ||
                  'Passwords do not match'
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </div>
        </form>
      </CardWrapper>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1d1d1d',
            color: 'white'
          }
        }}
      />
    </>
  )
}

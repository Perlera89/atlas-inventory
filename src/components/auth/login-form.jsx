'use client'
// hooks and store
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import CardWrapper from './card-wrapper'
import { toast, Toaster } from 'react-hot-toast'

export default function RegisterForm () {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })

    if (res.ok) {
      toast.success('Logged in successfully')
      router.push('/')
      router.refresh()
    } else {
      toast.error(res.error)
    }
    console.log(res)
  })

  return (
    <>
      <CardWrapper
        label="Enter your email below to login to your account"
        title="Login"
        backButtonHref="/auth/login"
        backButtonLabel="Don't have an account? Sign up"
      >
        <form onSubmit={onSubmit}>
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
          <div className="mb-4">
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
                }
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full">
              Login
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

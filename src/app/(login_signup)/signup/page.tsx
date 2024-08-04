'use client'

import { useAuth } from '@/_providers/Auth'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Router from 'next/router'
import { useState } from 'react'
import { RegisterOptions, useForm, UseFormRegisterReturn } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter your name.' }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(3, {
    message: 'Password must be at least 8 characters long.',
  }),
})

export default function SignUpForm() {
  const [error, setError] = useState('')
  const [formMessage, setFormMessage] = useState<null | string>(null)
  const { user, setUser } = useAuth()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  async function onSubmit(values) {
    try {
      const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!req.ok) {
        const errorData = await req.json()
        throw new Error(errorData.message || `HTTP error! status: ${req.status}`)
      }

      const data = await req
        .json()
        .then(data => setFormMessage(`${data.message}`))
        .then(() => {
          setTimeout(() => {
            {
              window.location.reload()
            }
          }, 3000)
        })
    } catch (err) {
      console.log('error', err)
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center h-100vh bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>SignUp</CardTitle>
          <CardDescription>Enter your credentials create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        register={function <TFieldName extends string = string>(
                          name: TFieldName,
                          options?: RegisterOptions<any, TFieldName>,
                        ): UseFormRegisterReturn<TFieldName> {
                          throw new Error('Function not implemented.')
                        }}
                        placeholder="Enter your Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                      <Input
                        register={function <TFieldName extends string = string>(
                          name: TFieldName,
                          options?: RegisterOptions<any, TFieldName>,
                        ): UseFormRegisterReturn<TFieldName> {
                          throw new Error('Function not implemented.')
                        }}
                        placeholder={`Enter email.`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        register={function <TFieldName extends string = string>(
                          name: TFieldName,
                          options?: RegisterOptions<any, TFieldName>,
                        ): UseFormRegisterReturn<TFieldName> {
                          throw new Error('Function not implemented.')
                        }}
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {!error && formMessage && <Alert variant="default">{formMessage}</Alert>}
              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline">
              {` Login`}
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

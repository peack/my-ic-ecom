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
import { User } from '@/payload/payload-types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { userAgent } from 'next/server'
import { useState } from 'react'
import { RegisterOptions, useForm, UseFormRegisterReturn } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long.',
  }),
})

export default function MyLogin() {
  const router = useRouter()
  const [error, setError] = useState('')
  const { setUser } = useAuth()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        console.log(`Login successful. response json: ${response}`)
        const data = await response.json().then(data => {
          const user: User = data.user
          console.log(user)
          setUser(user)
        })

        router.push('/home') // Redirect to dashboard on successful login
      } else {
        const data = await response.json()
        setError(data.message || 'Login failed')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center h-100vh bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        register={function <TFieldName extends string = string>(
                          name: TFieldName,
                          options?: RegisterOptions<any, TFieldName>,
                        ): UseFormRegisterReturn<TFieldName> {
                          throw new Error('Function not implemented.')
                        }}
                        placeholder="Enter your email"
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
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

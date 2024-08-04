import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/_components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { Form, RegisterOptions, UseFormRegisterReturn, UseFormReturn } from 'react-hook-form'

interface AuthFormProps {
  form: any
  onSubmit: (data: any) => void
  error?: string
}

export default function AuthForm({ form, onSubmit, error }: AuthFormProps) {
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

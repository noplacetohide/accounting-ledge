"use client"
import React, { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import toast from 'react-hot-toast';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { LogIn, UserPlus } from 'lucide-react'
import api from '@/lib/axios'

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name must not be empty!",
    }),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
}).required();

type AuthFlowProps = {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignUp({ setIsLogin }: AuthFlowProps) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "demouser@gmail.com",
            password: "Pass@User",
        },
    });

    async function onSubmit(formState: z.infer<typeof formSchema>) {
        try {
            setIsButtonDisabled(true)
            const res = await api.post('api/v1/auth/register', formState);
            const { access_token, user } = res.data;
            setCookie('access_token', access_token, {
                maxAge: 60 * 60 * 24,
                path: '/',
            });
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('You are authorized to access!');
            router.push('/');
        } catch (error: any) {
            console.log(error)
            const errorMsg = error?.response?.data?.message || 'Open account attempt failed!';
            toast.error(errorMsg);
        } finally {
            setIsButtonDisabled(false);
        }
    }
    return (
        <div className='h-screen w-screen bg-gray-200 flex justify-center items-center'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Register to unlock infinite possibilities!</CardTitle>
                    <CardDescription>All your financial log in one place!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter name address" {...field} />
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
                                        <FormLabel>Email*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter email address" {...field} />
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
                                        <FormLabel>Password*</FormLabel>
                                        <FormControl>
                                            <Input placeholder="enter password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isButtonDisabled} className={`w-full ${isButtonDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}  mt-2`}> <UserPlus /> Open Account</Button>
                        </form>
                    </Form>
                    <p className='my-4 text-center text-sm font-bold text-gray-600'>OR</p>
                    <Button onClick={() => setIsLogin(true)} className={`w-full cursor-pointer mt-2`}> <LogIn />Login</Button>
                </CardContent>
            </Card>
        </div>
    )
}



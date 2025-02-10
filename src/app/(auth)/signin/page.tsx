"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUser } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { LoginCredentials } from "@/types/auth";
import Image from "next/image";

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const credentials: LoginCredentials = {
      email: data.email,
      password: data.password,
    };

    dispatch(loginUser(credentials))
      .unwrap()
      .then(() => {
        toast.success("Login successful", {
          description: "Welcome back!",
        });
        setTimeout(() => router.push("/"), 1500);
      })
      .catch((err) => {
        toast.error("Login failed", {
          description: (error as string) || (err as string),
        });
      });
  };

  return (
    <>
      <div className="relative hidden h-full flex-col p-10 lg:flex col-span-6 order-2">
        <Image
          src="/images/login.png"
          fill
          alt="Authentication"
          className="h-full w-full object-cover rounded-3xl"
        />
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <h3 className="h3 font-semibold">
              Artificium has been a game-changer for our content creation
              process. <br /> <br />
              The AI-powered tools are incredibly user-friendly and have saved
              us countless hours of work.
            </h3>
            <footer className="body-md font-semibold">
              Lily Patel{" "}
              <span className="flex text-stem-green-500 font-medium">
                CMO at Software House
              </span>
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="px-6 lg:px-12 col-span-6 order-1">
        <div className="flex py-6 md:pb-0">
          <Link href={"/"}>
            <Image
              src="/images/logo.svg"
              alt="Artificium Logo"
              width={32}
              height={32}
            />
          </Link>
        </div>
        <div className="min-h-screen flex flex-col justify-center max-w-md mx-auto space-y-8">
          <div>
            <h2 className="h2 font-light">
              Hello,{" "}
              <span className="font-bold bg-clip-text text-transparent bg-gradient-to-tr from-day-blue-500 from-0% via-blue-300 via-45% to-stem-green-500 to-100%">
                Mikołaj!
              </span>
            </h2>
            <p className="body-xl text-muted-foreground mt-4">
              Log in to Artificium to start creating magic.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Button
              disabled={loading}
              className="w-full flex items-center justify-center"
              variant="tertiary"
            >
              <Icons.google className="h-4 w-4" />
              Sign in with Google
            </Button>

            <Button
              disabled={loading}
              className="w-full flex items-center justify-center"
              variant="tertiary"
            >
              <Icons.apple className="h-4 w-4" />
              Sign in with Apple
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                or continue with e-mail
              </span>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className="sr-only">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Icons.mail className="absolute text-secondary-foreground inset-2.5 h-4 w-4" />
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          {...field}
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={loading}
                          className="pl-9"
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your registered email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password" className="sr-only">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Icons.lock className="absolute text-secondary-foreground inset-2.5 h-4 w-4" />
                        <Input
                          id="password"
                          placeholder="Password"
                          type="password"
                          {...field}
                          autoComplete="current-password"
                          disabled={loading}
                          className="pl-9"
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your account password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    disabled={loading}
                  />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className={
                    "bg-clip-text text-transparent bg-gradient-to-tr from-blue-300 hover:from-blue-300/90 to-stem-green-500 hover:to-stem-green-500/90"
                  }
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full font-semibold"
              >
                {loading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              className={
                "bg-clip-text text-transparent bg-gradient-to-tr from-blue-300 hover:from-blue-300/90 to-stem-green-500 hover:to-stem-green-500/90"
              }
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

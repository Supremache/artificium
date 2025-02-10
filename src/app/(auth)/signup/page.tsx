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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { RegisterCredentials } from "@/types/auth";
import { registerUser } from "@/store/authSlice";
import { Checkbox } from "@/components/ui/checkbox";
import SignUpLayout from "@/components/auth/signup-layout";

const FormSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    lastname: z
      .string()
      .min(2, { message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const credentials: RegisterCredentials = {
      name: data.name,
      lastname: data.lastname,
      password: data.password,
    };

    dispatch(registerUser(credentials))
      .unwrap()
      .then(() => {
        toast.success("Account created successfully", {
          description: "Please sign in with your new account.",
        });
        setTimeout(() => router.push("signup/workspace"), 1500);
      })
      .catch((err) => {
        toast.error("Login failed", {
          description: (error as string) || (err as string),
        });
      });
  };

  return (
    <SignUpLayout
      imageSrc="/images/register1.png"
      imageAlt="Sign up illustration"
      leftColumnClassName="col-span-7"
      rightColumnClassName="col-span-5"
      loginNavigate={true}
    >
      <div className="min-h-screen flex flex-col justify-center max-w-2xl mx-auto space-y-8 px-6">
        <div>
          <h2 className="h2">
            Connect with your team and bring your creative ideas to life.
          </h2>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel htmlFor="name" className="text-noble-black-300">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="name"
                        {...field}
                        autoCapitalize="words"
                        autoComplete="name"
                        autoCorrect="off"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your full name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor="lastname"
                      className="text-noble-black-300"
                    >
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="lastname"
                        placeholder="Last Name"
                        {...field}
                        autoCapitalize="words"
                        autoComplete="name"
                        autoCorrect="off"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter your full name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor="password"
                      className="text-noble-black-300"
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        {...field}
                        autoComplete="list"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Enter a strong password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor="confirmPassword"
                      className="text-noble-black-300"
                    >
                      Repeat Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="confirmPassword"
                        placeholder="Repeat Password"
                        type="password"
                        {...field}
                        autoComplete="list"
                        disabled={loading}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      Confirm your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                      className="mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel
                      htmlFor="agreeToTerms"
                      className="text-sm font-medium text-noble-black-200"
                    >
                      I agree with{" "}
                      <Link
                        href="/terms"
                        className="font-semibold bg-clip-text text-transparent bg-gradient-to-tr from-blue-300 hover:from-blue-300/90 to-stem-green-500 hover:to-stem-green-500/90"
                      >
                        Terms and conditions
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full font-semibold"
            >
              {loading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Creating a free account...
                </>
              ) : (
                "Create free account"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </SignUpLayout>
  );
}

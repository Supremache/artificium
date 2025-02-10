"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import SignUpLayout from "@/components/auth/signup-layout";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  url: z.string().min(6, { message: "Please enter a valid workspace url." }),
});

export default function Workspace() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Joined Workspace", {
        description: "Great! You have joined the workspace successfully!",
      });
      route.push("workspace/access");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";

      toast.error("Join failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpLayout
      imageSrc="/images/register1.png"
      imageAlt="Sign up illustration"
      leftColumnClassName="col-span-7"
      rightColumnClassName="col-span-5"
    >
      <div className="min-h-screen flex flex-col justify-center max-w-2xl mx-auto space-y-8 px-6">
        <div>
          <h2 className="h2">Join or Create a Workspace</h2>
          <p className="body-xl text-muted-foreground">
            Connect with others by joining an existing workspace or create a new
            one to collaborate with your team.
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-12"
          >
            <div className="flex w-full gap-3 items-baseline">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel
                      htmlFor="url"
                      className="sr-only text-noble-black-300"
                    >
                      Your workspace URL
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="url"
                          placeholder="Your workspace URL"
                          {...field}
                          autoCapitalize="words"
                          autoComplete="url"
                          autoCorrect="off"
                          disabled={loading}
                          className="body-lg text-right pr-28"
                        />
                        <span className="body-lg absolute right-2 top-1.5 text-secondary-foreground">
                          .artificium.app
                        </span>
                      </div>
                    </FormControl>
                    <div className="h-6">
                      {" "}
                      {/* Reserve space for error message */}
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="font-semibold"
              >
                {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                  Join workspace
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="body-sm px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant={"tertiary"}
              className="w-full"
            >
              {loading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Creating a new Workspace...
                </>
              ) : (
                "Create new Workspace"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </SignUpLayout>
  );
}

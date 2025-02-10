import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface CustomizableSignUpLayoutProps {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  leftColumnClassName?: string;
  rightColumnClassName?: string;
  loginNavigate?: boolean;
}

export default function SignUpLayout({
  children,
  imageSrc,
  imageAlt,
  leftColumnClassName,
  rightColumnClassName,
  loginNavigate = false,
}: CustomizableSignUpLayoutProps) {
  return (
    <>
      <div className={cn("px-6 lg:px-12 col-span-6", leftColumnClassName)}>
        <div className="flex items-center justify-between py-6 md:pb-0">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              alt="Artificium Logo"
              width={32}
              height={32}
            />
          </Link>

          {loginNavigate && (
            <Link
              href="/auth/signin"
              className="font-semibold bg-clip-text text-transparent bg-gradient-to-tr from-blue-300 hover:from-blue-300/90 to-stem-green-500 hover:to-stem-green-500/90"
            >
              Log In
            </Link>
          )}
        </div>

        {children}

        <footer className="flex items-center justify-between p-9">
          <p className="body-md text-secondary-foreground">
            Artificium.app © {new Date().getFullYear()}
          </p>

          <Link href="/privacy-policy">
            <Button variant={"ghost"} className="font-medium">Privacy Policy</Button>
          </Link>
        </footer>
      </div>
      <div
        className={cn(
          "relative hidden h-full lg:flex col-span-6 rounded-3xl",
          rightColumnClassName
        )}
      >
        <Image
          src={imageSrc || "/placeholder.svg"}
          fill
          alt={imageAlt}
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </>
  );
}

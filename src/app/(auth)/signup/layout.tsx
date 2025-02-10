
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up for Artificium AI | Create AI-Generated Content",
  description: "Join Artificium AI today and transform your content creation with advanced AI tools. Sign up now for a seamless and intuitive experience.",
};


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        {children}
    </>
  );
}

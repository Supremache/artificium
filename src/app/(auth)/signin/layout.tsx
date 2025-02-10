
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login to Artificium AI | AI-Powered Content Creation",
    description: "Access your Artificium AI account and start creating high-quality AI-generated content effortlessly. Secure login with seamless user experience.",
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

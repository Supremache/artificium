
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artificium AI | Login & Sign Up",
  description: "Easily log in or sign up to Artificium AI and unlock powerful AI-driven content creation tools. Secure, fast, and user-friendly authentication for seamless access.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-12">
        {children}
    </div>
  );
}

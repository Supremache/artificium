"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import SignUpLayout from "@/components/auth/signup-layout";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface PersonAvatarProps {
  name: string;
  src: string;
}

const personAvatar: PersonAvatarProps[] = [
  { name: "Marcus Chen", src: "MarcusChen.png" },
  { name: "Lily Patel", src: "LilyPatel.png" },
  { name: "Harper Singh", src: "HarperSingh.png" },
  { name: "David Singh", src: "DavidSingh.png" },
  { name: "Ava Gupta", src: "AvaGupta.png" },
  { name: "Adam Green", src: "AdamGreen.png" },
];

export default function Access() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Access Granted", {
        icon: <Icons.check />,
        description:
          "You have successfully gained access to the workspace. Welcome aboard!",
      });
      route.push("access/verify");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";

      toast.error("Access failed", {
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignUpLayout
      imageSrc="/images/register2.png"
      imageAlt="Sign up illustration"
      leftColumnClassName="col-span-6"
      rightColumnClassName="col-span-6"
    >
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-16 px-6">
        <AvatarGroup className="flex-row">
          {personAvatar.map((person) => (
            <Avatar
              key={person.name}
              className="rounded-xl h-16 w-16 cursor-pointer"
            >
              <AvatarImage
                src={`/images/avatar/person/${person.src}`}
                alt={`Avatar of ${person.name}`}
              />
              <AvatarFallback>
                {person.name
                  .split(" ")
                  .map((word: string) => word[0])
                  .join("")}{" "}
              </AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>

        <div className="max-w-md space-y-6">
          <h3 className="h3 font-medium">
            Sophia, Kamil, Emily and 2,012 others are already here!
          </h3>
          <p className="body-xl text-muted-foreground">
            But... it looks like you don&apos;t have access to this workspace.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <Button
            type="submit"
            size={"lg"}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Access Request...
              </>
            ) : (
              "Access Request"
            )}
          </Button>
          <span className="body-sm text-muted-foreground">Or</span>
          <Button
            variant={"tertiary"}
            size={"lg"}
            className="max-w-min mx-auto"
            onClick={() => route.back()}
          >
            Back
          </Button>
        </div>
      </div>
    </SignUpLayout>
  );
}

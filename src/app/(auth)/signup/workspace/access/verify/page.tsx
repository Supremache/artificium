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

      toast.success("Joined Vertexia workspace", {
        icon: <Icons.check />,
        description:
          "You have successfully joined to the workspace.",
      });

      route.push("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";

      toast.error("Joined failed", {
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
        <div className="w-full flex flex-col items-center justify-center text-center space-y-6 mx-auto">
          <Avatar className="rounded-3xl h-20 w-20 cursor-pointer">
            <AvatarImage
              src={"/images/avatar/Vertexia.png"}
              alt={`Avatar of Vertexia Workspace`}
            />
            <AvatarFallback>VE</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="h2 font-bold">Vertexia</h2>
            <p className="body-xl font-medium text-primary">
              vertexia.artficium.app
            </p>
          </div>
        </div>

        <div>
          <Button
            variant={"ghost"}
            size={"lg"}
            className="max-w-min mx-auto"
            onClick={() => route.back()}
          >
            Change workspace
          </Button>
          <Button
            type="submit"
            size={"lg"}
            disabled={loading}
            onClick={handleSubmit}
          >
            {loading ? (
              <>
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Now"
            )}
          </Button>
        </div>

        <div className="flex items-center gap-6">
          <AvatarGroup className="flex-row">
            {personAvatar.map((person) => (
              <Avatar key={person.name} className="rounded-xl cursor-pointer">
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
          <span className="body-md text-muted-foreground">and 873 others have already joined</span>
        </div>
        
      </div>
    </SignUpLayout>
  );
}

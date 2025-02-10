"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/ui/icons";
import { LibraryDrawer } from "./library-drawer";
import { User } from "@/types/user";

interface LibraryCardProps extends React.ComponentProps<typeof Card> {
  title: string;
  description?: string;
  images?: string[];
  user: User[];
  totalMessages: number;
}

export default function LibraryCard({
  title,
  description,
  images,
  user,
  totalMessages,
  className,
  ...props
}: LibraryCardProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Card
        className={cn("border-none rounded-3xl mb-4 cursor-pointer", className)}
        {...props}
        onClick={() => setOpen(true)}
      >
        <CardHeader>
          <CardTitle className="body-lg font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="body-lg font-medium text-noble-black-300">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        {images && (
          <CardContent className="grid grid-cols-3 gap-2">
          {images.map((img) => (
            <Image
              key={img}
              src={`/images/library/${img}.png`}
              alt="Library Images"
              height={100}
              width={100}
              className="w-full h-full object-contain rounded-2xl"
            />
          ))}
        </CardContent>
        )}
        <Separator className="bg-noble-black-600" />
        <CardFooter>
          <div className="w-full flex items-center justify-between pt-6">
            <AvatarGroup
              max={4}
              classNameAvatar="ring-sidebar ring-[3px] h-8 w-8"
            >
              {user.map((u) => (
                <Avatar
                  key={u.id}
                  className="rounded-xl cursor-pointer h-8 w-8"
                  status={u.status}
                  align="top-right"
                  statusClassName="ring-sidebar bg-sidebar"
                >
                  <AvatarImage
                    src={u.avatar}
                    alt={`Avatar of ${u.name}`}
                  />
                  <AvatarFallback>
                    {u.name
                      .split(" ")
                      .map((word: string) => word[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>

            <div>
              <span className="body-md font-semibold">{totalMessages}</span>
              <Icons.messageSquare className="inline-flex ml-3 h-4 w-4 stroke-[url(#gradient)]" />
              <svg width="0" height="0">
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop stopColor="#82DBF7" offset="0%" />
                  <stop stopColor="#B6F09C" offset="100%" />
                </linearGradient>
              </svg>
            </div>
          </div>
        </CardFooter>
      </Card>

      <LibraryDrawer
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description || ""}
        images={images}
      />
    </>
  );
}

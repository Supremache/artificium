"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageCardProps extends React.ComponentProps<typeof Card> {
  user: User;
  date: string;
  message: string;
  isCurrentUser?: boolean;
}

export default function MessageCard({
  date,
  message,
  user,
  isCurrentUser = false,
  className,
  ...props
}: MessageCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Card
      className={cn(
        "bg-transparent border-noble-black-600 rounded-2xl mb-4",
        {
          "bg-card border-none": isCurrentUser, 
        },
        className
      )}
      {...props}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4 rounded-xl">
          <Avatar className="h-10 w-10 rounded-2xl" status={user.status}>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((word: string) => word[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 ">
            <div className="flex items-center gap-2">
              <span className="body-lg font-semibold">{user.name}</span>
              <span className="body-sm font-medium text-noble-black-400 flex-grow">
                {date}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant={"ghost"} onClick={handleCopy}>
                      {copied ? <Icons.check className="h-4 w-4" /> : <Icons.copy className="h-4 w-4" /> }
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="mt-4 body-md text-noble-black-300">{message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useState, useEffect } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Icons } from "../ui/icons";
import { Badge } from "../ui/badge";
import { DialogDescription, DialogTitle } from "../ui/dialog";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export function Search() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div
        className="w-full h-12 mx-auto flex items-center gap-3 justify-between"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-3">
          <Icons.search className="h-4 w-4 text-noble-black-400" />
          Search
        </div>
        <Badge onClick={() => setOpen(true)}>
          <span className="text-xs">⌘</span>K
        </Badge>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search Command..</DialogTitle>
        <DialogDescription className="sr-only">
          AI powered search to find commands quickly.
        </DialogDescription>

        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Projects">
            <CommandItem
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "w-full flex justify-start"
              )}
            >
              <Icons.square className="mr-2 h-4 w-4 text-primary" />
              <span>Orbital Oddysey</span>
            </CommandItem>
            <CommandItem
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "w-full flex justify-start mt-2"
              )}
            >
              <Icons.triangle className="mr-2 h-4 w-4 text-red-power-600" />
              <span>Digital Product Launch</span>
            </CommandItem>
            <CommandItem
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "w-full flex justify-start mt-2"
              )}
            >
              <Icons.square className="mr-2 h-4 w-4 text-happy-orange-600" />
              <span>Brand Refresh</span>
            </CommandItem>
            <CommandItem
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "w-full flex justify-start mt-2"
              )}
            >
              <Icons.octagon className="mr-2 h-4 w-4 text-heisenberg-blue-500" />
              <span>Social Media Strategy</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="General">
            <CommandItem
              className={cn(
                buttonVariants({ variant: "tertiary", size: "lg" }),
                "w-full flex justify-start"
              )}
            >
              <Icons.user />
              <span>Profile</span>
              <CommandShortcut>
                <Badge>
                  <span className="text-xs">⌘</span>P
                </Badge>
              </CommandShortcut>
            </CommandItem>
            <CommandItem
              className={cn(
                buttonVariants({ variant: "tertiary", size: "lg" }),
                "w-full flex justify-start mt-2"
              )}
            >
              <Icons.billing />
              <span>Billing</span>
              <CommandShortcut>
                <Badge>
                  <span className="text-xs">⌘</span>B
                </Badge>
              </CommandShortcut>
            </CommandItem>
            <CommandItem
              className={cn(
                buttonVariants({ variant: "tertiary", size: "lg" }),
                "w-full flex justify-start mt-2"
              )}
            >
              <Icons.settings />
              <span>Settings</span>
              <CommandShortcut>
                <Badge>
                  <span className="text-xs">⌘</span>S
                </Badge>
              </CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

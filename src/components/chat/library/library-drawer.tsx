"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Icons } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LibraryDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  images?: string[];
}

export function LibraryDrawer({
  open,
  onOpenChange,
  title,
  description,
  images,
}: LibraryDrawerProps) {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={cn(
          " p-0 border-none rounded-l-2xl shadow-inner shadow-noble-black-500/50",
          isFullscreen ? "w-screen !max-w-full" : "max-w-sm sm:max-w-screen-sm"
        )}
      >
        <div className="absolute right-16 top-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Icons.fullScreen className="h-5 w-5" />
            <span className="sr-only">Toggle fullscreen</span>
          </Button>
        </div>
        <SheetHeader className="p-6">
          <SheetTitle className="h5 font-semibold">{title}</SheetTitle>
          <SheetDescription className="body-lg text-noble-black-300">
            {description}
          </SheetDescription>
        </SheetHeader>
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b border-noble-black-500 bg-transparent h-16 p-6">
            <TabsTrigger
              value="chat"
              className="body-md py-5 text-noble-black-300 hover:text-noble-black-200 active:text-noble-black-100 font-semibold border-b-4 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary whitespace-nowrap group"
            >
              <Icons.message className="mr-2 h-5 w-5 text-current group-data-[state=active]:text-primary group-data-[state=active]:drop-shadow-[0_6px_6px] group-data-[state=active]:drop-shadow-primary" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger
              value="images"
              className="body-md py-5 text-noble-black-300 hover:text-noble-black-200 active:text-noble-black-100 font-semibold border-b-4 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary whitespace-nowrap group"
            >
              <Icons.media className="mr-2 h-5 w-5 text-current group-data-[state=active]:text-primary group-data-[state=active]:drop-shadow-[0_6px_6px] group-data-[state=active]:drop-shadow-primary" />
              <span>Images</span>
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="body-md py-5 text-noble-black-300 hover:text-noble-black-200 active:text-noble-black-100 font-semibold border-b-4 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary whitespace-nowrap group"
            >
              <Icons.messageSquare className="mr-2 h-5 w-5 text-current group-data-[state=active]:text-primary group-data-[state=active]:drop-shadow-[0_6px_6px] group-data-[state=active]:drop-shadow-primary" />
              <span>Comments</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images">
            <ScrollArea className="h-screen p-6">
              <div className="space-y-6">
                {images?.map((img, index) => (
                  <div key={index} className="relative">
                    <div className="body-lg text-noble-black-300 mb-4">
                      {index === 0
                        ? "12 April"
                        : index === 2
                        ? "3 April"
                        : "2 April"}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((subIndex) => (
                        <Image
                          key={`${img}-${subIndex}`}
                          src={`/images/library/${img}.png`}
                          alt={`Library image ${index + 1}`}
                          width={100}
                          height={100}
                          className="rounded-lg object-contain w-full h-full"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="chat">
            <ScrollArea className="h-screen p-6">
              <div className="p-6 body-lg text-noble-black-300">
                Chat content here
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="comments">
            <ScrollArea className="h-screen p-6">
              <div className="p-6 body-lg text-noble-black-300">
                Comments content here
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

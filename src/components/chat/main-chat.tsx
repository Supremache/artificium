"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useSelector } from "react-redux";
import { selectUsers } from "@/store/usersSlice";
import ChatContant from "./chat/chat-contant";
import LibraryContant from "./chat/library-contant";
import ArtificiumContant from "./chat/artificium-contant";
import ManageViewer from "./chat/manage-viewer";

export function MainChat() {
  const users = useSelector(selectUsers);

  return (
    <div className="relative flex flex-1 flex-col p-3 md:pl-6">
      <Tabs defaultValue="artificium" className="flex-grow">
        <header className="gap-2 bg-sidebar rounded-2xl space-y-6 px-6 pt-6">
          <div className="flex items-start flex-wrap  gap-2">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-grow">
              <h6 className="h6">Orbital Oddysey</h6>
              <p className="body-m text-muted-foreground">
                Marketing Campaign for a new TV series Launch
              </p>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
              <AvatarGroup max={4} classNameAvatar="ring-sidebar ring-4">
                {users.map((user) => (
                  <Avatar
                    key={user.id}
                    className="rounded-xl cursor-pointer"
                    status={user.status}
                    align="top-right"
                    statusClassName="ring-sidebar bg-sidebar"
                  >
                    <AvatarImage
                      src={user.avatar}
                      alt={`Avatar of ${user.name}`}
                    />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((word: string) => word[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>

              <Button variant={"ghost"}>
                <Icons.share className="h-4 w-4" />
                Share
              </Button>
              {/* Manage Projects Dialog */}
              <ManageViewer users={users} />
            </div>
          </div>

          <Separator />

          <TabsList className="max-w-sm w-full h-full grid grid-cols-3 items-center text-center bg-transparent">
            <TabsTrigger
              value="artificium"
              className="m-0 pb-6 body-md text-noble-black-300 hover:text-noble-black-200 active:text-noble-black-100 font-semibold border-b-4 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary whitespace-nowrap group"
            >
              <Icons.artificium className="mr-2 h-5 w-5 text-current group-data-[state=active]:text-primary group-data-[state=active]:drop-shadow-[0_6px_6px] group-data-[state=active]:drop-shadow-primary" />
              <span>Artificium</span>
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="m-0 pb-6 body-md text-noble-black-300 hover:text-noble-black-200 active:text-noble-black-100 font-semibold border-b-4 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary whitespace-nowrap group"
            >
              <Icons.message className="mr-2 h-5 w-5 text-current group-data-[state=active]:text-primary group-data-[state=active]:drop-shadow-[0_6px_6px] group-data-[state=active]:drop-shadow-primary" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger
              value="library"
              className="m-0 pb-6 body-md text-noble-black-300 hover:text-noble-black-200 active:text-noble-black-100 font-semibold border-b-4 border-transparent rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary whitespace-nowrap group"
            >
              <Icons.folder className="mr-2 h-5 w-5 text-current group-data-[state=active]:text-primary group-data-[state=active]:drop-shadow-[0_6px_6px] group-data-[state=active]:drop-shadow-primary" />
              <span>Library</span>
            </TabsTrigger>
          </TabsList>
        </header>

        <main className="flex-1">
          <TabsContent value="artificium">
            <ArtificiumContant />
          </TabsContent>
          <TabsContent value="chat">
            <ChatContant users={users} />
          </TabsContent>
          <TabsContent value="library">
            <LibraryContant users={users} />
          </TabsContent>
        </main>
      </Tabs>
    </div>
  );
}

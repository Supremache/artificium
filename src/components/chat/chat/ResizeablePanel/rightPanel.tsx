import React from "react";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import { Globe, LockKeyhole } from "lucide-react";

interface ChannelGroup {
  title: string;
  icon?: React.ReactNode;
  items: {
    title: string;
    icon?: React.ComponentType;
    subItems?: string[];
  }[];
}

const channelGroups: ChannelGroup[] = [
  {
    title: "Information",
    items: [{ title: "Empty..", icon: Globe }],
  },
  {
    title: "Public Channels",
    items: [
      { title: "Top Secret", icon: LockKeyhole },
      { title: "Feedback", icon: Globe },
      {
        title: "Spaceship Crew",
        icon: Globe,
        subItems: ["Adam Green", "David Singh", "Harper Singh", "Lily Patel"],
      },
      { title: "User interface", icon: Globe },
      { title: "User experience", icon: Globe },
    ],
  },
  {
    title: "Private Channels",
    items: [{ title: "Empty..", icon: Globe }],
  },
];

export default function RightPanel({ users }: { users: User[] }) {
  const filterOnlineMembers = users.filter((m) => m.status !== "offline");
  const filterOfflineMembers = users.filter((m) => m.status === "offline");
  return (
    <Tabs
      defaultValue="members"
      className="flex h-full min-h-[calc(100vh-210px)] flex-col px-4"
    >
      <TabsContent value="members" className="flex-1 px-4">
        <div className="flex items-center justify-between w-full py-4 body-sm text-noble-black-400">
          <span>Currently Online</span>
          <span>{filterOnlineMembers.length}</span>
        </div>
        <ScrollArea className="h-[275px]">
          <div className="space-y-6">
            {filterOnlineMembers.map((member) => (
              <div key={member.id} className="w-full flex items-center gap-4">
                <Avatar
                  className="h-12 w-12 rounded-2xl"
                  status={member.status}
                >
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((word: string) => word[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center">
                  <span className="body-lg">{member.name}</span>
                  <span className="body-sm text-noble-black-300">
                    {member.status === "online" && (
                      <span className="body-sm ">
                        Exploring{" "}
                        <span className="text-day-blue-500 font-semibold">
                          {member.activity}
                        </span>{" "}
                      </span>
                    )}
                    {member.status === "away" && (
                      <span className="body-sm text-noble-black-30">
                        <span className="text-happy-orange-600 font-semibold">
                          Away
                        </span>{" "}
                        for {member.activity} minutes
                      </span>
                    )}
                    {member.status === "disturb" && (
                      <span className="body-sm text-red-power-600">
                        Do not disturb
                      </span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center justify-between w-full py-4 body-sm text-noble-black-400">
          <span>Offline</span>
          <span>{filterOfflineMembers.length}</span>
        </div>

        <ScrollArea className="h-[350px] w-full mx-auto mask-fade-bottom">
          <div className="space-y-6">
            {filterOfflineMembers.map((member) => (
              <div
                key={member.id}
                className="w-full flex items-end gap-4 opacity-50"
              >
                <Avatar
                  className="h-12 w-12 rounded-2xl"
                  status={member.status}
                >
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((word: string) => word[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start justify-center">
                  <span className="body-lg">{member.name}</span>
                  <span className="body-sm text-noble-black-300">
                    Last visit: {member.activity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="chats" className="flex-1">
        <Accordion type="multiple" className="w-full">
          {channelGroups.map((group, index) => (
            <AccordionItem
              key={index}
              value={group.title}
              className={cn(
                "border-noble-black-600 py-3",
                index === channelGroups.length - 1 ? "border-none" : "border-b"
              )}
            >
              <AccordionTrigger className="body-md font-semibold justify-start px-4">
                {group.title}
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <div className="w-full flex flex-col gap-6">
                  {group.items.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={item.title}
                      className={cn(
                        "relative border-none",
                        item.subItems?.length &&
                          "rounded-2xl before:hidden data-[state=open]:before:block before:content-[''] before:absolute before:inset-0 before:border before:border-noble-black-600 before:rounded-2xl before:pointer-events-none"
                      )}
                    >
                      <AccordionTrigger
                        icon={item.icon}
                        className="[&[data-state=open]>svg]:rotate-0 py-2 px-4 justify-start body-md font-semibold"
                      >
                        <span className="flex flex-grow">{item.title}</span>
                        {item.subItems?.length && (
                          <Badge className="rounded-xl border-none text-primary hover:text-primary active:text-primary h-8 w-8 justify-center shadow-inner shadow-stem-green-500/5 bg-gradient-to-tr from-stem-green-500/30 via-stem-green-200/10  to-transparent">
                            {item.subItems?.length}
                          </Badge>
                        )}
                      </AccordionTrigger>

                      {item.subItems && (
                        <AccordionContent className="relative px-4">
                          <div className="absolute left-6 top-0 h-[calc(100%-32px)] w-[2px] bg-noble-black-500" />
                          <ScrollArea className="h-40">
                            {item.subItems.map((member, idm) => (
                              <div key={idm} className="relative space-y-2">
                                <div className="absolute left-2 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-noble-black-500" />
                                <div className="relative pl-8 flex items-center gap-4">
                                  <Avatar
                                    className="h-8 w-8 rounded-xl"
                                    status={
                                      idm < (item.subItems?.length || 0) / 2
                                        ? "online"
                                        : "away"
                                    }
                                  >
                                    <AvatarImage
                                      src={`/images/avatar/person/${member.replace(
                                        /\s/g,
                                        ""
                                      )}.png`}
                                      alt={member}
                                    />
                                    <AvatarFallback>{member[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="body-md font-semibold text-noble-black-300">
                                    {member}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </ScrollArea>
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>
      <TabsList className="mt-auto h-12 w-full p-0 border-2 border-noble-black-600 rounded-xl">
        <TabsTrigger
          value="chats"
          className="w-full h-full body-lg font-semibold gap-3 rounded-xl group"
        >
          <Icons.messageSquare className="h-6 w-6 group-data-[state=active]:text-stem-green-500 group-data-[state=active]:drop-shadow-[0_0_6px] group-data-[state=active]:drop-shadow-stem-green-500" />
          Chats
        </TabsTrigger>
        <TabsTrigger
          value="members"
          className="w-full h-full body-lg font-semibold gap-3 rounded-xl group"
        >
          Members{" "}
          <Icons.users className="h-6 w-6 group-data-[state=active]:text-stem-green-500 group-data-[state=active]:drop-shadow-[0_0_6px] group-data-[state=active]:drop-shadow-stem-green-500" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

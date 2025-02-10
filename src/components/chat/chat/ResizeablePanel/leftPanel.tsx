import React, { useRef} from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatForm } from "@/components/chat/chat-form";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { User } from "@/types/user";
import MessageCard from "../massageCard";
import { useAppSelector } from "@/hooks/redux";

export default function LeftPanel({ users }: { users: User[] }) {
  const messages = useAppSelector((state) => state.chat.community.messages);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={5} className="flex justify-between p-6">
        <div className="flex items-center gap-4">
          <h6 className="h6 font-bold">Spaceship Crew</h6>
          <Badge className="rounded-xl border-none text-primary hover:text-primary active:text-primary h-8 w-8 justify-center shadow-inner shadow-stem-green-500/5 bg-gradient-to-tr from-stem-green-500/30 via-stem-green-200/10 to-transparent">
            4
          </Badge>
        </div>
        <div className="flex items-center gap-4">
          <Button variant={"ghost"} size={"icon"}>
            <Icons.star className="h-6 w-6" />
          </Button>
          <Button variant={"ghost"} size={"icon"}>
            <Icons.ellipsisVertical className="h-6 w-6" />
          </Button>
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={95}>
        {/* Content */}
        <div className="flex h-full flex-col">
          <ScrollArea
            className="h-screen mask-fade-top px-4 py-6 scroll-area-wrapper"
            ref={scrollAreaRef}
          >
            <div className="scroll-area-content">
              <div className="messages-container">
                {messages.map((msg, index) => (
                  <MessageCard
                    key={index}
                    user={users[Number(msg.userId)]}
                    date={new Date(msg.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    message={msg.prompt}
                    isCurrentUser={users[Number(msg.userId)] === users[5]}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </ScrollArea>

          {/* ChatForm */}
          <ChatForm className="mt-auto p-4" chatType={"community"} userId={"5"} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

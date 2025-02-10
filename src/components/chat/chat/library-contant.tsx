import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import LibraryCard from "../library/library-card";
import { User } from "@/types/user";

export default function LibraryContant({ users }: { users: User[] }) {
  const libraryData = [
    {
      section: "Images",
      cards: [
        {
          title: "Captain Drake",
          description:
            "Natural born leader with years of experience in space exploration.",
          images: ["1", "2", "3"],
          user: users.slice(3, 14),
          totalMessages: 12,
        },
        {
          title: "Cosmic Voyager",
          description:
            "Main spacecraft used by the crew in the story. It is a highly advanced vessel designed to withstand the harsh conditions of space and capable of traveling vast distances at incredible speeds.",
          images: ["4", "5", "6"],
          user: users.slice(0, 2),
          totalMessages: 27,
        },
      ],
    },
    {
      section: "Documents",
      cards: [
        {
          title: "Character bios",
          description: "3 documents, 43832 words",
          user: users.slice(5, 11),
          totalMessages: 0,
        },
        {
          title: "Plot outline",
          description: "1 document, 18745 words",
          user: users.slice(3, 11),
          totalMessages: 0,
        },
        {
          title: "Scene descriptions",
          description: "5 documents, 23992 words",
          user: users.slice(2, 9),
          totalMessages: 0,
        },
        {
          title: "Dialogue snippets",
          description: "2 documents, 10384 words",
          user: users,
          totalMessages: 0,
        },
      ],
    },
    {
      section: "Ideas",
      cards: [
        {
          title: "Concept art for potential new characters or locations.",
          user: users.slice(1, 6),
          totalMessages: 0,
        },
        {
          title: "A list of potential plot points or story arcs.",
          user: users,
          totalMessages: 0,
        },
        {
          title: "Ideas for potential spin-offs or other related media.",
          user: users.slice(2, 11),
          totalMessages: 0,
        },
        {
          title:
            "Potential partnerships or collaborations with other artists or creators.",
          user: users.slice(6, 14),
          totalMessages: 0,
        },
      ],
    },
  ];

  return (
    <ResizablePanelGroup
      direction={"horizontal"}
      className="min-h-lvh w-full gap-4"
    >
      {libraryData.map((sectionData, index) => (
        <React.Fragment key={sectionData.section}>
          <ResizablePanel defaultSize={32}>
            <div className="flex items-center justify-between p-4 lg:p-6">
              <h6 className="h6 font-semibold">{sectionData.section}</h6>
              <Button variant={"ghost"} size={"icon"}>
                <Icons.ellipsisVertical className="h-6 w-6 lg:h-8 lg:w-6" />
              </Button>
            </div>

            <ScrollArea className="h-screen">
                {sectionData.cards.map((card, cardIndex) => (
                  <figure key={cardIndex} className="shrink-0">
                    <LibraryCard
                      title={card.title}
                      description={
                        "description" in card ? card.description : ""
                      }
                      images={"images" in card ? card.images : undefined}
                      user={card.user}
                      totalMessages={card.totalMessages}  
                    />
                  </figure>
                ))}
            </ScrollArea>
          </ResizablePanel>
          {index < libraryData.length - 1 && (
            <ResizableHandle className="bg-noble-black-600" withHandle/>
          )}
        </React.Fragment>
      ))}
      <ResizablePanel
        defaultSize={4}
        className={"py-6 px-2"}
      >
        <Button
          variant={"tertiary"}
          className="w-full h-full flex items-center justify-center rounded-xl"
        >
          <Icons.add className="h-5 w-5" />
        </Button>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import React from "react";
import { ChatForm } from "../chat-form";

type Package = {
  icon: JSX.Element | string;
  title: string;
  items: string[];
};

const packages: Package[] = [
  {
    icon: (
      <Icons.message className="h-6 w-6  text-primary drop-shadow-[0_0_6px] drop-shadow-primary" />
    ),
    title: "Creative Assets",
    items: [
      "UI wireframe",
      "Brochure design",
      "Social media",
      "Brand guidelines",
    ],
  },
  {
    icon: (
      <Icons.code className="h-6 w-6   text-heisenberg-blue-500 drop-shadow-[0_0_6px] drop-shadow-heisenberg-blue-500" />
    ),
    title: "Developer Tools",
    items: [
      "API Integration",
      "Test automation",
      "DB optimization",
      "Code review",
    ],
  },
  {
    icon: (
      <Icons.pencil className="h-6 w-6   text-purple-blue-300 drop-shadow-[0_0_6px] drop-shadow-purple-blue-300" />
    ),
    title: "Content Creation",
    items: [
      "Product description",
      "E-mail copy",
      "Whitepaper",
      "Press release",
    ],
  },
  {
    icon: (
      <Icons.blub className="h-6 w-6 text-sunglow-500 drop-shadow-[0_0_12px] drop-shadow-sunglow-500" />
    ),
    title: "Idea Generation",
    items: [
      "Hashtag ideas",
      "Brainstorming",
      "Trend analysis",
      "Social media posts",
    ],
  },
];
export default function ArtificiumContant() {
  // const messages = useAppSelector((state) => state.chat.artificium.messages);

  return (
    <div className="flex flex-col min-h-[calc(100vh-212px)] ">
      <div className="my-auto flex flex-col items-center justify-center gap-16 py-16">
        <div className="text-center">
          <h4 className="h4 font-bold">Innovation Starter Pack</h4>
          <p className="body-md text-noble-black-300 mt-4">
            Kickstart your innovation process with our comprehensive selection
            of predefined prompts.
          </p>
        </div>
        <div className="flex items-center flex-wrap justify-center gap-16">
          {packages.map((p, index) => (
            <div key={index} className="space-y-8">
              <div className="flex flex-col items-center gap-4">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full h-12 w-12 cursor-auto"
                >
                  {p.icon}
                </Button>
                <span className="body-xl">{p.title}</span>
              </div>
              <div className="flex flex-col gap-2">
                {p.items.map((item, idx) => (
                  <Button
                    key={idx}
                    variant="secondary"
                    size="lg"
                    className="h-12 px-4"
                  >
                    {item}
                    <Icons.arrowRight className="ml-auto h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <ChatForm chatType={"artificium"} />
      </div>
    </div>
  );
}

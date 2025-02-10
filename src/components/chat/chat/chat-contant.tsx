import React from "react";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { User } from "@/types/user";
import RightPanel from "./ResizeablePanel/rightPanel";
import LeftPanel from "./ResizeablePanel/leftPanel";


export default function ChatContant({ users }: { users: User[] }) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel defaultSize={70}>
        <LeftPanel users={users}/>
      </ResizablePanel>
      <ResizablePanel defaultSize={30}>
        <RightPanel users={users}/>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

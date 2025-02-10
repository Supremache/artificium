import { MainChat } from "@/components/chat/main-chat";
import { ChatSidebar } from "@/components/chat/chat-sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";


export default function Home() {
  return (
    <SidebarProvider>
      <ChatSidebar />
      <SidebarInset>
        <MainChat />
      </SidebarInset>
    </SidebarProvider>
  );
}

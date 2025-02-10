import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";
import React, { useState } from "react";
import { CollaborationModal } from "../collaboration-modal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/user";

export default function ManageViewer({ users }: { users: User[] }) {
  const [workspaceURL] = useState("digital-product-launch.artificium.app");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(workspaceURL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="tertiary" size={"icon"}>
          <Icons.penline className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl sm:max-w-screen-sm border-0 border-t border-noble-black-500 bg-gradient-to-b from-0% from-noble-black-500/30 to-10% to-transparent">
        <DialogHeader>
          <DialogTitle className="h5">
            Manage who can view this project
          </DialogTitle>
          <DialogDescription className="body-lg text-muted-foreground">
            Select which users can access and view this project. Only users with
            access can view and edit the project.
          </DialogDescription>
        </DialogHeader>
        <CollaborationModal users={users} />
        <DialogFooter>
          <div className="w-full bg-noble-black-700 rounded-xl flex items-center justify-start">
            <Collapsible className="w-full p-6">
              <div className="flex items-center flex-grow ">
                <div className="flex items-center gap-2">
                  <Icons.globe className="h-6 w-6 text-primary" />
                  <span className="body-lg text-noble-black-100">
                    Anyone with the link
                  </span>
                </div>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="body-lg border-none bg-transparent"
                  >
                    can view
                    <Icons.chevronDown className="h-3 w-3" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="py-2">
                <div className="rounded-lg border px-4 py-2 body-sm text-noble-black-400 bg-noble-black-600">
                  {workspaceURL}
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Separator orientation="vertical" className="bg-noble-black-600" />
            <Button
              variant="secondary"
              size="sm"
              className="rounded-xl mx-4"
              onClick={handleCopy}
            >
              <Icons.link className="h-4 w-4" />
              {copied ? "Copied" : "Copy Link"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

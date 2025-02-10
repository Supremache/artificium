"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "../ui/icons";
import { cn } from "@/lib/utils";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectList,
  MultiSelectTrigger,
  MultiSelectValue,
} from "../ui/multi-select";
import { User } from "@/types/user";

export function CollaborationModal({ users }: { users: User[] }) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
  const [showAllUsers, setShowAllUsers] = useState(false);

  // Filter out invited users from the available users list
  const availableUsers = users.filter(
    (user) => !invitedUsers.some((invited) => invited.name === user.name)
  );

  const handleInvite = () => {
    const newInvitedUsers = users.filter((user) =>
      selectedUsers.includes(user.name)
    );
    setInvitedUsers([...invitedUsers, ...newInvitedUsers]);
    setSelectedUsers([]);
  };

  // Display either 4 users or all users based on showAllUsers state
  const displayedUsers = showAllUsers ? invitedUsers : invitedUsers.slice(0, 4);
  const hiddenUsersCount = invitedUsers.length - displayedUsers.length;

  return (
    <div className="space-y-4 flex-1 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <MultiSelect value={selectedUsers} onValueChange={setSelectedUsers}>
          <MultiSelectTrigger className="body-lg text-primary">
            <MultiSelectValue
              placeholder="Name"
              maxDisplay={3}
              maxItemLength={5}
            />
            <span className="ml-auto">can edit</span>
          </MultiSelectTrigger>

          <MultiSelectContent className="rounded-3xl" asChild>
            <MultiSelectList>
              <MultiSelectGroup heading="Users">
                <ScrollArea className="h-64">
                  {availableUsers.map((user) => (
                    <MultiSelectItem
                      key={user.id}
                      value={user.name}
                      className="py-3"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="rounded-2xl h-12 w-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="rounded-2xl">
                            {user.name
                              .split(" ")
                              .map((word: string) => word[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="body-lg">{user.name}</span>
                          <span className="body-sm text-primary">
                            @{user.name.toLowerCase().replace(/\s/g, "")}
                          </span>
                        </div>
                      </div>
                    </MultiSelectItem>
                  ))}
                </ScrollArea>
              </MultiSelectGroup>
            </MultiSelectList>
          </MultiSelectContent>
        </MultiSelect>

        <Button
          size="lg"
          className="px-6 h-11"
          onClick={handleInvite}
          disabled={selectedUsers.length === 0}
        >
          Invite
          <Icons.send className="h-4 w-4" />
        </Button>
      </div>

      {/* User List */}
      <ScrollArea className="h-72 rounded-md">
        <div className="space-y-3 pr-4">
          {displayedUsers.map((user) => (
            <div
              key={user.name.toLowerCase().replace(/\s/g, "")}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-12 w-12 rounded-2xl">
                  <AvatarImage
                    src={`/images/avatar/person/${user.name.replace(
                      /\s/g,
                      ""
                    )}.png`}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="body-lg font-semibold">{user.name}</div>
                  <div className="body-sm font-medium text-primary">
                    @{user.name.toLowerCase().replace(/\s/g, "")}
                  </div>
                </div>
              </div>
              <Badge
                className={cn(
                  "py-2 px-4 rounded-xl",
                  getRoleBadgeColor(user.role)
                )}
              >
                {user.role}
              </Badge>
            </div>
          ))}
          {hiddenUsersCount > 0 && (
            <Button
              variant="ghost"
              onClick={() => setShowAllUsers(!showAllUsers)}
            >
              <Icons.addCircle className="h-4 w-4" />
              {showAllUsers
                ? "Show Less"
                : `and ${hiddenUsersCount} more others`}
            </Button>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function getRoleBadgeColor(role: string): string {
  switch (role) {
    case "Owner":
      return "text-primary hover:text-primary active:text-primary";
    case "Editor":
      return "text-heisenberg-blue-500 hover:text-heisenberg-blue-500 active:text-heisenberg-blue-500";
    case "Viewer":
      return "text-day-blue-300 hover:text-day-blue-300 active:text-day-blue-300";
    default:
      return "";
  }
}

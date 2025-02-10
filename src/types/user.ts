export interface User {
    id: string;
    name: string;
    avatar: string;
    status: "online" | "offline" | "away" | "disturb";
    activity?: string;
    role: "Viewer" | "Editor" | "Owner";
  }
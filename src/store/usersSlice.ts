import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/user';

const initialState: User[] = [
  {
    id: "1",
    name: "Adam Green",
    avatar: "/images/avatar/person/AdamGreen.png",
    status: "online",
    activity: "Library",
    role: "Editor"
  },
  {
    id: "2",
    name: "Andrew Garcia",
    avatar: "/images/avatar/person/AndrewGarcia.png",
    status: "online",
    activity: "Library",
    role: "Editor"
  },
  {
    id: "3",
    name: "Ava Gupta",
    avatar: "/images/avatar/person/AvaGupta.png",
    status: "online",
    activity: "Chat",
    role: "Viewer"
  },
  {
    id: "4",
    name: "Benjamin Kim",
    avatar: "/images/avatar/person/BenjaminKim.png",
    status: "away",
    activity: "20",
    role: "Owner"
  },
  {
    id: "5",
    name: "David Singh",
    avatar: "/images/avatar/person/DavidSingh.png",
    status: "offline",
    activity: "14 hours ago",
    role: "Owner"
  },
  {
    id: "6",
    name: "Emily Liu",
    avatar: "/images/avatar/person/EmilyLiu.png",
    status: "disturb",
    role: "Editor"
  },
  {
    id: "7",
    name: "Isabella Chen",
    avatar: "/images/avatar/person/IsabellaChen.png",
    status: "online",
    activity: "Artificium",
    role: "Viewer"
  },
  {
    id: "8",
    name: "Lily Patel",
    avatar: "/images/avatar/person/LilyPatel.png",
    status: "online",
    activity: "Artificium",
    role: "Editor"
  },
  {
    id: "9",
    name: "Lucas Ortiz",
    avatar: "/images/avatar/person/LucasOrtiz.png",
    status: "offline",
    activity: "17 hours ago",
    role: "Owner"
  },
  {
    id: "10",
    name: "Marcus Chen",
    avatar: "/images/avatar/person/MarcusChen.png",
    status: "offline",
    activity: "3 hours ago",
    role: "Owner"
  },
  {
    id: "11",
    name: "Mia Park",
    avatar: "/images/avatar/person/MiaPark.png",
    status: "offline",
    activity: "6 days ago",
    role: "Editor"
  },
  {
    id: "12",
    name: "Olivia Sharma",
    avatar: "/images/avatar/person/OliviaSharma.png",
    status: "offline",
    activity: "2 months ago",
    role: "Viewer"
  },
  {
    id: "13",
    name: "Ryan Lee",
    avatar: "/images/avatar/person/RyanLee.png",
    status: "disturb",
    role: "Owner"
  },
  {
    id: "14",
    name: "Sophia Zhang",
    avatar: "/images/avatar/person/SophiaZhang.png",
    status: "away",
    activity: "7",
    role: "Viewer"
  },
  {
    id: "15",
    name: "Tyler Patel",
    avatar: "/images/avatar/person/TylerPatel.png",
    status: "offline",
    activity: "30 minutes",
    role: "Owner"
  },
];

// Create the slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Action to add a new user
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    // Action to update an existing user
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // Action to remove a user by id
    removeUser: (state, action: PayloadAction<string>) => {
      return state.filter(user => user.id !== action.payload);
    },
  },
});

// Export the actions
export const { addUser, updateUser, removeUser } = usersSlice.actions;

// Export the reducer
export default usersSlice.reducer;

// Selector to access the users state
export const selectUsers = (state: { users: User[] }) => state.users;
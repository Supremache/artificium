import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type ChatType = "artificium" | "community";

interface ChatMessage {
  id: string;
  prompt: string;
  response?: string;
  createdAt: number;
  status: "idle" | "loading" | "success" | "error";
  userId: string;
}

interface ChatState {
  artificium: {
    messages: ChatMessage[];
  };
  community: {
    messages: ChatMessage[];
  };
}

const initialState: ChatState = {
  artificium: {
    messages: [],
  },
  community: {
    messages: [
      {
        id: "1",
        prompt:
          "Agreed. In the meantime, let's keep pushing forward with this episode. I think it's going to be a real crowd-pleaser.",
        createdAt: Date.now(),
        status: "success",
        userId: "1",
      },
      {
        id: "2",
        prompt:
          "Hey guys, I was thinking about some character ideas for our show. What do you think we should focus on?",
        createdAt: Date.now(),
        status: "success",
        userId: "2",
      },
      {
        id: "3",
        prompt:
          "Well, we definitely need a strong leader character who can command the crew and make tough decisions. @Artificium, can you help?",
        createdAt: Date.now(),
        status: "success",
        userId: "3",
      },
    ],
  },
};

export const sendAIPrompt = createAsyncThunk(
  "chat/sendAIPrompt",
  async (
    { prompt, userId }: { prompt: string; userId: string },
    { dispatch }
  ) => {
    const messageId = Date.now().toString();

    dispatch(
      addMessage({
        chatType: "artificium",
        message: {
          id: messageId,
          prompt,
          response: "",
          createdAt: Date.now(),
          status: "loading",
          userId,
        },
      })
    );

    try {
      const response = await new Promise<string>((resolve) => {
        setTimeout(() => resolve(`AI response to: ${prompt}`), 2000);
      });

      return { messageId, response };
    } catch (error) {
      throw error;
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (
      state,
      action: PayloadAction<{
        chatType: ChatType;
        message: ChatMessage;
      }>
    ) => {
      const { chatType, message } = action.payload;
      state[chatType].messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendAIPrompt.pending, (state, action) => {
        const message = state.artificium.messages.find(
          (m) => m.id === action.meta.requestId
        );
        if (message) message.status = "loading";
      })
      .addCase(sendAIPrompt.fulfilled, (state, action) => {
        const message = state.artificium.messages.find(
          (m) => m.id === action.payload.messageId
        );
        if (message) {
          message.response = action.payload.response;
          message.status = "success";
        }
      })
      .addCase(sendAIPrompt.rejected, (state, action) => {
        const message = state.artificium.messages.find(
          (m) => m.id === action.meta.requestId
        );
        if (message) message.status = "error";
      });
  },
});

export const { addMessage } = chatSlice.actions;
export default chatSlice.reducer;

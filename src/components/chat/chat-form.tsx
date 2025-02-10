"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { Mic, Paperclip, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChatFormValues } from "@/lib/schema";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addMessage, sendAIPrompt } from "@/store/chatSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatFormSchema } from "@/lib/schema";

interface ChatFormProps {
  className?: string;
  chatType: "artificium" | "community";
  userId: string;
}

export function ChatForm({ className, chatType, userId }: ChatFormProps) {
  const dispatch = useAppDispatch();
  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chatFormSchema),
    defaultValues: {
      message: "",
    },
  });
  const messages = useAppSelector((state) => state.chat[chatType].messages);
  const isLoading = messages.some((m) => m.status === "loading");

  const handleSubmit = (data: ChatFormValues) => {
    if (chatType === "artificium") {
      dispatch(sendAIPrompt({ prompt: data.message, userId }));
    } else {
      dispatch(
        addMessage({
          chatType: "community",
          message: {
            id: Date.now().toString(),
            prompt: data.message,
            createdAt: Date.now(),
            status: "success",
            userId, 
          },
        })
      );
    }
    form.reset({ message: "" });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(
          "flex items-center gap-2 w-full mx-auto bg-sidebar rounded-2xl p-6  focus-within:border focus-within:border-primary focus-within:outline focus-within:outline-4 focus-within:outline-primary/20 focus-within:shadow-2xl focus-within:shadow-primary/10",
          className
        )}
      >
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="h-9 w-9 shrink-0"
          disabled={form.formState.isSubmitting || isLoading}
        >
          <Mic className="h-4 w-4" />
          <span className="sr-only">Voice input</span>
        </Button>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="relative flex-1">
              <FormControl>
                <Input
                  placeholder="You can ask me anything! I am here to help."
                  className="w-full border-none bg-transparent pr-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute -bottom-5 left-0 text-xs" />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-9 w-9 shrink-0"
            disabled={form.formState.isSubmitting || isLoading}
          >
            <Paperclip className="h-4 w-4" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button
            type="submit"
            size="icon"
            variant="tertiary"
            className="h-9 w-9 shrink-0"
            disabled={form.formState.isSubmitting || isLoading}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

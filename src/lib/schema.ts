import * as z from "zod"

export const chatFormSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
})

export type ChatFormValues = z.infer<typeof chatFormSchema>


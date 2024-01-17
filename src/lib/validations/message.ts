import { z } from 'zod'

export const messageSchema = z.object({
  id: z.string(),
  senderId: z.string(),
  text: z.string(),
  timestamp: z.number(),
})

//Validate array of messages
export const messageArrayValidator = z.array(messageSchema)

export type Message = z.infer<typeof messageSchema>
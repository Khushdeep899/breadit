import { z } from 'zod'

export const ChannelValidator = z.object({
  name: z.string().min(3).max(21),
})

export const ChannelSubscriptionValidator = z.object({
  channelId: z.string(),
})

export type CreateChannelPayload = z.infer<typeof ChannelValidator>
export type SubscribeToChannelPayload = z.infer<
  typeof ChannelSubscriptionValidator
>
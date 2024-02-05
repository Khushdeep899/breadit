import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { ChannelSubscriptionValidator } from '@/lib/validators/channel'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { channelId } = ChannelSubscriptionValidator.parse(body)

    // check if user has already subscribed or not
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        channelId,
        userId: session.user.id,
      },
    })

    if (!subscriptionExists) {
      return new Response(
        "You've not been subscribed to this channel, yet.",
        {
          status: 400,
        }
      )
    }

    // create channel and associate it with the user
    await db.subscription.delete({
      where: {
        userId_channelId: {
          channelId,
          userId: session.user.id,
        },
      },
    })

    return new Response(channelId)
  } catch (error) {
    (error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not unsubscribe from channel at this time. Please try later',
      { status: 500 }
    )
  }
}
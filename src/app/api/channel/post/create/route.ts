import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { ChannelSubscriptionValidator } from '@/lib/validators/channel'
import { PostValidator } from '@/lib/validators/post'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { channelId, title, content } = PostValidator.parse(body)

    // check if user has already subscribed to channel
    const subscriptionExists = await db.subscription.findFirst({
      where: {
        channelId,
        userId: session.user.id,
      },
    })

    if (!subscriptionExists) {
      return new Response("Subscribe to post", {
        status: 400,
      })
    }

    
    await db.post.create({
      data: {
        title,
        content,
        authorId: session.user.id,
        channelId,
      },
    })

    return new Response('Ok')
  } catch (error) {
    (error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post to channel at this time. Please try later',
      { status: 500 }
    )
  }
}
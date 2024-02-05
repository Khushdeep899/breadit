import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { ChannelValidator } from '@/lib/validators/channel'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { name } = ChannelValidator.parse(body)

    // check if channel already exists
    const channelExists = await db.channel.findFirst({
      where: {
        name,
      },
    })

    if (channelExists) {
      return new Response('Channel already exists', { status: 409 })
    }

    // create channel and associate it with the user
    const channel = await db.channel.create({
      data: {
        name,
        creatorId: session.user.id,
      },
    })

    // creator also has to be subscribed
    await db.subscription.create({
      data: {
        userId: session.user.id,
        channelId: channel.id,
      },
    })

    return new Response(channel.name)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }

    return new Response('Could not create channel', { status: 500 })
  }
}
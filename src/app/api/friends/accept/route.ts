import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { pusherServer } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    //Check for valid input
    const { id: idToAdd } = z.object({ id: z.string() }).parse(body)

    //Check who is making the request
    const session = await getServerSession(authOptions)
    
    //If there is no session, not logged in, it's unauthorized
    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    //Verify both users are not already friends
    const isAlreadyFriends = await fetchRedis(
      'sismember',
      `user:${session.user.id}:friends`,
      idToAdd
    )
    if (isAlreadyFriends) {
      return new Response('Already friends', { status: 400 })
    }

    //Check for incoming friend request
    const hasFriendRequest = await fetchRedis(
      'sismember',
      `user:${session.user.id}:incoming_friend_requests`,
      idToAdd
    )

    //If there's no friend request, should not be able to add them
    if (!hasFriendRequest) {
      return new Response('No friend request', { status: 400 })
    }

    const [userRaw, friendRaw] = (await Promise.all([
      fetchRedis('get', `user:${session.user.id}`),
      fetchRedis('get', `user:${idToAdd}`),
    ])) as [string, string]

    const user = JSON.parse(userRaw) as User
    const friend = JSON.parse(friendRaw) as User

    //Notify to added user
    await Promise.all([
      pusherServer.trigger(
        toPusherKey(`user:${idToAdd}:friends`),
        'new_friend',
        user
      ),
      pusherServer.trigger(
        toPusherKey(`user:${session.user.id}:friends`),
        'new_friend',
        friend
      ),
      //Add to the friends set, 
      db.sadd(`user:${session.user.id}:friends`, idToAdd),
      //Add friend the other way around as well
      db.sadd(`user:${idToAdd}:friends`, session.user.id),
      //Clean up the friend request
      db.srem(`user:${session.user.id}:incoming_friend_requests`, idToAdd),
    ])

    return new Response('OK')
  } catch (error) {
    console.log(error)

    if (error instanceof z.ZodError) {
      return new Response('Invalid request payload', { status: 422 })
    }

    return new Response('Invalid request', { status: 400 })
  }
}
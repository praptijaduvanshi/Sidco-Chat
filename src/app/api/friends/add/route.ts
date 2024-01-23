import { fetchRedis } from "@/helpers/redis"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { pusherServer } from "@/lib/pusher"
import { toPusherKey } from "@/lib/utils"
import { addFriendValidator } from "@/lib/validations/add-friend"
import { getServerSession } from "next-auth"
import { z } from "zod"

export async function POST(req: Request) {
    try {
        //access to body content of post request
        const body = await req.json()

        const {email: emailToAdd} = addFriendValidator.parse(body.email)

        //If the person does not exist in the database.
        const idToAdd = (await fetchRedis(
            'get',
            `user:email:${emailToAdd}`
          )) as string
        if (!idToAdd) {
            return new Response('This person does not exist.', { status: 400 })
          }

        //Who is making this request, get the session server side
        const session= await getServerSession(authOptions)
        if (!session) {
            return new Response('Unauthorized', { status: 401 })
          }
        
        //If the id is the user that is logged in
        if (idToAdd === session.user.id) {
            return new Response('You cannot add yourself as a friend', {
              status: 400,
            })
          }

        //If the user already added as a friend, helper function interact with the database
        const isAlreadyAdded = (await fetchRedis(
            'sismember',
            `user:${idToAdd}:incoming_friend_requests`,
            session.user.id
          )) as 0 | 1
        
          if (isAlreadyAdded) {
            return new Response('This user is already your friend.', { status: 400 })
          }
        
        const isAlreadyFriends = (await fetchRedis(
            'sismember',
            `user:${session.user.id}:friends`,
            idToAdd
          )) as 0 | 1
      
          if (isAlreadyFriends) {
            return new Response('This user is already your friend.', { status: 400 })
          }


        //valid request, send friend request
        await pusherServer.trigger(
          toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
          'incoming_friend_requests',
          {
            senderId: session.user.id,
            senderEmail: session.user.email,
          }
        )
        
        // adding user to add to the set
        await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id)

        return new Response('OK')

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request payload', { status: 422 })
          }
          return new Response('Invalid request', { status: 400 })
    }
    
}
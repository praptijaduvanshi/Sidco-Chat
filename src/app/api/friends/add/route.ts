import { authOptions } from "@/lib/auth"
import { addFriendValidator } from "@/lib/validations/add-friend"
import { getServerSession } from "next-auth"

export async function POST(req: Request) {
    try {
        //access to body content of post request
        const body = await req.json()

        const {email: emailToAdd} = addFriendValidator.parse(body.email)

        const RESTResponse = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/get/user:email${emailToAdd}`, {
            headers: {
                Authorization: `Beaere ${process.env.UPSTASH_REDIS_REST_TOKEN}`
            },
            cache: 'no-store',
        })
        const data = await RESTResponse.json() as { result: string | null}
        
        //If the person does not exist in the database.
        const idToAdd= data.result
        if(!idToAdd) {
            return new Response('This person does not exist.', {status:401})
        }

        //Who is making this request, get the session server side
        const session= await getServerSession(authOptions)
        if (!session) {
            return new Response('Unauthorized', {status:401})
        }
        
        //If the id is the user that is logged in
        if (idToAdd === session.user.id) {
            return new Response('You cannot add yourself as a friend.', {status:400})
        }

        //valid request

        console.log(data)

    } catch (error) {
        
    }
    
}
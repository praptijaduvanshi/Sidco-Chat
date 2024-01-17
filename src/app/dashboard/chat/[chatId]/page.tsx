import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { messageArrayValidator } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import {FC} from "react";

//This route must be dynamic to show chats with different IDs
interface PageProps {
    params: {
        chatId: string
    }
}

async function getChatMessages(chatId: string) {
    try {
        //Sorted list/array of chat messages, fetch from 0 to -1
        const results: string[] = await fetchRedis(
            'zrange',
            `chat:${chatId}:messages`,
            0,
            -1
        )

        //These messages are in order where recent message is at the top
        const dbMessages = results.map((message) => JSON.parse(message) as Message)
        
        //Display messages in reverse order
        const reversedDbMessages = dbMessages.reverse()

        const messages= messageArrayValidator.parse(reversedDbMessages)
        return messages

    } catch (error) {
      notFound()
    }
  }

const page= async ({params}: PageProps) => {
    
    //De-structure the chatId
    const {chatId} = params
    const session = await getServerSession(authOptions)

    if(!session) notFound()

    const { user } = session

    // '/chat/userId1--userId2' where userId1 is the one on session
    const [userId1, userId2] = params.chatId.split('--')
    //Should only be able to view chat if they are either userId1 or userId2
    if (user.id !== userId1 && user.id !== userId2) {
        notFound()
    }
    const chatPartnerId = user.id === userId1 ? userId2 : userId1
    //Get chatPartner email
    const chatPartnerRaw = (await fetchRedis(
        'get',
        `user:${chatPartnerId}`
    )) as string
    const chatPartner = JSON.parse(chatPartnerRaw) as User
    
    const initialMessages = await getChatMessages(chatId)
    
    return <div>{params.chatId}</div>
}

export default page

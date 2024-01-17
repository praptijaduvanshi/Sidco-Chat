import ChatInput from "@/components/ChatInput";
import Messages from "@/components/Messages";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { messageArrayValidator } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import Image from "next/image";
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
    
    return (
        <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh-6rem)]">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
                <div className="relative flex items-center space-x-4">
                    <div className="relative">
                        <div className="relative w-8 sm:w-12 h-8 sm:h-12">
                        <Image
                            fill
                            referrerPolicy='no-referrer'
                            src={chatPartner.image}
                            alt={`${chatPartner.name} profile picture`}
                            className='rounded-full'
                        />
                        </div>
                    </div>

                    <div className="flex flex-col leading-tight">
                        <div className="text-xl flex items-center">
                            <span className="text-gray-700 mr-3 font-semibold">{chatPartner.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{chatPartner.email}</span>
                    </div>
                </div>
            </div>

            <Messages sessionId={session.user.id} initialMessages={initialMessages} />
            <ChatInput chatId={chatId} chatPartner={chatPartner} />

        </div>
    )
}

export default page

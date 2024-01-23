//One is for the server and one for client
//Client makes a post request to server with chat message content
//Server puts it databse- in sorted set
//Server will send the message to anyone subscribed to the chat in real-time using websockets

import PusherServer from 'pusher'
import PusherClient from 'pusher-js'

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_APP_SECRET!,
  cluster: 'ap2',
  useTLS: true,
})

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: 'ap2',
  }
)
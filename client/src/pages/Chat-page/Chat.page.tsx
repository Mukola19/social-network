import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import SendIcon from '@mui/icons-material/Send'
import { Paper, IconButton } from '@mui/material'
import cl from 'classnames'
import st from './Chat.page.module.scss'

// const ws = new WebSocket(
//   'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx'
// )

export const ChatPage: React.FC = () => {
  return <></>
  // return <Chat />
}

// export const Chat: React.FC = () => {
//   return (
//     <Paper className={st.chat}>
//       <Messages />
//       <AddMessageForm />
//     </Paper>
//   )
// }

// interface IMessage {
//   message: string
//   photo: string
//   userId: number
//   userName: string
// }

// export const Messages: React.FC = () => {
//   const [messages, setMessages] = useState<IMessage[]>([])
//   useEffect(() => {
//     ws.addEventListener('message', (e: MessageEvent) => {
//       setMessages(JSON.parse(e.data))
//     })






//   }, [])
//   return (
//     <div className={st.messages}>
//       <div className={st.messagesContent}>
//         {messages.map((message: IMessage) => (
//           <Message {...message} key={message.userId} />
//         ))}
//       </div>
//     </div>
//   )
// }

// export const Message: React.FC<IMessage> = ({ message, photo, userId, userName }) => {
//   return (
//     <div className={cl(st.message, st.new)}>
//       <figure className={st.avatar}>
//         <img src={photo} />
//       </figure>
//       {message}
//     </div>
//   )
// }

// export const MyMessage: React.FC<IMessage> = ({ message, photo, userId, userName }) => {
//   return <div className={cl(st.message, st.messagePersonal)}>{message}</div>
// }



// interface IFormMeassage {
//   message: string
// }


// export const AddMessageForm: React.FC = () => {
//   const { register, handleSubmit } = useForm<IFormMeassage>()

//   const sendMessage = (data: IFormMeassage) => {
//     console.log(data)
//   }
//   return (
//     <form className={st.addMessage} onSubmit={handleSubmit(sendMessage)}>
//       <div className={st.messageBox}>
//         <textarea
//           {...register('message')}
//           className={st.messageInput}
//           placeholder="Type message..."
//         ></textarea>
//         <button type="submit" className={st.messageSubmit}>
//           Send
//         </button>
//       </div>
//     </form>
//   )
// }

// var $messages = document.querySelector('.messages-content'),
//     d, h, m,
//     i = 0

// document.querySelector(window).load(function() {
//   $messages.mCustomScrollbar()
//   setTimeout(function() {
//     fakeMessage()
//   }, 100)
// })

// function updateScrollbar() {
//   $messages.mCustomScrollbar('update').mCustomScrollbar('scrollTo', 'bottom', {
//     scrollInertia: 10,
//     timeout: 0
//   })
// }

// function setDate(){
//   d = new Date()
//   if (m != d.getMinutes()) {
//     m = d.getMinutes()
//     document.querySelector('<div class='timestamp'>' + d.getHours() + ':' + m + '</div>').appendTo(document.querySelector('.message:last'))
//   }
// }

// function insertMessage() {
//   msg = document.querySelector('.message-input').value
//   if ($.trim(msg) == '') {
//     return false
//   }
//   document.querySelector('<div class='message message-personal'>' + msg + '</div>').appendTo(document.querySelector('.mCSB_container')).classList.add('new')
//   setDate()
//   document.querySelector('.message-input').val(null)
//   updateScrollbar()
//   setTimeout(function() {
//     fakeMessage()
//   }, 1000 + (Math.random() * 20) * 100)
// }

// document.querySelector('.message-submit').click(function() {
//   insertMessage()
// })

// document.querySelector(window).addEventListener('keydown', function(e) {
//   if (e.which == 13) {
//     insertMessage()
//     return false
//   }
// })

// var Fake = [
//   'Hi there, I\'m Fabio and you?',
//   'Nice to meet you',
//   'How are you?',
//   'Not too bad, thanks',
//   'What do you do?',
//   'That\'s awesome',
//   'Codepen is a nice place to stay',
//   'I think you\'re a nice person',
//   'Why do you think that?',
//   'Can you explain?',
//   'Anyway I\'ve gotta go now',
//   'It was a pleasure chat with you',
//   'Time to make a new codepen',
//   'Bye',
//   ':)'
// ]

// function fakeMessage() {
//   if (document.querySelector('.message-input').value != '') {
//     return false
//   }
//   document.querySelector('<div class='message loading new'><figure class='avatar'><img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg' /></figure><span></span></div>').appendTo(document.querySelector('.mCSB_container'))
//   updateScrollbar()

//   setTimeout(function() {
//     document.querySelector('.message.loading').remove()
//     document.querySelector('<div class='message new'><figure class='avatar'><img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg' /></figure>' + Fake[i] + '</div>').appendTo(document.querySelector('.mCSB_container')).classList.add('new')
//     setDate()
//     updateScrollbar()
//     i++
//   }, 1000 + (Math.random() * 20) * 100)

// }

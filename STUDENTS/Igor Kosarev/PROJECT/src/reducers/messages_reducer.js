//methods
import update from 'react-addons-update'

//actions
import { SEND_MESSAGE } from '../actions/message_actions'

let initialStore = {
  chats: {
    1: {
      messagesList: [
        { body: 'Hello! How are you?', author: "Mary", messageId: 1 },
        { body: 'Hi! Fine! And you?', author: "You", messageId: 2 },
        { body: 'Fine! What is your plan for this weekend?', author: "Mary", messageId: 3 },
      ]
    },
    2: {
      messagesList: [
        { body: 'Hello!', author: "Alex", messageId: 1 },
        { body: 'Hi! ', author: "You", messageId: 2 }
      ]
    },
    3: {
      messagesList: [
        { body: 'Time to pay!', author: "Bill", messageId: 1 }
      ]
    },
    4: {
      messagesList: [
        { body: 'Help me, please!', author: "Steave", messageId: 1 }
      ]
    },
    5: {
      messagesList: [
        { body: 'Hi!', author: "Ealon", messageId: 1 },
        { body: 'Hi!', author: "You", messageId: 2 },
        { body: 'Drive Tesla!', author: "Ealon", messageId: 3 }
      ]
    }
  }
}

export default function messagesReducer(store = initialStore, action) {
  switch (action.type) {
    case SEND_MESSAGE:
      {
        // console.log(store)
        //super reducer logic
        let chatId = action.chatId
        let obj = { body: action.text, author: action.sender, messageId: Date.now() }
        return update(store, {
          chats: {
            [chatId]: {
              messagesList: { $push: [obj] }
            }
          }
        })
      }
    default:
      {
        return store
      }
  }
}
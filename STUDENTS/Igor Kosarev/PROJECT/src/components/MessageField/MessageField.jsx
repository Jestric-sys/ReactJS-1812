// import './style.css'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import Message from '../Message/Message.jsx'

import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';

//store
import { sendMessage } from '../../actions/message_actions.js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Messages extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
            // messages: [
            //     {body: 'Hello', author: null}, 
            //     {body: 'What is up?', author: null}
            // ],
            // chats: {
            //     1: {title: 'Чат 1', messageList: [1]},
            //     2: {title: 'Чат 2', messageList: [2]},
            //     3: {title: 'Чат 3', messageList: [3]},
            // },
            input: ''
        }
    }

    // componentDidUpdate () {
    //     let msgs = this.state.messages
    //     if (msgs.length % 2 === 1) {
    //         setTimeout (() => {
    //             this.setState (
    //                 {
    //                     messages: [...this.state.messages, {body: 'Ваш звонок очень важен для нас', author: 'mr. Robo'}]
    //                 }
    //             )
    //         }, 1000)
    //     }
    // }

    textInput = React.createRef();


    handleSendMessage = () => {
        let { chatId } = this.props
        if (this.state.input.length > 0) {
            this.props.sendMessage(Date.now(), this.state.input, "You", chatId);
            this.setState({ input: '' });
        }
    }


    // sendMessage = () => {
    //     this.setState ({
    //         messages: [...this.state.messages, {body: this.state.input}],
    //         input: ''
    //     })
    // }

    handleInput = (e) => {
        this.setState({ input: e.target.value })
    }

    handleKeyUp = (e) => {
        if (e.keyCode === 13) {  // Enter
            this.handleSendMessage()
        }
    }

    render () {
        let { user } = this.props
        //let { messages } = this.state
        let { chatId } = this.props
        let { chats } = this.props

        let MessageArr = chats[chatId].messagesList.map (message => <Message msg={ {
            usrName: message.author ? message.author : user, 
            msgBody: message.body
        } }/>)
        //console.log(chats[chatId])

        return (

            <div className="msg-wrapper">
                <div>
                    { MessageArr }
                </div>
                <div style={ { width: '100%', display: 'flex' }}>
                   <TextField 
                        name = "input"
                        ref = {this.textInput}
                        fullWidth = {true}
                        style={ { fontSize: '22px' } }
                        hintText = "Enter message"
                        onChange = {this.handleInput}
                        value={this.state.input}
                        onKeyUp={ this.handleKeyUp }
                    /> 
                </div>
                
                <button onClick = { this.handleSendMessage }>Send</button>
            </div>
        )
    }
}

let mapStateToProps = ({ messagesReducer }) => ({
    chats: messagesReducer.chats
})

let mapDispatchToProps = dispatch => bindActionCreators ({ sendMessage }, dispatch)

export default connect (mapStateToProps, mapDispatchToProps) (Messages)
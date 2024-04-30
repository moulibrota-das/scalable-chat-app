'use client'
import classes from './page.module.css'
import { useSocket, } from '../context/SocketProvider'
import { useState } from 'react';

export default function Page() {

  const {sendMessage, messages} = useSocket();
  const [msg, setMsg] = useState('');

  return(
    <div>
      <div>
        <h1>All Messages appear here</h1>
      </div>
      <div>
        <input onChange={(e)=> setMsg(e.target.value)} className={classes["chat-input"]} placeholder="Write your message" />
        <button onClick={(e)=>sendMessage(msg)} className={classes["button"]}>Send</button>
      </div>
      <div>
        {messages.map(e => <li key={e}>{`${e}`}</li>)}
      </div>
    </div>
  )
}
import React, { useContext } from "react";
import { Context } from '../context';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Auth() {
  const { username, setUsername, secret, setSecret } = useContext(Context)
  const router = useRouter()

  const authHandler = async (e) => {
    e.preventDefault()
    if (username.length === 0 || setSecret.length === 0) return

    const res = await axios.put("https://api.chatengine.io/users/",
      { username, secret },
      {
        headers:
          { "private-key": "9799f5a5-a2e7-4610-a0b2-6be41be7c89d" }
      }
    )
    if (res) {
      router.push("/chats")
    }
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={authHandler}>
          <div className="auth-title">NextJS Chat</div>
          <div className="input-container">
            <input className="text-input" placeholder="Email" onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-container">
            <input type="password" className="text-input" placeholder="Password" onChange={e => setSecret(e.target.value)} />
          </div>
          <button type="submit" className="submit-button">Login / sign up</button>
        </form>
      </div>
    </div>
  )
}

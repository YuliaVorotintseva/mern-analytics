import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useHTTP } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import './AuthPage.css'

export const AuthPage = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const { loading, error, request, cleanError } = useHTTP()
  const [form, setForm] = useState({ email: '', password: '' })

  useEffect(() => {
    message(error)
    cleanError()
  }, [error, message, cleanError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => setForm({ ...form, [event.target.name]: event.target.value })

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      message(data.message)
    } catch (error) { }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId)
    } catch (error) { }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>LINK SHORTENING</h1>
        <div className="card amber lighten-5">
          <div className="card-content white-text">
            <span className="card-title custom-span">Authorization</span>

            <div>
              <div className="input-field">
                <input
                  placeholder="Email..." id="email" type="text" name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Password..." id="password" type="password" name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn amber darken-1 btn-custom"
              onClick={loginHandler}
              disabled={loading}
            >
              LOG UP
            </button>
            <button
              className="btn teal lighten-5 black-text btn-custom"
              onClick={registerHandler}
              disabled={loading}
            >
              LOG IN
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

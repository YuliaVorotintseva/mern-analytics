import React, { useState } from 'react'
import { useHTTP } from '../../hooks/http.hook'
import './AuthPage.css'

export const AuthPage = () => {
  const { loading, error, request } = useHTTP()
  const [form, setForm] = useState({ email: '', password: '' })

  const changeHandler = event => setForm({ ...form, [event.target.name]: event.target.value })
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
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

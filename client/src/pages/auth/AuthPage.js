import React, { useState } from 'react'
import './AuthPage.css'

export const AuthPage = () => {
  const [form, setForm] = useState({email: '', password: ''})

  const changeHandler = event => setForm({...form, [event.target.name]: event.target.value})

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>LINK SHORTENING</h1>
        <div class="card amber lighten-5">
          <div class="card-content white-text">
            <span class="card-title custom-span">Authorization</span>

            <div>
              <div class="input-field">
                <input 
                  placeholder="Email..." id="email" type="text" name="email"
                  onChange={changeHandler}
                />
                <label for="email">Email</label>
              </div>

              <div class="input-field">
                <input
                  placeholder="Password..." id="password" type="password" name="password"
                  onChange={changeHandler}
                />
                <label for="password">Password</label>
              </div>
            </div>
          </div>

          <div class="card-action">
            <button className="btn amber darken-1 btn-custom">LOG UP</button>
            <button className="btn teal lighten-5 black-text btn-custom">LOG IN</button>
          </div>
        </div>
      </div>
    </div>
  )
}

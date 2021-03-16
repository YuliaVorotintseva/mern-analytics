import React, { useState, useEffect, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { useHTTP } from '../../hooks/http.hook'
import './CreatePage.css'

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHTTP()
  const [link, setLink] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/detail/${data.link_id}`)
      } catch (error) { }
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            placeholder="Link..." id="link" type="text"
            value={link}
            onChange={event => setLink(event.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  )
}

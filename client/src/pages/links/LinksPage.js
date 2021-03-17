import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHTTP } from '../../hooks/http.hook'
import { AuthContext } from '../../context/auth.context'
import { Loader } from '../../components/loader'
import { LinksList } from '../../components/links_list'
import './LinksPage.css'

export const LinksPage = () => {
  const [links, setLinks] = useState([])
  const { loading, request } = useHTTP()
  const { token } = useContext(AuthContext)

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (error) { }
  }, [token, request])

  useEffect(() => fetchLinks(), [fetchLinks])

  if (loading) return <Loader />

  return (
    <>
      {!loading&&<LinksList links={links}/>}
    </>
  )
}

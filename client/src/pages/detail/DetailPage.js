import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHTTP } from '../../hooks/http.hook'
import { AuthContext } from '../../context/auth.context'
import { Loader } from '../../components/loader'
import { LinkCard } from '../../components/link_card'
import './DetailPage.css'

export const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHTTP()
  const [link, setLink] = useState(null)
  const id = useParams().id

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${id}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    } catch (error) { }
  }, [token, id, request])

  useEffect(() => getLink(), [getLink])
  if (loading) return <Loader />

  return (
    <>
      {!loading && link && <LinkCard link={link} />}
    </>
  )
}

import React from 'react'

export const LinkCard = ({ link }) => (
  <>
    <h2>LINK</h2>
    <p>Your link:{'\t'}
        <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a>
    </p>
    <p>From:{'\t'}
        <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a>
    </p>
    <p>Clicks number:{'\t'}
        <strong>{link.clicks}</strong>
    </p>
    <p>Create date:{'\t'}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
    </p>
  </>
)

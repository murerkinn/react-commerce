import React, { FC } from 'react'
import { Alert } from 'react-bootstrap'

interface IProps {
  variant: string
}

const Message: FC<IProps> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'blue',
}

export default Message

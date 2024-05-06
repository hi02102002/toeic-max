import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

export interface VerifyAccountProps {
  username: string
  url: string
  baseUrl: string
}

export const VerifyAccount = ({
  username,
  url,
  baseUrl,
}: VerifyAccountProps) => {
  return (
    <Html>
      <Head />
      <Preview>Dialoguebot - Verify Account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/public/images/logo.svg`}
            width='44'
            height='44'
            alt='Dialoguebot Logo'
          />
          <Section>
            <Text style={text}>Hi {username},</Text>
            <Text style={text}>
              Welcome to Dialoguebot! To get started, please verify your account
              by clicking the button below:
            </Text>
            <Button style={button} href={url}>
              Verify account
            </Button>
            <Text style={text}>
              If you didn&apos;t create an account with Dialoguebot, you can
              safely ignore and delete this message.
            </Text>
            <Text style={text}>Have a great day!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px',
}

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px',
}

const button = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '210px',
  padding: '14px 7px',
}

import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
  } from '@react-email/components';

interface EmailTemplateProps {
  firstName: string;
}

const container: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#e88686',
    borderRadius: '5px',
    fontFamily: 'sans-serif',
    color: 'rgb(188, 147, 226)',
    };

const button: React.CSSProperties = {
    padding: '10px',
    margin: '20px 0',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: 'rgb(188, 147, 226)',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    };

const title: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0',
    };




 const SendEmail: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
    <Html lang="en">
  <Body >
    <Heading >Welcome, {firstName}!</Heading>
    <Text>Thank you for registering!</Text>
    <Link href="https://gkarcevskis.com">Visit our page!</Link>
  </Body>
  </Html>
);

export default SendEmail;
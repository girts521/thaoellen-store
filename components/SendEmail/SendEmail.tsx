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
  orderId: string;
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
  orderId
}) => (
    <Html lang="en">
  <Body >
    <Heading >Cảm ơn!</Heading>
    <Text>Cảm ơn bạn đã đặt hàng!</Text>
	<Text>Số đơn hàng: {orderId}</Text>
  </Body>
  </Html>
);

export default SendEmail;

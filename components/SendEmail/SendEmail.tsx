import * as React from 'react'
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
} from '@react-email/components'

interface EmailTemplateProps {
  orderId: string
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
}

const button: React.CSSProperties = {
  padding: '10px',
  margin: '20px 0',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: 'rgb(188, 147, 226)',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
}

const title: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
}

const SendEmail: React.FC<Readonly<EmailTemplateProps>> = ({ orderId }) => (
  <Html lang="en">
    <Body>
      <Heading>Cảm ơn!</Heading>
      <Text>Cảm ơn bạn đã đặt hàng!</Text>
      <Text>Số đơn hàng: {orderId}</Text>
      <br />
      <Text>
        Quý khách có thể vui lòng chọn chuyển khoản trước để tránh bị thu cước
        của bưu điện như khi chọn thu hộ ( Ship COD) nhé 😉
        <br />
        <br />
        <b>LƯU Ý KHI CHUYỂN KHOẢN:</b> Copy mã số đơn hàng vào phần “ Nội dung
        chuyển khoản” ở Online Banking khi chuyển khoản để Thạch Thảo biết là
        quý khách đã thanh toán nhé!
        <br />
        <br />
        <b>Số tài khoản:</b> 0354948095 
        <br />
        Tên chủ TK: Nguyễn Thị Thạch Thảo
        <br />
        Ngân hàng: BIDV chi nhánh Đaklak.
        <br />
        <br />
        Quý khách vẫn có thể thoải mái chọn thu hộ nếu không muốn chuyển khoản
        trước nhé 😊. 
        <br />
        Sau khi chuyển khoản xong quý khách vui lòng nhắn tin
        thông báo cho Thảo biết <Link href={`https://m.me/NguyenThiThachThao95/?text=Xin chào, tôi đã chuyển khoản cho số đơn hàng: ${orderId}`}>tại đây</Link> nhé. Xin cảm ơn quý khách!
      </Text>
      <br />
      <Button>
       
      </Button>
    </Body>
  </Html>
)

export default SendEmail

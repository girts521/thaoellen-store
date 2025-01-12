import * as React from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid2'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/system'
import FormGroup from '@mui/material/FormGroup'
import Link from 'next/link'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

export default function CheckoutForm({
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  userAddress,
  setUserAddress,
  userPhone,
  setUserPhone
}) {
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="name" required>
          Họ tên
        </FormLabel>
        <OutlinedInput
          id="name"
          name="name"
          type="name"
          placeholder="John Doe"
          required
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserName(event.target.value)
          }}
          value={userName}
        />
      </FormGrid>

      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          required
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserEmail(event.target.value)
          }}
          value={userEmail}
        />
      </FormGrid>

      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="phone">
          Điện thoại
        </FormLabel>
        <OutlinedInput
          id="phone"
          name="phone"
          type="phone"
          placeholder="+4917600000000"
          autoComplete="phone"
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserPhone(event.target.value)
          }}
          value={userPhone}
        />
      </FormGrid>

      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address" required>
          Địa chỉ
        </FormLabel>
        <OutlinedInput
          id="address"
          name="address"
          type="address"
          placeholder="Street name and number"
          required
          size="small"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUserAddress(event.target.value)
          }}
          value={userAddress}
        />
      </FormGrid>

      {/* <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </FormGrid> */}
    </Grid>
  )
}

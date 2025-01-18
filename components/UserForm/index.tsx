import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import HomeIcon from '@mui/icons-material/Home'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Divider from '@mui/material/Divider'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import Fade from '@mui/material/Fade'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { ReactNode, useState, useEffect } from 'react'
import { auth } from 'lib/firebase'

interface UserFormProps {
  text: string | null
  field: string
  enField: string
  state: boolean
  edit: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  setState: React.Dispatch<React.SetStateAction<boolean>>
  icon: ReactNode
}

const UserForm: React.FC<UserFormProps> = ({
  text,
  field,
  enField,
  state,
  edit,
  setEdit,
  setState,
  icon,
}) => {
  const [value, setValue] = useState("")
  const [textState, setTextState] = useState("")


  const saveData = async () => {
    const idToken = await auth.currentUser.getIdToken()
    console.log(`token: ${idToken}, field: ${field}, value: ${value}`)
    const data = {
      field: enField.toLowerCase(),
        value: value,
    }
    fetch('/api/saveUserInfo', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify(data)
    })
    setTextState(value)
    setEdit(!edit)
    setState(!state)
  }

useEffect(() => {
  if (text)
  {
    setValue(text);
    setTextState(text)
  }
}, [text])

  return (
    <>
      <MenuItem
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '16px',
        }}
        onClick={() => {
          setEdit(!edit)
          setState(!state)
        }}
      >
        <ListItemIcon>
          <div>{icon}</div>
        </ListItemIcon>
        <ListItemText 
        sx={{
          minWidth: '65px'
        }}
        >{field}</ListItemText>
        <Fade in={state} mountOnEnter unmountOnExit >
          {textState ? (
            <ListItemText
            sx={{
              overflow:'hidden',
              paddingLeft: '16px',
              paddingRight: '16px',
              '@media (max-width: 768px)': {
                display: 'none'
              },
            }}
            >{textState}</ListItemText>
          ) : (
            <ListItemText>Không có {field.toLowerCase()} nào được lưu</ListItemText>
          )}
        </Fade>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <ArrowForwardIosIcon fontSize="small" />
        </Typography>
      </MenuItem>

      <Fade in={edit} mountOnEnter unmountOnExit>
        <Stack
          spacing={1}
          direction="column"
          sx={{
            width: '95%',
            marginLeft: '16px',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          <TextField
            label="Multiline"
            multiline
            // defaultValue={text ? text : null}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValue(event.target.value)
            }}
            variant="standard"
          />
          <Button onClick={saveData} variant="text">Save changes</Button>
        </Stack>
      </Fade>
    </>
  )
}

export default UserForm

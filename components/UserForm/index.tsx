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
import { ReactNode } from 'react';


interface UserFormProps {
    text: string | null;
    field: string;
    state: boolean;
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
    setState: React.Dispatch<React.SetStateAction<boolean>>;
    icon: ReactNode; 
  }

  const UserForm: React.FC<UserFormProps> = ({ text, field, state, edit, setEdit, setState, icon }) => {
  return (
    <>
      <MenuItem
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
        onClick={() => {
          setEdit(!edit)
          setState(!state)
        }}
      >
        <ListItemIcon>
        <div>{icon}</div>
        </ListItemIcon>
        <ListItemText>{field}</ListItemText>
        <Fade
          in={state}
          mountOnEnter
          unmountOnExit
        >
          {text ? (
            <ListItemText>{text}</ListItemText>
          ) : (
            <ListItemText>No {field.toLowerCase()} saved</ListItemText>
          )}
        </Fade>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <ArrowForwardIosIcon fontSize="small" />
        </Typography>
      </MenuItem>

      <Fade
        in={edit}
        mountOnEnter
        unmountOnExit
      >
        <Stack
          spacing={1}
          direction="column"
          sx={{ width: '95%', marginLeft: '16px', marginTop: '16px' }}
        >
          <TextField
            label="Multiline"
            multiline
            defaultValue={
                text ? text : null
            }
            variant="standard"
          />
          <Button variant="text">Save changes</Button>
        </Stack>
      </Fade>
    </>
  )
}

export default UserForm

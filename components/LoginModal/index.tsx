import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import GoogleIcon from '@mui/icons-material/Google'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone'
import { googleSignIn, facebookSignIn } from '../../lib/firebase'
import { useRouter } from 'next/router'

const LoginModal = ({ open, setOpen }) => {
  const router = useRouter()

  const handleClose = () => {
    setOpen(false)
  }

  const handleFBsignIn = async () => {
    try {
      const signInState = await facebookSignIn() // Await sign-in result
      if (signInState) {
        router.push('/user') // Redirect
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error during sign-in:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const signInState = await googleSignIn() // Await sign-in result
      if (signInState) {
        router.push('/user') // Redirect
      } else {
        router.push('/')
      }
    } catch (error) {
      console.error('Error during sign-in:', error)
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          //   width: 400,
          bgcolor: 'background.paper',
          border: '2px solid rgba(133, 130, 202, 0.53)',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h2"
          sx={{
            marginBottom: '15px',
            textAlign: 'center',
          }}
        >
          Đăng nhập
        </Typography>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h3"
          sx={{
            marginBottom: '35px',
            textAlign: 'center',
          }}
        >
          Chào mừng bạn trở lại! Chọn phương thức đăng nhập.
        </Typography>

        <MenuList>
          <Paper
            sx={{
              width: 320,
              maxWidth: '100%',
              bgcolor: 'rgba(133, 130, 202, 0.53);',
              margin: 'auto',
              marginBottom: '7px',
            }}
            onClick={handleGoogleSignIn}
          >
            <MenuItem>
              <ListItemIcon>
                <GoogleIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText sx={{ paddingLeft: '5px', color: 'black' }}>
              Đăng nhập bằng Google
              </ListItemText>
            </MenuItem>
          </Paper>
          <Paper
            sx={{
              width: 320,
              maxWidth: '100%',
              bgcolor: 'rgba(133, 130, 202, 0.53);',
              margin: 'auto',
              marginBottom: '7px',
            }}
            onClick={handleFBsignIn}
          >
            <MenuItem>
              <ListItemIcon>
                <FacebookTwoToneIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText sx={{ paddingLeft: '5px', color: 'black' }}>
              Đăng nhập bằng Facebook
              </ListItemText>
            </MenuItem>
          </Paper>
        </MenuList>
      </Box>
    </Modal>
  )
}

export default LoginModal

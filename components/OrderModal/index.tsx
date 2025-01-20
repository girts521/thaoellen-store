import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'

const OrderModal = ({ open, handleClose, orderInfo }) => {
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
          border: '2px solid #000',
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
          Order Details
        </Typography>
        {orderInfo &&
          orderInfo.map((item) => {
            console.log(item)
            return (
              <Grid container spacing={2} sx={{
                border: '1px solid black',
                margin: '7px',
                padding: '7px'
              }}>
                <Grid size={12}>
                  <div>{item.productName}</div>
                </Grid>
                <Grid size={6}>
                  <div>Price: {item.price}</div>
                </Grid>
                <Grid size={6}>
                  <div>Quantity: {item.quantity}</div>
                </Grid>
                <Grid size={12} sx={{
                    marginBottom: '15px'
                }}>
                  <div>Total: {item.price * item.quantity}</div>
                </Grid>
              </Grid>
            )
          })}
      </Box>
    </Modal>
  )
}

export default OrderModal
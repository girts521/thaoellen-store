import Layout from 'components/BlogLayout'
import { useEffect, useState } from 'react'
import { signOutUser, getOrders } from 'lib/firebase'
import { useRouter } from 'next/router'

import styles from './dashboard.module.scss'
import { auth } from 'lib/firebase'

import OrderModal from 'components/OrderModal'

import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'


import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';

const Dashboard = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [decryptedOrders, setDecryptedOrders] = useState([])

  const [mapState, setMapState] = useState(new Map());
  const [orderInfo, setOrderInfo] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

   const router = useRouter()

  // Add a new key-value pair
  const addEntry = (key, value) => {
    setMapState((prevMap) => {
      const newMap = new Map(prevMap); // Create a new Map instance
      newMap.set(key, value); // Modify the Map
      return newMap; // Return the updated Map
    });
  };

  // Remove a key-value pair
  const removeEntry = (key, value) => {
    setMapState((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  };

  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res)
      })
      .catch((err) => {
        console.log(err)
        router.push('/')
      })
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const idToken = await currentUser.getIdToken()
        fetch('/api/decrypt', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orders }),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res)
            setDecryptedOrders(res)
          })
          .catch((err) => {
            console.log(err)
            router.push('/')
          })
      }
    })
    return () => unsubscribe() // Cleanup listener on unmount
  }, [orders])

  const convertDate = (date) => {
    const milliseconds = date.seconds * 1000 + date.nanoseconds / 1000000
    const dateObj = new Date(milliseconds)
    const day = String(dateObj.getDate()).padStart(2, '0')
    const month = String(dateObj.getMonth() + 1).padStart(2, '0') // Month is 0-indexed
    const year = dateObj.getFullYear()
    const formattedDate = `${day}.${month}.${year}`
    return formattedDate
  }
  
  const getProductInfo = async (id) => {
    try {
      const res = await fetch(`/api/getProductById?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data[0]|| 'Unknown Product';
    } catch (err) {
      console.log(err);
      return 'Error fetching product';
    }
  };

  useEffect(() => {
    const fetchProductNames = async () => {
      const orders = new Map()
      decryptedOrders.forEach(async (row) => {
        const products = JSON.parse(row.cart);
        addEntry(row.id, products)
      });
      // setProductNames(names);
    };

    fetchProductNames();
  }, [decryptedOrders]);
  

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 230 },
    { field: 'phone', headerName: 'Phone number', width: 200 },
    { field: 'address', headerName: 'Address', width: 130 },
    {
      field: 'dateAdded',
      headerName: 'Date',
      width: 130,
      valueGetter: (value, row) => `${convertDate(value)}`,
    },
    { field: 'facebook', headerName: 'Facebook Link', width: 200 },
    {
      field: 'cart',
      headerName: 'Products',
      width: 130,
      valueGetter: (value, row) => {
        const cart = JSON.parse(value)
        
        return (
          cart.map((item) => {

            return (
              `  ${item.product_id} x ${item.quantity}`
            )
          })
        )
      },
    },
    
  ]

  const handleClick = (event, id) => {
    setAnchorEl(id);
    const order = mapState.get(id);
    order.forEach(async (el) => {
      getProductInfo(el.product_id)
      .then((data) => {
        setOrderInfo((prevState) => {
          const newState = [...prevState]
          newState.push({
            coverImage: data.coverImage[0],
            quantity: el.quantity,
            productName: data.title,
            price: data.salePrice ? data.salePrice : data.price 
          })
          return (newState)
        })
      })})
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOrderInfo([])
  };

  const paginationModel = { page: 0, pageSize: 5 }

  return (
    <Layout preview={false} loading={false}>
      <h1 className={styles.heading}>Dashboard</h1>
      <div className={styles.tableContainer}>
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
          slots={{ toolbar: GridToolbar }}
            rows={decryptedOrders}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowClick={(params) => handleClick(params, params.id)} 
            sx={{ border: 0 }}
          />
        </Paper>
      <OrderModal open={open} handleClose={handleClose} orderInfo={orderInfo} />
      </div>
      <button className={styles.button} onClick={() => signOutUser()}>
        Sign Out
      </button>
    </Layout>
  )
}

export default Dashboard




















// import Layout from 'components/BlogLayout'
// import { admin } from 'lib/firebaseAdmin'
// import { GetServerSideProps } from 'next'
// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import { signOutUser, getOrders } from 'lib/firebase'
// import { useRouter } from 'next/router'

// import styles from './dashboard.module.scss'
// import { auth } from 'lib/firebase'
// // import EmailForm from 'components/EmailForm'

// import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid'
// import Paper from '@mui/material/Paper'
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// const Dashboard = ({ token }) => {
//   const [orders, setOrders] = useState([])
//   const [decryptedOrders, setDecryptedOrders] = useState([])

//   const [mapState, setMapState] = useState(new Map());
//   const [orderInfo, setOrderInfo] = useState([]);
//   const [open, setOpen] = useState(false);

//    const router = useRouter()

//   // Add a new key-value pair
//   const addEntry = (key, value) => {
//     setMapState((prevMap) => {
//       const newMap = new Map(prevMap); // Create a new Map instance
//       newMap.set(key, value); // Modify the Map
//       return newMap; // Return the updated Map
//     });
//   };

//   // Remove a key-value pair
//   const removeEntry = (key, value) => {
//     setMapState((prevMap) => {
//       const newMap = new Map(prevMap);
//       newMap.delete(key);
//       return newMap;
//     });
//   };

//   useEffect(() => {
//     if (!auth || !auth.currentUser || !auth.currentUser.isAdmin)
//       router.push('/')
//     getOrders()
//       .then((res) => {
//         setOrders(res)
//       })
//       .catch((err) => {
//         console.log(err)
//         router.push('/')
//       })
//   }, [])

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
//       if (currentUser) {
//         const idToken = await currentUser.getIdToken()
//         fetch('/api/decrypt', {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${idToken}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ orders }),
//         })
//           .then((res) => res.json())
//           .then((res) => {
//             console.log(res)
//             setDecryptedOrders(res)
//           })
//           .catch((err) => {
//             console.log(err)
//             router.push('/')
//           })
//       }
//     })
//     return () => unsubscribe() // Cleanup listener on unmount
//   }, [orders])

//   const convertDate = (date) => {
//     const milliseconds = date.seconds * 1000 + date.nanoseconds / 1000000
//     const dateObj = new Date(milliseconds)
//     const day = String(dateObj.getDate()).padStart(2, '0')
//     const month = String(dateObj.getMonth() + 1).padStart(2, '0') // Month is 0-indexed
//     const year = dateObj.getFullYear()
//     const formattedDate = `${day}.${month}.${year}`
//     return formattedDate
//   }
  
//   const getProductInfo = async (id) => {
//     try {
//       const res = await fetch(`/api/getProductById?id=${id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await res.json();
//       return data[0]|| 'Unknown Product';
//     } catch (err) {
//       console.log(err);
//       return 'Error fetching product';
//     }
//   };

//   useEffect(() => {
//     const fetchProductNames = async () => {
//       const orders = new Map()
//       decryptedOrders.forEach(async (row) => {
//         const products = JSON.parse(row.cart);
//         addEntry(row.id, products)
//       });
//       // setProductNames(names);
//     };

//     fetchProductNames();
//   }, [decryptedOrders]);
  

//   const columns: GridColDef[] = [
//     { field: 'id', headerName: 'Order ID', width: 130 },
//     { field: 'name', headerName: 'Name', width: 130 },
//     { field: 'email', headerName: 'Email', width: 230 },
//     { field: 'phone', headerName: 'Phone number', width: 200 },
//     { field: 'address', headerName: 'Address', width: 130 },
//     {
//       field: 'dateAdded',
//       headerName: 'Date',
//       width: 130,
//       valueGetter: (value, row) => `${convertDate(value)}`,
//     }
//   ]

//   const handleOpen = () => {
//     setOpen(true);
//   }
//   const handleClose = () => setOpen(false);
  
//   const handleRowClick = async (data) => {
//     handleOpen()
//     const id = data.id
//     const order = mapState.get(id)
//     const orderData = []
//     order.forEach( async (el) => {
//       const productInfo = getProductInfo(el.product_id)
//       .then((data) => {
//         console.log("data: ", data)
//         setOrderInfo((prevState) => {
//           const newState = [...prevState]
//           newState.push({
//             coverImage: data.coverImage[0],
//             quantity: el.quantity,
//             productName: data.title,
//             price: data.salePrice ? data.salePrice : data.price 
//           })
//           return (newState)
//         })
//       })})
//     //   console.log("product info: ",productInfo)
//     //   orderData.push({
//     //     coverImage: productInfo.coverImage[0],
//     //     quantity: el.quantity,
//     //     productName: productInfo.title,
//     //     price: productInfo.salePrice ? productInfo.salePrice : productInfo.price 
//     //   })
//     // });
//     // setOrderInfo(orderData)
//     // console.log("data: ",orderData)
//   }


//   const paginationModel = { page: 0, pageSize: 5 }

//   return (
//     <Layout preview={false} loading={false}>
//       <h1 className={styles.heading}>Dashboard</h1>
//       <div className={styles.tableContainer}>
//         <Paper sx={{ height: 400, width: '100%' }}>
//           <DataGrid
//           slots={{ toolbar: GridToolbar }}
//             rows={decryptedOrders}
//             columns={columns}
//             initialState={{ pagination: { paginationModel } }}
//             pageSizeOptions={[5, 10]}
//             // checkboxSelection
//             onRowClick={handleRowClick} 
//             sx={{ border: 0 }}
//           />
//         </Paper>
//         <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={
//           {
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             border: '2px solid #000',
//             boxShadow: 24,
//             p: 4,
//           }
//         }>
//           <Typography id="modal-modal-title" variant="h4" component="h1">
//             Order details
//             {orderInfo.length ? <>
//               <Typography id="modal-modal-title" variant="h6" component="div">here{orderInfo[0].productName}</Typography>
            
//             </> : <>Loading...</>}
//           </Typography>

//         </Box>
//       </Modal>
//       </div>
//       <button className={styles.button} onClick={() => signOutUser()}>
//         Sign Out
//       </button>
//     </Layout>
//   )
// }

// export default Dashboard

{
  /* <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.userName}>Order ID</th>
            <th className={styles.userName}>Name</th>
            <th className={styles.userSurname}>Surname</th>
            <th className={styles.userEmail}>Email</th>
            <th className={styles.userPhone}>Phone number</th>
            <th className={styles.userPhone}>Address</th>
            <th className={styles.userPhone}>Order date</th>
            <th className={styles.userPhone}>Cart</th>
          </tr>
        </thead>
        <tbody>
          {decryptedOrders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.surname}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.address}</td>
                <td>{convertDate(order.dateAdded)}</td>
                <td>{order.cart}</td>
              </tr>
            )
          })}
        </tbody>
      </table> */
}

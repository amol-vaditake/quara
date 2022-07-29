/* eslint-disable react/prop-types */
import * as React from 'react'
import { Grid, Paper } from '@material-ui/core'
import Loader from '../Loader'
import DeleteIcon from '@material-ui/icons/Delete'
import Axios from 'axios'
import { toast } from "react-toastify";
import Modal from '../Modal'
const apiURL = process.env.REACT_APP_API_URL

export default function CategoriesTable({ categories = [], fetch, setFetch }) {
  async function onDelete(id) {
    await Axios.post(`${apiURL}/api/categories/delete`, { id })
    setFetch(!fetch)
		toast.success("Category deleted successfully!")
  }
	let [image,setImage] = React.useState(null)
  return (
    <Paper elevation={4}>
      {categories?.length ? (
        <>
          <Grid
            container
            justifyContent='center'
            alignItems='center'
            style={{
              textAlign: 'center',
              fontWeight: 700,
              height: '5rem',
              borderBottom: '2px solid rgb(255, 137, 130)',
              borderTop: '2px solid rgb(255, 137, 130)',
              fontSize: '18px'
            }}
          >
            <Grid item xs={3} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '7rem' }}>
              Date
            </Grid>
            <Grid item xs={4} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '7rem' }}>
              Name
            </Grid>
						<Grid item xs={3} style={{ borderRight: '2px solid rgb(255, 137, 130)', lineHeight: '7rem' }}>
              Image
            </Grid>
            <Grid item xs={2} style={{ lineHeight: '7rem' }}>
              Delete
            </Grid>
          </Grid>
          <Grid container justifyContent='center' alignItems='center' style={{ textAlign: 'center' }}>
            {(categories || []).map((c, i) => {
              return (
                <>
                  <Grid
                    item
                    xs={3}
                    style={{
                      ...(i !== categories.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                      borderRight: '2px solid rgb(255, 137, 130)',
                      lineHeight: '6rem'
                    }}
                    title={new Date(c.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  >
                    {new Date(c.date).toDateString()}
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    style={{
                      borderRight: '2px solid rgb(255, 137, 130)',
                      ...(i !== categories.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                      lineHeight: '6rem'
                    }}
                  >
                    {c.name}
                  </Grid>
									<Grid
                    item
                    xs={3}
                    style={{
											padding:'8px',
                      borderRight: '2px solid rgb(255, 137, 130)',
                      ...(i !== categories.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                      lineHeight: '6rem'
                    }}
                  >
                    <img style={{width:'65%'}} onClick={()=>setImage(c.image)} src={c.image}  alt='img' title='Click to see full image'/>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{
                      ...(i !== categories.length - 1 ? { borderBottom: '2px solid rgb(255, 137, 130)' } : {}),
                      lineHeight: '6rem'
                    }}
                  >
                    <DeleteIcon size='small' style={{ cursor: 'pointer' }} onClick={() => onDelete(c._id)} />
                  </Grid>
                </>
              )
            })}
          </Grid>
        </>
      ) : (
        <>
          <h6 style={{ textAlign: 'center' }}>No Categories Found</h6>
          <Loader />
        </>
      )}
			<Modal
          isOpen={Boolean(image)}
          onClose={() => setImage(null)}
					width='50rem'
        >
					<img style={{width:'100%'}} src={image}  alt='img'/>
        </Modal>
    </Paper>
  )
}

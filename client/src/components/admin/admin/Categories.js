import React, { useState } from 'react'
import { Button, Grid, Paper } from '@material-ui/core'
import AddAndEditCategories from './AddAndEditCategories'
import Modal from '../Modal'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import CategoriesTable from './CategoriesTable'
const apiURL = process.env.REACT_APP_API_URL

export default function CategoriesList() {
  const [add, setAdd] = useState(false)
  const [fetch, setFetch] = useState(false)
  const [categories, setCategories] = useState(null)
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }
  useEffect(() => {
    axios.get(`${apiURL}/api/categories/get`).then(function (response) {
      setCategories(response.data?.categories || [])
    })
  }, [add, fetch])

  return (
    <Grid style={{ padding: '5%', paddingLeft: '20%', paddingRight: '20%', textAlign: 'center' }}>
      <Grid style={{ marginRight: '10%', marginLeft: '10%', border: '2px solid rgb(255, 137, 130)' }}>
        <Paper elevation={4}>
          <Grid container justifyContent='center' alignItems='center'>
            <Grid item md={4} sm={4} lg={4} style={{ textAlign: 'center', fontFamily: 'system-ui' }}>
              <Button variant='contained' size='small' onClick={() => goToTheRoute('/dashboard')}>
                Go To Dashboard
              </Button>
            </Grid>
            <Grid item md={4} sm={4} lg={4} style={{ textAlign: 'center', fontFamily: 'system-ui' }}>
              <h2>Categories List</h2>
            </Grid>
            <Grid item md={4} sm={4} lg={4}>
              <Button variant='contained' size='small' onClick={() => setAdd(true)}>
                Add Category
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Grid>
          <CategoriesTable categories={categories} fetch={fetch} setFetch={setFetch} />
        </Grid>
        <Modal
          isOpen={add}
          onClose={() => {
            setAdd(false)
          }}
        >
          <AddAndEditCategories
            onClose={() => {
              setAdd(false)
            }}
          />
        </Modal>
      </Grid>
    </Grid>
  )
}

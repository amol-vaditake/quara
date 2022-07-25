import React from 'react'
import { Button, Grid, Paper, Typography } from '@material-ui/core'

import { useNavigate } from 'react-router-dom'

export default function UsersList() {
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }

  return (
    <Grid style={{ paddingLeft: '15%', paddingRight: '15%',paddingTop:'5%'}}>
      <Paper elevation={4}>
        <Grid container justifyContent='center' alignItems='center'>
          <Grid item xs={12}>
            <Typography style={{ fontSize: '24px', textAlign: 'center', fontWeight: 450, padding: 10 }}>Dashboard for Admins</Typography>
          </Grid>
          <Grid item xs={12} container justifyContent='center' style={{ textAlign: 'center', margin: '20px' }}>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>
              <Button color='primary' variant='contained' style={{ textDecoration: 'none' }} onClick={() => goToTheRoute('/admin/categories')}>
                Categories
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button color='primary' variant='contained' style={{ textDecoration: 'none' }} onClick={() => goToTheRoute('/admin/dashboard')}>
                Dashboard
              </Button>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

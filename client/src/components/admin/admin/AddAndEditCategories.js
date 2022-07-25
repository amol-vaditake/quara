import React, { useState } from 'react'
import { Formik, Form, getIn, FieldArray } from 'formik'
import { Button, Grid, TextField } from '@material-ui/core'
import Loader from '../Loader'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Axios from 'axios'
const apiURL = process.env.REACT_APP_API_URL

// eslint-disable-next-line react/prop-types
export default function AddAndEdit({ onClose }) {
  const [loading, setLoading] = useState(false)

  async function addCategory(data) {
    setLoading(true)
    await Axios.post(`${apiURL}/api/categories/add`, data)
    setLoading(false)
    onClose && onClose()
  }

  return (
    <Grid>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2>Add Categories</h2>
          <Formik
            initialValues={{
              categories: [{}]
            }}
            onSubmit={addCategory}
            render={({ values, touched, errors, handleChange, handleBlur }) => (
              <Form>
                <FieldArray name='categories'>
                  {({ push, remove }) => (
                    <Grid>
                      {values.categories.map((p, index) => {
                        const name = `categories[${index}].name`
                        const touchedName = getIn(touched, name)
                        const errorName = getIn(errors, name)

                        return (
                          <Grid container key={p.id} spacing={2} alignItems='center'>
                            <Grid item lg={6} sm={12} md={12}>
                              <TextField
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                label='Name '
                                name={name}
                                value={p.name}
                                required
                                helperText={touchedName && errorName ? errorName : ''}
                                error={Boolean(touchedName && errorName)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                size='small'
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} lg={4} style={{ cursor: 'pointer' }}>
                              <AddIcon onClick={() => push({ acNo: '', name: '' })} />
                              {index !== 0 && <DeleteIcon onClick={() => remove(index)} />}
                            </Grid>
                          </Grid>
                        )
                      })}
                      <Grid container item xs={12} justifyContent='flex-end'>
                        <Button type='submit' variant='contained' color='secondary'>
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </FieldArray>
              </Form>
            )}
          />
        </>
      )}
    </Grid>
  )
}

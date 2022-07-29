import React, { useState } from 'react'
import { Formik, Form, getIn, FieldArray } from 'formik'
import { Button, Grid, makeStyles, TextField } from '@material-ui/core'
import Loader from '../Loader'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Axios from 'axios'
import FileBase64 from 'react-file-base64';
import { toast } from "react-toastify";
const apiURL = process.env.REACT_APP_API_URL

const useStyles = makeStyles({
  root: {
    "&&&:before": {
      borderBottom: "none"
    },
    "&&&:after": {
      borderBottom: "none"
    }
  },
});

// eslint-disable-next-line react/prop-types
export default function AddAndEdit({ onClose }) {
  const [loading, setLoading] = useState(false)
	const classes = useStyles();

  async function addCategory(data) {
		if((data.categories||[]).find(d=> !Boolean(d.image))) {
			toast.error("Please select the image for every category!")
			return 
		}
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
          <h4>Add Categories</h4>
          <Formik
            initialValues={{
              categories: [{}]
            }}
            onSubmit={addCategory}
            render={({ values, touched, errors, handleChange, handleBlur,setFieldValue }) => (
              <Form>
                <FieldArray name='categories'>
                  {({ push, remove }) => (
                    <Grid>
                      {values.categories.map((p, index) => {
                        const name = `categories[${index}].name`
                        const touchedName = getIn(touched, name)
                        const errorName = getIn(errors, name)
												const file = `categories[${index}].image`

                        return (
                          <Grid container key={p.id} spacing={2} alignItems='center'>
                            <Grid item lg={5} sm={12} md={12}>
                              <TextField
															  InputProps={{ classes }}
																inputProps={{style: { marginLeft: '20px',borderBottom:'none' }}}
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
														<Grid item lg={5} sm={12} md={12}>
															<FileBase64
															  label='Image'
																type="file"
																multiple={false}
																onDone={({ base64 }) => setFieldValue(file,base64)}
																/>
														</Grid>
                            <Grid item xs={12} sm={12} lg={2} style={{ cursor: 'pointer' }}>
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

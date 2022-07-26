import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createQuestion } from "../../../actions/postActions";
import "./ask.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Card, Grid, List, ListItem, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import CategoryList from './CategoryList'
const apiURL = process.env.REACT_APP_API_URL

function Ask({ questions, re, setRe ,isCategoryPage, categoryId}) {
  let navigate = useNavigate()

	const auth = useSelector(state => state.auth)

  function goToTheRoute(route) {
    navigate(route)
  }
  const [question, setQuestion] = useState()
	const [category, setCategory] = useState()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [categories, setCategories] = useState([])

  useEffect(() => {
		axios.get(`${apiURL}/api/categories/get`).then(function (response) {
		setCategories([{name:'Select Category'}, ...response.data?.categories] || [])})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || question === '') {
      setError("Please type your question!")
      return
    }
			
		if(!auth?.isAuthenticated){
			toast.error("Please login first to post question!")
			return 
		}

		if((!category && !isCategoryPage)){
			toast.error("Please select category of question")
			return 
		}
		if(isCategoryPage){
			createQuestion(question,categoryId)
      .then(res => {
				toast.success("Question created!")
        setQuestion('')
				document.getElementById("myForm").reset();
        setRe(!re)
      })
      .catch(err => {
        toast.error("Error in posting question!")
      })
      .finally(() => {
        setLoading(false)
      }
		  )
		}
		else{
    setLoading(true)
    createQuestion(question,category)
      .then(res => {
        setQuestion('')
				document.getElementById("myForm").reset();
        toast.success("Question created!")
        setRe(!re)
      })
      .catch(err => {
        console.log(err)
        toast.error("Error in posting question!")
      })
      .finally(() => {
        setLoading(false)
      }
		)
	}
  }
  return (
    <React.Fragment>
      <div className="askComp">
        <form onSubmit={handleSubmit} id='myForm'>
					<Grid container>
          <div
					  style={{ width: !isCategoryPage?"400px":'800px', marginRight: "10px" }}
            className="input-field col s12"
          >
            <input id="name" type="text" onChange={(e) => { setError(''); setQuestion(e.target.value) }} />					
            {
              error !== '' ?
                <Typography variant="caption" color="error">
                  {error}
                </Typography>
                :
                null
            }
            <label htmlFor="name">Ask what you want ?</label>
          </div>
					{!isCategoryPage &&<div
					  style={{ width: "400px", marginRight: "10px" }}
            className="input-field col s12"
          >
            {categories.length?<select
						required
						name='category'
						label='Category'
						value={category}
						style={{display:'block'}}
						onChange={(e) => { setError(''); setCategory(e.target.value) }}
						>
							{(categories||[]).map(c=>{return<option value={c._id}> {c.name}</option>})}
						</select>:''}
          </div>}
					</Grid>
					<div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                  marginLeft: "auto",
                  background: "#b92b27",
                  marginRight: "auto",
                }}
                disabled={loading}
                type="submit"
                className="btn btn-small waves-effect waves-light hoverable  accent-3"
              >
                {
                  loading ?
                    <CircularProgress size={"20px"} />
                    :
                    null
                }
                Ask Question
              </button>
            </div>
            <div
              style={{
                display: "flex",
                width: "400px",
                justifyContent: "space-around",
                marginTop: "20px",
              }}
            >
              <img style={{ height: "20px" }} alt='img' src={require('../Ask/cm.jpg')} />
              <img style={{ height: "30px" }} alt='img' src={require('../Ask/edit.png')} />
              <img style={{ height: "30px" }} alt='img' src={require('../Ask/cm.jpg')} />
            </div>
        </form>
				{(categories||[]).filter(c=>Boolean(c._id)).length ?
				<Grid style={{fontWeight:'500',color:'#b92b27'}}>
				  <h5>Categories</h5>
					<CategoryList categories={(categories||[]).filter(c=>Boolean(c._id))}/>
				</Grid>
				:''}
        <List>
					{(!isCategoryPage && questions?.length) && <h5 style={{color:'#5B84B1FF'}}>All categories Questions</h5>}
          {
            questions && questions.map(q =>{
							if(q.fromAdmins) return {...q, author:q.fromAdmins}
							return {...q, author:q.fromUsers}
						}).map((item, index) => (
              <ListItem style={{ marginTop: 24 }}>
                <Card style={{ padding: 24, width: "100%", cursor:"pointer" }} onClick={()=>{ goToTheRoute(`/questions/${item._id}/answers`)}}>
                  <Typography variant="h5"><strong>{item.question}</strong></Typography>
									<Grid container>
										<Grid item xs={4}>
										<Typography variant="subtitle1">Asked by: <strong>{item.author && item.author.name}</strong></Typography>
										</Grid>
										<Grid item xs={8}>
										<Typography variant="subtitle1">Category: <strong>{item.categoryId && item.categoryId.name}</strong></Typography>
										</Grid>
									</Grid>
                </Card>
              </ListItem>
            ))
          }
        </List>
				{isCategoryPage && !questions?.length && <h6>No Questions Created in this category!!</h6>}
        {/* <h3> Ask</h3> */}
      </div>
    </React.Fragment>
  );
}

export default Ask;

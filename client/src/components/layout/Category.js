import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.scss";
import Ask from "./Ask/Ask";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";
import { fetchQuestionsByCategory } from "../../actions/postActions";
import { toast } from "react-toastify";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from 'axios';
const apiURL = process.env.REACT_APP_API_URL

function Home({ match }) {
  const location = useLocation();
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }

  let params = new URLSearchParams(location.search);
  let queryPage = params.get("page");
	let {categoryId} = useParams()
  if (!queryPage) queryPage = 1;

  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(queryPage);
  const [re, setRe] = useState(false);
  const fetchQs = () =>
    fetchQuestionsByCategory(page,categoryId)
      .then((res) => {
        setQuestions(res);
      })
      .catch((err) => {
        toast.error("Failed to fetch questions, Please login first");
      }
	);
	const [categories, setCategories] = useState([])

  useEffect(() => {
		axios.get(`${apiURL}/api/categories/get`).then(function (response) {
		setCategories([{name:'Select Category'}, ...response.data?.categories] || [])})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchQs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, re , categoryId]);

  return (
    <React.Fragment>
      <div className="homeContainer">
			{ 
				(categories?.length) &&<Grid style={{color:'#b92b27', fontWeight:'700', marginLeft:'17%',marginTop:'3%'}}>
					<h5><b style={{color:'#5B84B1FF'}}>Category:</b> {categories.find(c=>c._id === categoryId).name}</h5>
				</Grid>
			}
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "22rem",
          }}
        >
          <Grid item xs={12} md={8}>
            <Ask questions={questions.docs} setRe={setRe} re={re} isCategoryPage categoryId={categoryId}/>
            <Pagination
              count={questions.totalPages}
              page={questions.page ? questions.page : 1}
              onChange={(event, value) => {
                setPage(value);
                goToTheRoute(`/category/${categoryId}?page=${JSON.stringify(value)}`);
              }}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Home;

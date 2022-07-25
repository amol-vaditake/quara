import React, { useState, useEffect } from "react";
import Axios from "axios";
import HomePageSlider from "./HomePageSlider";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.scss";
import Ask from "./Ask/Ask";
import Pagination from "@material-ui/lab/Pagination";
import { Grid } from "@material-ui/core";
import { fetchQuestions } from "../../actions/postActions";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const apiURL = process.env.REACT_APP_API_URL;

function Home({ match }) {
  const location = useLocation();
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }

  const { isAuthenticated } = useSelector((state) => state.auth);
  let params = new URLSearchParams(location.search);
  let queryPage = params.get("page");
  if (!queryPage) queryPage = 1;

  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(queryPage);
  const [re, setRe] = useState(false);
  const fetchQs = () =>
    fetchQuestions(page)
      .then((res) => {
        setQuestions(res);
      })
      .catch((err) => {
        toast.error("Failed to fetch questions, Please login first");
      });
  useEffect(() => {
    if (isAuthenticated) fetchQs();
    else goToTheRoute("/");
  }, [page, re]);

  return (
    <React.Fragment>
      {/* <HomePageSlider/> */}
      {/* <img className="sliderClass" src="slider.gif" alt="slider"/> */}

      <div className="backCont">
        <h3>Where Amazing Ideas Are<br/> Born</h3>
      </div>

      <div className="homeContainer">
        {/* <h3>Daily Facts</h3>
        <Carousel autoPlay>
          <div>
            <p>
              Why is the United States an essential and indispensable partner in
              India’s modernization with other options such as Europe and Japan?
            </p>
            <img src="im1.jpg" />
          </div>
          <div>
            <p>
              Why is the metric system widely used across the world? What makes
              it easy to use?
            </p>
            <img src="im2.jpg" />
          </div>
          <div>
            <p>
              Why is the United States an essential and indispensable partner in
              India’s modernization with other options such as Europe and Japan?
            </p>
            <img src="im3.jpg" />
          </div>
        </Carousel> */}

        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "22rem",
          }}
        >
          <Grid item xs={12} md={8}>
            <Ask questions={questions.docs} setRe={setRe} re={re} />
            <Pagination
              count={questions.totalPages}
              page={questions.page ? questions.page : 1}
              onChange={(event, value) => {
                setPage(value);
                goToTheRoute(`/?page=${JSON.stringify(value)}`);
              }}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Home;

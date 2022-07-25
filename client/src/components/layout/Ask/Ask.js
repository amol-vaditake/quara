import React, { useState } from "react";
import { toast } from "react-toastify";
import { createQuestion } from "../../../actions/postActions";
import "./ask.scss";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Card, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function Ask({ questions, re, setRe }) {
  let navigate = useNavigate()

  function goToTheRoute(route) {
    navigate(route)
  }
  const [question, setQuestion] = useState()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || question === '') {
      setError("Please type your question!")
      return
    }
    setLoading(true)
    createQuestion(question)
      .then(res => {
        setQuestion('')
        toast.success("Question created!")
        setRe(!re)
      })
      .catch(err => {
        console.log(err)
        toast.error("Error in posting question!")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <React.Fragment>
      {/* <img style={{width:"80px"}} src="im1.jpg" /> */}
      <div className="askComp">
        {/* <h3 style={{textAlign:"center",backgroundColor:"#4a4a4a"}}>Recently Added</h3> */}
        {/* <input type="name" placeholder="ask what you want?"/> */}
        <form onSubmit={handleSubmit}>
          <div
            style={{ width: "400px", marginRight: "auto" }}
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
            {/* <button style={{}}>Add Question</button> */}
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
              <img style={{ height: "20px" }} src="mes.png" />
              <img style={{ height: "30px" }} src="edit.png" />
              <img style={{ height: "30px" }} src="cm.png" />
            </div>
          </div>
        </form>

        <List>
          {
            questions && questions.map((item, index) => (
              <ListItem style={{ marginTop: 24 }}>
                <Card style={{ padding: 24, width: "100%", cursor:"pointer" }} onClick={()=>{ goToTheRoute(`/questions/${item._id}/answers`)}}>
                  <Typography variant="h5"><strong>{item.question}</strong></Typography>
                  <Typography variant="subtitle1">Asked by: <strong>{item.author && item.author.name}</strong></Typography>
                </Card>
              </ListItem>
            ))
          }
        </List>
        {/* <h3> Ask</h3> */}
      </div>
    </React.Fragment>
  );
}

export default Ask;

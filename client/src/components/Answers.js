import { Card, List, Grid, ListItem, ListItemAvatar, ListItemText, Typography, TextField, CircularProgress, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import UserIcon from '@material-ui/icons/AccountCircle';
import store from "../store";
import { logoutUser } from "../actions/authActions";
import { fetchAnswersOfQuestion, postAnswer } from "../actions/postActions";
import { toast } from "react-toastify";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { useParams } from 'react-router-dom';

export default function Answers({ match }) {
	  console.log(match)
    const { user } = useSelector(state => state.auth)
    const [question, setQuestion] = useState(null)
    const [answers, setAnswers] = useState([])
    const [error, setError] = useState('')
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)
    const [re, setRe] = useState(false)
		let {question: questionId} = useParams()

		console.log(questionId)
		
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!answer || answer === '') {
            setError("Please type your question!")
            return
        }
        setLoading(true)
        postAnswer(question._id, answer)
            .then(res => {
                setAnswer('')
                toast.success("Answer Posted!")
                setRe(!re)
            })
            .catch(err => {
                console.log(err)
                toast.error("Error in posting Answer!")
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        fetchAnswersOfQuestion(questionId)
            .then(data => {
                setQuestion(data.question)
                setAnswers(data.answers)
            })
    }, [re])

    const playAudio = (audio) => {
        let aud = new Audio(audio)
        aud.play()
    }
    return (
        <>
            <Grid container style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
                <Grid item xs={12} md={8} lg={6}>

                    <Card style={{ width: "100%", padding: 24, borderRadius: 24 }}>
                        <Typography variant="h5" style={{ fontWeight: 700 }}>
                            {question && question.question}
                        </Typography>
                        <Typography variant="subtitle1">Asked by: <strong>{question && question.author && question.author.name}</strong></Typography>

                        <form onSubmit={handleSubmit}>
                            <div
                                style={{ width: "400px", marginRight: "auto" }}
                                className="input-field col s12"
                            >
                                <input id="name" type="text" onChange={(e) => { setError(''); setAnswer(e.target.value) }} />
                                {
                                    error !== '' ?
                                        <Typography variant="caption" color="error">
                                            {error}
                                        </Typography>
                                        :
                                        null
                                }

                                <label htmlFor="name">Answer this Question</label>
                                {/* <button style={{}}>Add Question</button> */}
                                <div className="col" >
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
                                        Submit Answer
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Card>
                    <Typography variant="h5" style={{ marginTop: 24, marginLeft: 12 }}>Answers</Typography>
                    {
                        answers && answers.length > 0 && answers.map((item, index) => (
                            <Card key={'answer' + index} style={{ width: "100%", padding: 24, borderRadius: 24, marginBottom: 18 }}>
                                <Typography variant="h6">
                                    {item.answer}
                                </Typography>
                                <Typography variant="subtitle1">
                                    Answered By: {item.author && item.author.name}
                                </Typography>
                                {item.audio ?
                                    <IconButton onClick={() => playAudio(item.audio)} title="Listen">
                                        <VolumeUpIcon />
                                    </IconButton>
                                    : null
                                }

                            </Card>
                        ))
                    }
                    {
                        !answers || answers.length === 0 && (
                            <Card style={{ width: "100%", padding: 24, borderRadius: 24, marginBottom: 18 }}>
                                <Typography variant="h6">
                                    No answers yet!
                                </Typography>
                            </Card>
                        )
                    }
                </Grid>
            </Grid>
        </>
    )
}
import axios from "axios";

const createQuestion = (question ,categoryId) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/users/questions`, { question ,categoryId})
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const postAnswer = (questionId, answer) => {
    return new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/users/questions/${questionId}/answer`, { answer })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}

const fetchQuestions = (page) => {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/users/questions?page=${page}`)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

const fetchAnswersOfQuestion = (question) => {
    return new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/users/questions/${question}/answers`)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export {
    createQuestion,
    postAnswer,
    fetchQuestions,
    fetchAnswersOfQuestion
}
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');


const projectId = "how2voice";
const keyFilename = "how2voice-28f683205fdc.json";
const client = new textToSpeech.TextToSpeechClient({ projectId, keyFilename });

const PostQuestion = async (req, res) => {
    try {
        let question = await Question.create({ ...req.body, author: req.user.id })
        return res.json({ message: "", question })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Some error occured!" })
    }
}

const PostAnswer = async (req, res) => {
    try {
        let question = await Question.findOne({ _id: req.params.questionId })
        if (!question)
            return res.status(404).json({ error: "Question not found!" })

        // Performs the text-to-speech request

        // Write the binary audio content to a local file
        let answer = await Answer.create({ ...req.body, question: question._id, author: req.user.id })
        // const writeFile = util.promisify(fs.writeFile);
        try {
            const [response] = await client.synthesizeSpeech(request);

            const request = {
                input: { text: req.body.answer },
                voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
                audioConfig: { audioEncoding: 'MP3' },
            };
            await fs.writeFileSync(`audios/${answer._id}.mp3`, response.audioContent, 'binary');
            answer.audio = `/audios/${answer._id}.mp3`
            answer.save()
        } catch (error) {
            console.log("Error in text to speech", error)
        }
        return res.json({ message: "Answer created", answer })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Some error occured!" })
    }
}

const FetchQA = async (req, res) => {
    try {
        Question.paginate({}, { populate: ["author"], lean: true, sort: { _id: -1 }, page: req.query.page ?? 1, limit: 5 })
            .then(results => {
                return res.json(results)
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Some error occured!" })
    }
}

const FetchAnswersOfQuestion = async (req, res) => {
    try {
        let question = await Question.findOne({ _id: req.params.questionId }).populate("author")
        let answers = await Answer.find({ question: req.params.questionId }).sort({ _id: -1 }).populate("author")
        return res.json({ question, answers })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Some error ocurred!" })
    }
}

const TextToSpeech = async (req, res) => {
    const text = 'hello, world!';

    // Construct the request
    const request = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile('autdios/output.mp3', response.audioContent, 'binary');
    console.log('Audio content written to file: output.mp3');
}

module.exports = {
    PostQuestion,
    PostAnswer,
    FetchQA,
    FetchAnswersOfQuestion
}
import express from 'express'
import bodyParser from 'body-parser'
import { readJson } from './utils/readJson.js'
import { writeJson } from './utils/writeJson.js'
import { updateJson } from './utils/updateJson.js'
import path from 'path'
import {fileURLToPath} from 'url';

const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const app = express();
const port = process.env.PORT || 3000;
let bearerToken;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html')); 
});

app.get('/api/folders/:folderName', (req, res) => {
    if(!req.headers.authorization){
        return res.status(403).json({ error: 'No credentials sent!' });
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    let messagesList = readJson('folders', req.params.folderName);
    res.status(200).json(messagesList)
});

app.get('/api/messages/:messageId', (req, res) => {
    if(!req.headers.authorization){
        return res.status(403).json({ error: 'No credentials sent!' });
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    let messageContent = readJson('messages', req.params.messageId);
    res.status(200).json(messageContent)
});

app.post('/api/login', (req, res) => {
    const { userName, password } = req.body
    bearerToken = Buffer.from(`${userName}:${password}`).toString('base64')
    const response = {
        responseMessage: 'Login Success',
        bearerToken: bearerToken
    }
    res.status(200).json(response)
})

app.post('/api/sendMessage',(req,res) => {
    if(!req.headers.authorization){
        return res.status(403).json({ error: 'No credentials sent!' });
    }
    const id = Math.random().toString(36).slice(2)
    const {to, content, subject, date} = req.body
    let listContent = {
        messageId: id,
        from: 'test@gmail.com',
        subject: subject
    }
    let messageContent = {
        from: 'test@gmail.com',
        id: id,
        subject: subject,
        body: content,
        to: to,
        date: date
    }
    let response = {
        responseMessage: ''
    }
    
    try{
        updateJson('sent', listContent)
        writeJson(`${id}`, messageContent)
        response.responseMessage = "Message Sent!"
        res.status(200).json(response)
    } catch(e) {
        response.responseMessage= "Message Sent Failed!"
        res.status(400).json(response)
    }
});

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
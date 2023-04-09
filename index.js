import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];


app.get("/tweets", (req, res) => {
    const showTweets = []
    tweets.slice(-10).forEach((t) => {
        const showUser = users.find((u) => u.username === t.username)
        showTweets.push({
            username: t.username,
            avatar: showUser.avatar,
            tweet: t.tweet
        })
    })
    res.send([tweets])
})


app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;

    if(username !== "" && username !== undefined && avatar !== "" && avatar !== undefined && avatar.includes('http')){
        users.push({
            username,
            avatar
        });
        response.status(201).send("OK")
    } else {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
});


app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;

    if(username !== "" && username !== undefined && tweet !== "" && tweet !== undefined){
        tweets.push({
            username, 
            tweet
        });
        response.status(201).send("OK")
    } else {
        return response.status(400).send("Todos os campos são obrigatórios!")
    }
});

app.listen(5000);
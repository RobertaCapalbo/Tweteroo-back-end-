import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];


app.get("/tweets", (req, res) => {
    const tweetsList = []
    users.map((u) => {
        tweets.map((user) => {
            if (u.username === user.username) { tweetsList.push({ username: u.username, avatar: u.avatar, tweet: user.tweet }) }
        })
    }
    )
    if(tweetsList.length > 10) {
        const tenTweets = []
        for(let i = 0; i<10; i++ ){
            tenTweets.push(tweetsList[i])
        }
        res.send(tenTweets)
    } else{
        res.send(tweetsList)
    }
})


app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;

    if(username !== "" && username !== undefined && avatar !== "" && avatar !== undefined && avatar.includes('http')){
        users.push({
            username,
            avatar
        });
        res.status(201).send(users)
    } else {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }
});


app.post("/tweets", (req, res) => {
    const {username, tweet} = req.body;

    if(username !== "" && username !== undefined && tweet !== "" && tweet !== undefined && typeof(username) === "string" || typeof(tweet) === "string" && users.includes(username)){
        tweets.push({
            username, 
            tweet
        });
        res.status(201).send(tweets)
    } 
    else if(!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios!")
        return
    }
    else {
        res.status(401).send("UNAUTHORIZED")
        return
    }
});

app.listen(5000);
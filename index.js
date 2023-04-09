import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];


app.get("/tweets", (req, res) => {
    const final = []
    users.map((item) => {
        tweets.map((u) => {
            if (item.username === u.username) { final.push({ username: item.username, avatar: item.avatar, tweet: u.tweet }) }
        })
    }

    )

    if(final.length > 10) {
        const limiteTen = []
        for(let i = 0; i<10; i++ ){
            limiteTen.push(final[i])
        }
        res.send(limiteTen)
    } else{
        res.send(final)
    }
})


app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;

    if(username !== "" && username !== undefined && avatar !== "" && avatar !== undefined && avatar.includes('http')){
        users.push({
            username,
            avatar
        });
        res.status(201).send("OK")
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
        res.status(201).send("OK")
    } else {
        res.status(401).send("UNAUTHORIZED")
    }
});

app.listen(5000);
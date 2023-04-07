import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];


app.post("/sign-up", (req, res) => {
    const {username, avatar} = req.body;

    if(username !== "" && username !== undefined && avatar !== "" && avatar !== undefined && avatar.includes('http')){
        users.push({
            username,
            avatar
        });
        console.log('OK')
        res.send(users);
    } else {
        res.status(400).send({error: "Preencha todos os campos!"});
        return;
    }
});


app.post("/tweets", (req, res) => {
    tweets.push({
        username: "bobesponja",
        avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
        tweet: "Eu amo hambúrguer de siri!"
    });

    res.send([tweets])
});


app.get("/tweets", (req, res) => {
    res.send([tweets])
})


app.listen(5000);
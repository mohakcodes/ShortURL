const URL = require("../models/url");
const jwt = require("jsonwebtoken");

const randomId = () => {
    const x = "abcdefghij1234567890";
    let id = "";
    for(let i=0;i<8;i++){
        const randomIdx = Math.floor(Math.random() * x.length);
        id += x.charAt(randomIdx);
    }
    return id;
}   

const generateShortUrl = async(req,res) => {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error:"url is needed"});
    }
    let bodyurl = body.url;
    if (!bodyurl.startsWith('https://')) {
        bodyurl = 'https://' + bodyurl;
    }

    //check if user is logged in / not
    let token = req.header("cookie");
    console.log(req.headers['cookie']);
    if(!token){
        console.log("No token");
    }
    else{
        if (token.startsWith("token=")) {
            token = token.slice(6, token.length).trimLeft();
        }
        jwt.verify(token, process.env.SECRETKEY, async(err,data)=>{
            if(err){
                return res.status(403).json("Invalid Token");
            }
            console.log("data",data);
        })
    }

    const shortId = randomId();
    try {
        await URL.create({
            shortId:shortId,
            longUrl:bodyurl,
            visitHistory:[],
            ownerId:""
        });
        return res.json({id:shortId});
    } 
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

const fetchMainLink = async (req, res) => {
    const shortId = req.params.shortId;
    console.log("shortId", shortId);
    const curr = new Date();
    const time = curr.toLocaleString();

    try {
        const link = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: time,
                    },
                },
            },
            { new: true }
        );

        if (link) {
            res.redirect(link.longUrl);
        } 
        else {
            res.status(404).json({ error: 'Link not found' });
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const fetchStat = async(req,res) => {
    const shortId = req.params.shortId;
    try {
        const link = await URL.findOne({shortId});
        return res.json({
            totalClicks : link.visitHistory.length,
            stats : link.visitHistory
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const fetchStats = async(req,res) => {
    console.log("ok");
}

module.exports = {generateShortUrl, fetchMainLink, fetchStat, fetchStats};
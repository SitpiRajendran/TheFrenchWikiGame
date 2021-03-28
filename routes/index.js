const express = require('express');
const passport = require('passport');
const router = express.Router();
var fetch = require("node-fetch");
const delay = ms => new Promise(res => setTimeout(res, ms));

async function getRandomArticle(res) {
    var url = "https://fr.wikipedia.org/api/rest_v1/page/random/summary";
    var article = {
        pageid: undefined,
        title: undefined,
        canonical: undefined,
        thumbnail: undefined,
        description: undefined,
        next: undefined,
    };

    await fetch(url).then(async function (response) {
        if (response.status == 200)
            return response.json()
        else {
            console.log(response.status)
            await delay(5000).then(() => {
                res.redirect('/');
                console.log("ERROR")
                return;    
            });
        }
    }).then(function (response) {
        article.pageid = response.pageid;
        article.title = response.title;
        article.canonical = response.titles.canonical;
        article.url = response.content_urls.desktop.page;
        article.thumbnail = response.thumbnail.source;
        article.description = response.description;
    });
    console.log(article)
    return article;
}

router.get('/', async function (req, res) {
    await getRandomArticle(res).then(async (start_article) => {
        await getRandomArticle(res).then((end_article) => {
            res.render('index.ejs', { start: start_article, end: end_article })
        })
    });
});

module.exports = router;
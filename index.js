var fetch = require("node-fetch");

const delay = ms => new Promise(res => setTimeout(res, ms));

async function searchinWikipedia() {
    var item = 0;
    var article_depart = {
        pageid: undefined,
        title: undefined,
        thumbnail: undefined,
        description: undefined,
        next: undefined,
    }
    var url = "https://fr.wikipedia.org/api/rest_v1/page/random/summary"
    await fetch(url).then(function (response) { return response.json(); })
        .then(function (response) {
            article_depart.pageid = response.pageid;
            article_depart.title = response.title;
            article_depart.thumbnail = response.thumbnail.source;
            article_depart.description = response.description;
        });
    console.log("START : " + article_depart.title);
    
    var next_article = article_depart.title
    while (item != (Math.random() * (12 - 2) - 3)) {
        await fetch("https://fr.wikipedia.org/w/api.php?action=query&titles=" + next_article + "&prop=links&pllimit=max&format=json").then(function (response) { return response.json(); })
            .then(function (response) {
                var link_list = Object.values(response.query.pages)[0].links
                var random = parseInt(link_list.length * Math.random());
                next_article = link_list[random].title
                console.log(next_article);
            });
        item++;
        await delay(2000);
    }
}

searchinWikipedia();
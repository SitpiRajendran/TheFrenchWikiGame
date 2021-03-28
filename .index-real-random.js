var fetch = require("node-fetch");

async function searchinWikipedia() {
    var article_depart = {
        pageid: undefined,
        title: undefined,
        canonical: undefined,
        thumbnail: undefined,
        url: undefined,
        description: undefined,
        next: undefined,
    }

    var article_fin = {
        pageid: undefined,
        title: undefined,
        canonical: undefined,
        thumbnail: undefined,
        description: undefined,
        next: undefined,
    }

    var url = "https://fr.wikipedia.org/api/rest_v1/page/random/summary"

    await fetch(url).then(async function (response) {
        if (response.status == 200)
            return response.json()
        else {
            console.log(response)
            await delay(2000);
            console.log("OK BRO FIRST")
        }
    })
        .then(function (response) {
            article_depart.pageid = response.pageid;
            article_depart.title = response.title;
            article_depart.canonical = response.titles.canonical;
            article_depart.url = response.content_urls.desktop.page;
            article_depart.thumbnail = response.thumbnail.source;
            article_depart.description = response.description;
            console.log(article_depart)
        });

}

//searchinWikipedia();

// BACK LINKS

/* var backlinks = "https://fr.wikipedia.org/w/api.php?action=query&list=backlinks&blpageid=" + article_fin.pageid + "&bllimit=max&format=json";

await fetch(backlinks).then(async function (response) {
    if (response.status == 200)
        return response.json()
    else {
        console.log(response)
        await delay(2000);
        console.log("OK BRO BACKLINKS")
    }
}).then(function(response) {
    console.log(response)
}) */
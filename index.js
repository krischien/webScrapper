const PORT = 4500;
const axios = require('axios');
const express = require('express');
const cheerio = require('cheerio');
const { response } = require('express');


//initialize server (express) 
const app = express();


//start scrapping
//scrap URL 
const URL = 'https://www.theguardian.com/uk';
axios(URL)
        .then(response => {
                const data = response.data
                const $ = cheerio.load(data);
                const articles = []
                let newsCount = 0;

                $('.fc-item__title',data).each(function(){
                    const title = $(this).text();
                    const URL = $(this).find('a').attr('href');
                    articles.push({ title,URL})
                    newsCount++;
                })
                console.log(`found: ${newsCount} articles`);
                console.log(articles)
        }).catch(err => {console.log(err)});
//run on port 4500
app.listen(PORT, () => console.log(`Server runnning on PORT ${PORT}`));





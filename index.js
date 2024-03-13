const express = require('express');
const cheerio = require('cheerio');

const app = express();
const port = 3000; // You can change the port if needed

const apiUrl = 'https://time.com';

app.get('/getData', async (req, res) => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error( `Network response was not ok: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const dataList = [];

    $('.most-popular-feed__item').each((index, element) => {
      const title = $(element).find('.most-popular-feed__item-headline').text();
      const link = $(element).find('.most-popular-feed__item-headline').parent().attr('href');

      dataList.push({
        title,
        link,
      });
    });

    res.json(dataList);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
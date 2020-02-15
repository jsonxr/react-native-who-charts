const axios = require("axios");
const cheerio = require('cheerio');
const fs = require('fs');

const fetchData = async (url) => {
  const result = await axios.get(url);
  return cheerio.load(result.data);
};

class WhoData {
  caption;
  data = {}
  constructor(caption) { this.caption = caption }
}

const fetchTables = async (url) => {
  let $ = await fetchData(url)
  let results = []
  $('.table-striped').each((index, table) => {
    const caption = ($('caption', table)).text();
    const data2 = new WhoData(caption);
    results.push(data2);

    // Get the column headings
    const headings = []
    $('thead > tr > th', table).each((i, ele) => {
      const text = $(ele).text();
      headings[i] = text
      data2.data[text] = []
    })

    $('tbody > tr', table).each((i, row) => {
      $('td', row).each( (j, cell) => {
        const text = $(cell).text()
        data2.data[headings[j]][i] = parseFloat(text)
      })
    })

  });
  return results;
}

(async () => {
  const boys = await fetchTables('https://www.cdc.gov/growthcharts/who/boys_length_weight.htm');
  fs.writeFileSync('./assets/boys-length-cdc.json', JSON.stringify(boys[0].data, null, 2));
  fs.writeFileSync('./assets/boys-weight-cdc.json', JSON.stringify(boys[1].data, null, 2));

  const girls = await fetchTables('https://www.cdc.gov/growthcharts/who/girls_length_weight.htm'); 
  fs.writeFileSync('./assets/girls-length-cdc.json', JSON.stringify(girls[0].data, null, 2));
  fs.writeFileSync('./assets/girls-weight-cdc.json', JSON.stringify(girls[1].data, null, 2));
})()

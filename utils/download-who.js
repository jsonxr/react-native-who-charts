const axios = require('axios');
const fs = require('fs').promises;

/**
 * Retrieves the tab separated tables from a who url
 * @param {string} url
 */
const fetchWhoData = async (url, maxRows) => {
  const data = (await axios.get(url)).data.trim();
  const results = {};
  let headers;
  data.split('\n').map((row, rowNo) => {
    if (rowNo > maxRows) {
      return;
    }

    row = row.trim(); // Get rid of \r

    // Prepare the results objects with the headers
    if (!headers) {
      headers = row.split('\t');
      headers.forEach(v => {
        results[v] = [];
      });
      return;
    }

    // Put the data in it's place
    row.split('\t').map((col, index) => {
      results[headers[index]].push(parseFloat(col));
    });
  });

  return results;
};

const writeJsFile = async (url, filename, limitRows) => {
  console.log(`downloading ${url}...`);
  const data = await fetchWhoData(url, limitRows);
  await fs.writeFile(
    filename,
    `export default ${JSON.stringify(data, null, 2)};`
  );
  console.log(`wrote ${filename}`);
};

(async () => {
  writeJsFile(
    'https://www.who.int/childgrowth/standards/tab_wfa_boys_p_0_5.txt',
    './src/boys-weight.js',
    25
  );
  // const boysWeight = await fetchWhoData('https://www.who.int/childgrowth/standards/tab_wfa_boys_p_0_5.txt', 25)
  // fs.writeFileSync('./assets/boys-weight.json', JSON.stringify(boysWeight, null, 2));

  writeJsFile(
    'https://www.who.int/childgrowth/standards/tab_lhfa_boys_p_0_2.txt',
    './src/boys-length.js',
    25
  );
  // const boysHeight = await fetchWhoData('https://www.who.int/childgrowth/standards/tab_lhfa_boys_p_0_2.txt', 25)
  // fs.writeFileSync('./assets/boys-length.json', JSON.stringify(boysHeight, null, 2));

  writeJsFile(
    'https://www.who.int/childgrowth/standards/tab_wfa_girls_p_0_5.txt',
    './src/girls-weight.js',
    25
  );
  // const girlsWeight = await fetchWhoData('https://www.who.int/childgrowth/standards/tab_wfa_girls_p_0_5.txt', 25)
  // fs.writeFileSync('./assets/girls-weight.json', JSON.stringify(girlsWeight, null, 2));

  writeJsFile(
    'https://www.who.int/childgrowth/standards/tab_lhfa_girls_p_0_2.txt',
    './src/girls-length.js',
    25
  );
  // const girlsHeight = await fetchWhoData('https://www.who.int/childgrowth/standards/tab_lhfa_girls_p_0_2.txt', 25)
  // fs.writeFileSync('./assets/girls-length.json', JSON.stringify(girlsHeight, null, 2));

  //console.log(boysWeight);
})();

const prompts = require('prompts');

const { scrapeProfile } = require('./scraper');

const terminalScraper = async () => {
  console.log('====== Starting script ======');

  const promptResponse = await prompts({
    type: 'text',
    name: 'username',
    message: 'Please, enter username to scrape'
  });

  if (!promptResponse.username) {
    console.log('No username provided');

    return;
  }

  console.log('====== Getting User information ======');

  const userData = await scrapeProfile(promptResponse.username);

  console.log(userData);

  return userData;
}

module.exports = terminalScraper;

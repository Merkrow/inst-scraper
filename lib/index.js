const axios = require('axios');
const cheerio = require('cheerio');

const { BASE_URL } = require('./constants');

const scrapeProfile = async (username) => {
  const profileUrl = `${BASE_URL}${username}`;

  try {
    const html = await axios.get(profileUrl);
    const $ = cheerio.load(html.data);

    const script = $('script').eq(4).html();
    const { user } = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1]).entry_data.ProfilePage[0].graphql;

    const name = user.full_name;
    const followers = user.edge_followed_by.count;
    const following = user.edge_follow.count;

    const posts = user.edge_owner_to_timeline_media.edges
      .map(({ node: post }) => ({
        id: post.id,
        imageUrl: post.display_url,
        postUrl: `${BASE_URL}p/${post.shortcode}`,
      }));

    return {
      posts,
      name,
      followers,
      following
    }
  } catch(err) {
    return `Something went wrong while fetching profile! Error: ${err.message}`
  }
};

module.exports = {
  scrapeProfile,
};

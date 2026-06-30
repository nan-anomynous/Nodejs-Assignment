const axios = require("axios");

async function fetchGitHubUser(username) {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const data = response.data;

    return {
      username: data.login,
      name: data.name,
      followers: data.followers,
      following: data.following,
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      company: data.company,
      location: data.location,
      bio: data.bio,
      profile_url: data.html_url,
      avatar_url: data.avatar_url,
      created_at: data.created_at,
    };

  } catch (err) {
    throw new Error("GitHub user not found");
  }
}

module.exports = { fetchGitHubUser };
const { fetchGitHubUser } = require("../services/githubService");

const {
  getAllProfiles,
  getProfileByUsername,
} = require("../models/profileModel");

const pool = require("../config/Db");

async function analyzeUser(req, res) {
  try {
    const { username } = req.params;

    const userData = await fetchGitHubUser(username);

    const query = `
      INSERT INTO github_profiles 
      (username, name, followers, following, public_repos, public_gists, company, location, bio, profile_url, avatar_url, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        followers = VALUES(followers),
        following = VALUES(following),
        public_repos = VALUES(public_repos),
        updated_at = CURRENT_TIMESTAMP;
    `;

    const values = [
      userData.username,
      userData.name,
      userData.followers,
      userData.following,
      userData.public_repos,
      userData.public_gists,
      userData.company,
      userData.location,
      userData.bio,
      userData.profile_url,
      userData.avatar_url,
      userData.created_at,
    ];

    const conn = await pool.getConnection();
    await conn.query(query, values);
    conn.release();

    res.json({
      success: true,
      message: "User analyzed and saved",
      data: userData,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}



async function getAll(req, res) {
  try {
    const data = await getAllProfiles();

    res.json({
      success: true,
      count: data.length,
      data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

async function getOne(req, res) {
  try {
    const { username } = req.params;

    const data = await getProfileByUsername(username);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.json({
      success: true,
      data,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  analyzeUser,
  getAll,
  getOne,
};
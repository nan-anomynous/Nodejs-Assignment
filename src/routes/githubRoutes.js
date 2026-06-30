const express = require("express");
const router = express.Router();

const {
  analyzeUser,
  getAll,
  getOne,
} = require("../controllers/githubController");


router.get("/github/:username", analyzeUser);

router.get("/profiles", getAll);

router.get("/profiles/:username", getOne);

module.exports = router;
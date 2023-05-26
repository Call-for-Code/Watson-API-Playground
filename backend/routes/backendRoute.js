const express = require("express");
const {
  languageTranslator,
} = require("../controllers/languageTranslatorController");

const router = express.Router();

router.post("/language-translator", languageTranslator);

module.exports = router;

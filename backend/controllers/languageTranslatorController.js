const fetch = require("node-fetch");

/**
 * @desc      Language Translator Service
 * @route     POST /v1/cfc/language-translator
 * @access    Public
 */
exports.languageTranslator = async (req, res, next) => {
  // pull environment variables
  const SERVICE_BASE_URL = process.env.SERVICE_BASE_URL;
  const SERVICE_SUFFIX = process.env.SERVICE_SUFFIX;
  const API_ID = process.env.API_ID;
  const API_KEY = process.env.API_KEY;

  // pull data from request
  const startAbbr = req.body.startAbbreviation;
  const targetAbbr = req.body.targetAbbreviation;
  const translationText = req.body.text;

  const response = await fetch(`${SERVICE_BASE_URL}/${SERVICE_SUFFIX}`, {
    method: "POST",
    body: JSON.stringify({
      text: translationText,
      model_id: `${startAbbr}-${targetAbbr}`,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${API_ID}:${API_KEY}`),
    },
  });

  if (response.ok) {
    const data = await response.json();
    res.json(data);
  } else {
    console.error(response.message);
    res.json({ status: false, message: response.message });
  }
};

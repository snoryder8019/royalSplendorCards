var express = require('express');
const config = require('../../config/config');
//const puppeteer = require('puppeteer');
const { ObjectId } = require('mongodb');
var router = express.Router();
const generatePDF = async (url, elementId, outputPath) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(elementId);
  await page.pdf({
    path: outputPath,
    format: 'A4',
    clip: {
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    },
    pageRanges: '1',
  });
  await browser.close();
};

const exporterRoute = async (req, res, userId, cardId, user, card, confirmationId) => {
  console.log('exporter route');
  const cardData = card;
  const userData = user;
  console.log(cardData);
  console.log(userData);

  const url = `${config.baseUrl}exporter`;
  const elementId1 = '.cardFrontFrame';
  const outputPath1 = `/finals/${userId}_front.pdf`;
  const elementId2 = '.cardBackFrame';
  const outputPath2 = `/finals/${userId}_back.pdf`;

  try {
    await generatePDF(url, elementId1, outputPath1);
    await generatePDF(url, elementId2, outputPath2);
    res.status(200).send('PDFs generated successfully.');
  } catch (error) {
    console.error('Error generating PDFs:', error);
    res.status(500).send('An error occurred while generating the PDFs.');
  }
};
router.use('/',exporterRoute)
module.exports = {
  generatePDF,
  exporterRoute,
  router
};

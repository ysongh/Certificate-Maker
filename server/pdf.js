const { PDFDocument, StandardFonts } = require('pdf-lib');
const { NFTStorage, File } = require('nft.storage');
const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

require('dotenv').config();
const client = new NFTStorage({ token: process.env.NFTSTORAGE_APIKEY })

async function embedImages(imageURL, title, name){
  const pngImageBytes = await fetch(imageURL).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.create();

  const pngImage = await pdfDoc.embedPng(pngImageBytes);

  const pngDims = pngImage.scale(1);

  const page = pdfDoc.addPage();

  page.drawImage(pngImage, {
    x: page.getWidth() / 2 - pngDims.width / 2,
    y: page.getHeight() / 2 - pngDims.height / 2,
    width: pngDims.width,
    height: pngDims.height,
  })

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const { width, height } = firstPage.getSize();
  const size = 30;

  firstPage.drawText(title, {
    x: width / 4.5,
    y: height / 2 + 30,
    size: size,
    font: helveticaFont
  });

  firstPage.drawText(name, {
    x: width / 3,
    y: height / 2 - 30,
    size: size + 10,
    font: helveticaFont
  });

  const pdfBytes = await pdfDoc.save()

  return pdfBytes;
}
// GET /api/pdf
// For testing
router.get('/', async (req, res) => {
  const image_url = 'https://slate.textile.io/ipfs/bafybeifzesppughfws5dietbxk4wznktaru7ciseuefrwplld3tiqhoo6e';
  const title = "Certificate of Completion";
  const name = "Bob Doe";

  const pdfFile = await embedImages(image_url, title, name);
  console.log(pdfFile);

  res.setHeader("Content-Length", pdfFile.length);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "filename=test.pdf");
  res.send(new Buffer.from(pdfFile));
})

// POST /api/pdf
// Create a certificate
router.post('/', async (req, res) => {
  const image_url = req.body.image_url;
  const title = req.body.title;
  const name = req.body.name;

  const pdfFile = await embedImages(image_url, title, name);
  console.log(pdfFile);

  const cid = await client.storeDirectory([
    new File([pdfFile], 'certificate.pdf'),
    new File([JSON.stringify(
        { title, name },
        null,
        2
    )], 'metadata.json')
  ])

  console.log(cid);
  return res.status(201).json({
    cid: cid,
    url: `https://ipfs.io/ipfs/${cid}`  
  });
})

module.exports = router;
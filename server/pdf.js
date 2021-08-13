const { PDFDocument, StandardFonts } = require('pdf-lib');
const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

async function embedImages(imageURL){
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

	firstPage.drawText("TEST", {
			x: 255,
			y: height / 2,
			size: size,
			font: helveticaFont
	});

  const pdfBytes = await pdfDoc.save()

	return pdfBytes;
}
// GET /api/pdf/createcertificate
// Create a certificate
router.get('/', async (req, res) => {
    const pdfFile = await embedImages('https://slate.textile.io/ipfs/bafybeifzesppughfws5dietbxk4wznktaru7ciseuefrwplld3tiqhoo6e');
		console.log(pdfFile);

		res.setHeader("Content-Length", pdfFile.length);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "filename=test.pdf");
    res.send(new Buffer.from(pdfFile));
})

module.exports = router;
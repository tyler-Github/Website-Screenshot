const { response } = require('express');
var express = require('express');

const puppeteer = require('puppeteer');
var app = express();
var PORT = 3000;
  
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.render('index');
})

app.get('/screenshot', async (req, res) => {
    const url = req.query.url;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setViewport({
        width:1280,
        height:720,
    });

    await page.goto(url);
    
    await page.waitForTimeout(1500);

    const buffer = await page.screenshot();

    res.header('Content-Type', 'image/png');
    res.header('Content-Disposition', 'inline; filename=screenshot.png');
    return res.send(buffer);
})
  
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 
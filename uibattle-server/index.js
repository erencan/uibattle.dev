// start a server on port 3000
const puppeteer = require('puppeteer');

const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

const url     = require('url');
const http = require('http');
const server = http.createServer((req, res) => {
    // parse query string
    const parsed = url.parse(req.url, true);
    const parsedUrl = parsed.query.url;

    // if not valid return 404
    if(parsed.query.url === undefined) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
        return;
    }

    const valid = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(parsedUrl.split('?')[0]);

    // if not valid return 404
    if(!valid) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
        return;
    }

    // if valid get screenshot of url with puppeteer and return it
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // resize viewport to 1280x640
        await page.setViewport({ width: 640, height: 320 });
        await page.goto(parsedUrl+'/show');
        await page.click('#click-to-run')
        await page.waitForSelector('#result');
        // remove div with id result
        await page.evaluate(() => {
            const element = document.getElementsByClassName('toEditor')[0];
            element.parentNode.removeChild(element);
        });
        // wait for 1 second
        await page.waitForTimeout(1000);
        const image = await page.screenshot();
        // save screenshot to file
        fs.writeFileSync('screenshot.png', image);
        await browser.close();
        // res.writeHead(200, {
        //     'Content-Type': 'image/png',
        //     'Content-Length': image.length
        // });
        // res.end(image);

        // create PNG image from screenshot
        const screenshot = fs.readFileSync('screenshot.png');
        const img1 = PNG.sync.read(screenshot);
        const img2 = PNG.sync.read(fs.readFileSync('compare.png'));
        const {width, height} = img1;
        const diff = new PNG({width, height});

        const numberOfDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

        console.log(`number of different pixels: ${numberOfDiffPixels}`);
        // return text string "number of different pixels: 1234"
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        const totalPixels = width * height;
        res.end(`${(totalPixels-numberOfDiffPixels)/totalPixels*100}`);
    })();



});
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

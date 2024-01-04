/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import * as puppeteer from "puppeteer";

export const join = onRequest(async (request, response) => {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    // url parametresinin gerçekten bir url olup olmadığını regex ile kontrol eder ve değilse hata döner
    const urlRegex = new RegExp("^(http|https)://", "i");
    if (!urlRegex.test(<string>request.query.url)) {
        response.status(400).send("Invalid url parameter");
        return;
    }

    await page.goto(<string>request.query.url);
    const imageBuffer = await page.screenshot();
    await browser.close();
    response.set("Content-Type", "image/png");
    response.send(imageBuffer);
});
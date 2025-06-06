// const puppeteer = require("puppeteer");

// async function fetchLeetCodeContestProblems(contestUrl) {
//   try {
//     const browser = await puppeteer.launch({ headless: false }); // Change to false to debug
//     const page = await browser.newPage();

//     console.log(`Navigating to: ${contestUrl}`);
//     await page.goto(contestUrl, { waitUntil: "domcontentloaded" });

//     // Ensure page is fully loaded
//     await new Promise(resolve => setTimeout(resolve, 3000));

//     // Scroll down to trigger lazy loading
//     await page.evaluate(() => window.scrollBy(0, window.innerHeight));

//     // Find the correct selector dynamically
//     const problems = await page.evaluate(() => {
//       const items = document.querySelectorAll(".contest-question-list .list-group-item");
//       return Array.from(items).map(item => {
//         const titleElement = item.querySelector('a');
//         const title = titleElement ? titleElement.textContent.trim() : null;
//         const url = titleElement ? titleElement.href : null;
//         return { title, url };
//       }).filter(problem => problem.title && problem.url); // Filter out invalid entries
//     });

//     console.log("Scraped problems:", problems);
//     await browser.close();
//     return problems;
//   } catch (error) {
//     console.error("Error fetching contest problems:", error.message);
//     return [];
//   }
// }

// module.exports = fetchLeetCodeContestProblems;


const puppeteer = require("puppeteer");

async function fetchContestProblems(contestUrl, platform) {
  try {
    const browser = await puppeteer.launch({ headless: false }); // Change to false to debug
    const page = await browser.newPage();

    console.log(`Navigating to: ${contestUrl}`);
    await page.goto(contestUrl, { waitUntil: "domcontentloaded" });

    // Ensure page is fully loaded
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Scroll down to trigger lazy loading
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));

    let problems = [];

    if (platform === "leetcode") {
      // LeetCode specific logic
      problems = await page.evaluate(() => {
        const items = document.querySelectorAll(".contest-question-list .list-group-item");
        return Array.from(items).map(item => {
          const titleElement = item.querySelector('a');
          const title = titleElement ? titleElement.textContent.trim() : null;
          const url = titleElement ? titleElement.href : null;
          return { title, url };
        }).filter(problem => problem.title && problem.url); // Filter out invalid entries
      });
    } else if (platform === "codeforces") {
      // Codeforces specific logic
      problems = await page.evaluate(() => {
        const items = document.querySelectorAll("div[style='float: left;'] a");
        return Array.from(items).map(item => {
          const title = item.textContent.trim();
          const url = item.href;
          return { title, url };
        }).filter(problem => problem.title && problem.url); // Filter out invalid entries
      });
    }

    console.log("Scraped problems:", problems);
    await browser.close();
    return problems;
  } catch (error) {
    console.error("Error fetching contest problems:", error.message);
    return [];
  }
}

module.exports = fetchContestProblems;
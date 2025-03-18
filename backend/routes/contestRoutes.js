const express = require("express");
const axios = require("axios");
const Bookmark = require("../models/Bookmark");
const cheerio = require("cheerio");
const fetchLeetCodeContestProblems = require('../scrapping/fetchLeetCodeContestProblems');

const router = express.Router();

// ✅ Fetch LeetCode Contests
router.get("/leetcode-contests", async (req, res) => {
  try {
    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: `
          query {
            upcomingContests { title startTime }
            pastContests(pageNo: 1, numPerPage: 100) {
              data { title startTime }
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com/contest/",
          Origin: "https://leetcode.com",
        },
      }
    );

    if (!response.data || !response.data.data) {
      return res.status(500).json({ error: "Invalid response from LeetCode API" });
    }

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const formatContest = (contest) => ({
      title: contest.title,
      slug: contest.title.replace(/\s+/g, "-").toLowerCase(),
      startTime: new Date(contest.startTime * 1000).toLocaleString(),
      url: `https://leetcode.com/contest/${contest.title.replace(/\s+/g, "-").toLowerCase()}`,
      platform: "Leetcode",
    });

    const upcomingContests = response.data.data.upcomingContests.map(formatContest);
    const pastContests = response.data.data.pastContests.data
      .filter((contest) => new Date(contest.startTime * 1000) >= twelveMonthsAgo)
      .map(formatContest);

    res.json({ upcomingContests, pastContests });
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error.message);
    res.status(500).json({ error: "Failed to fetch LeetCode contests" });
  }
});

// ✅ Fetch problems from a specific LeetCode contest
router.get("/leetcode-contest/:slug", async (req, res) => {
  const { slug } = req.params;
  const url = `https://leetcode.com/contest/${slug}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Referer: "https://leetcode.com/contest/",
      },
    });

    const $ = cheerio.load(data);
    let problems = [];

    $(".table__3KYK tbody tr").each((index, element) => {
      const title = $(element).find("td:nth-child(2)").text().trim();
      if (title) {
        const problemSlug = title.toLowerCase().replace(/\s+/g, "-");
        problems.push({
          title,
          url: `https://leetcode.com/problems/${problemSlug}/`,
        });
      }
    });

    if (problems.length === 0) {
      return res.status(404).json({ error: "No problems found for this contest" });
    }

    res.json({ contest: slug, problems });
  } catch (error) {
    console.error(`Error fetching contest problems for ${slug}:`, error.message);
    res.status(500).json({ error: "Failed to fetch contest problems" });
  }
});

// ✅ Fetch Codeforces Contests
router.get("/codeforces-contests", async (req, res) => {
  try {
    const response = await axios.get("https://codeforces.com/api/contest.list");
    if (!response.data || !response.data.result) {
      return res.status(500).json({ error: "Invalid response from Codeforces API" });
    }

    const contests = response.data.result;
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const formatContest = (contest) => ({
      title: contest.name,
      startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
      url: `https://codeforces.com/contest/${contest.id}`,
      platform: "Codeforces",
    });

    const upcomingContests = contests.filter((c) => c.phase === "BEFORE").map(formatContest);
    const pastContests = contests
      .filter((c) => c.phase === "FINISHED" && new Date(c.startTimeSeconds * 1000) >= twelveMonthsAgo)
      .map(formatContest);

    res.json({ upcomingContests, pastContests });
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error.message);
    res.status(500).json({ error: "Failed to fetch Codeforces contests" });
  }
});

// ✅ Bookmark Contest
router.post("/bookmarks", async (req, res) => {
  try {
    const { title, url, startTime, platform } = req.body;
    const bookmark = new Bookmark({ title, url, startTime, platform });
    await bookmark.save();
    res.status(201).json({ message: "Bookmarked successfully!" });
  } catch (error) {
    console.error("Error saving bookmark:", error.message);
    res.status(500).json({ error: "Failed to save bookmark" });
  }
});

// ✅ Fetch Bookmarked Contests
router.get("/bookmarks", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (error) {
    console.error("Error fetching bookmarks:", error.message);
    res.status(500).json({ error: "Failed to fetch bookmarks" });
  }
});

// ✅ Delete Bookmark
router.delete("/bookmarks/:id", async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: "Bookmark removed" });
  } catch (error) {
    console.error("Error deleting bookmark:", error.message);
    res.status(500).json({ error: "Failed to delete bookmark" });
  }
});


// router.get("/leetcode-contest-problems", async (req, res) => {
//   const { contestUrl } = req.query;

//   if (!contestUrl) {
//     console.error("Missing contestUrl parameter in request");
//     return res.status(400).json({ error: "Missing contestUrl parameter" });
//   }

//   console.log("Received contestUrl:", contestUrl); // Debugging

//   try {
//     const problems = await fetchLeetCodeContestProblems(contestUrl);
//     console.log("Fetched problems:", problems); // Debugging
//     res.json({ problems });
//   } catch (error) {
//     console.error("Error fetching contest problems:", error.message);
//     res.status(500).json({ error: "Failed to fetch contest problems" });
//   }
// });

router.get("/leetcode-contest-problems", async (req, res) => {
  const { contestUrl } = req.query;  // ✅ Extract `contestUrl` correctly

  if (!contestUrl) {
    console.error("Missing contestUrl parameter in request");
    return res.status(400).json({ error: "Missing contestUrl parameter" });
  }

  // console.log("Received contestUrl:", contestUrl); // Debugging

  try {
    const problems = await fetchLeetCodeContestProblems(contestUrl);
    // console.log("Fetched problems:", problems); // Debugging
    res.json({ problems });
  } catch (error) {
    console.error("Error fetching contest problems:", error.message);
    res.status(500).json({ error: "Failed to fetch contest problems" });
  }
});

// console.log("Received contestUrl:", contestUrl);

module.exports = router;

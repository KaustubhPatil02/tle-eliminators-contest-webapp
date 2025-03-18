const express = require("express");
const axios = require("axios");
const Bookmark = require("../models/Bookmark");

const router = express.Router();

// ✅ Fetch Leetcode Contests
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

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const upcomingContests = response.data.data.upcomingContests.map((contest) => ({
      title: contest.title,
      startTime: new Date(contest.startTime * 1000).toLocaleString(),
      url: `https://leetcode.com/contest/${contest.title.replace(/\s+/g, "-").toLowerCase()}`,
      platform: "Leetcode",
    }));

    const pastContests = response.data.data.pastContests.data
      .filter((contest) => new Date(contest.startTime * 1000) >= twelveMonthsAgo)
      .map((contest) => ({
        title: contest.title,
        startTime: new Date(contest.startTime * 1000).toLocaleString(),
        url: `https://leetcode.com/contest/${contest.title.replace(/\s+/g, "-").toLowerCase()}`,
        platform: "Leetcode",
      }));

    res.json({ upcomingContests, pastContests });
  } catch (error) {
    console.error("Error fetching LeetCode contests:", error.message);
    res.status(500).json({ error: "Error fetching LeetCode contests" });
  }
});

// ✅ Fetch Codeforces Contests
router.get("/codeforces-contests", async (req, res) => {
  try {
    const response = await axios.get("https://codeforces.com/api/contest.list");
    const contests = response.data.result;

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const upcomingContests = contests
      .filter((contest) => contest.phase === "BEFORE")
      .map((contest) => ({
        title: contest.name,
        startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
        url: `https://codeforces.com/contest/${contest.id}`,
        platform: "Codeforces",
      }));

    const pastContests = contests
      .filter((contest) => contest.phase === "FINISHED" && new Date(contest.startTimeSeconds * 1000) >= twelveMonthsAgo)
      .map((contest) => ({
        title: contest.name,
        startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
        url: `https://codeforces.com/contest/${contest.id}`,
        platform: "Codeforces",
      }));

    res.json({ upcomingContests, pastContests });
  } catch (error) {
    console.error("Error fetching Codeforces contests:", error.message);
    res.status(500).json({ error: "Error fetching Codeforces contests" });
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
    res.status(500).json({ error: "Error saving bookmark" });
  }
});

// ✅ Fetch Bookmarked Contests
router.get("/bookmarks", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find();
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bookmarks" });
  }
});

// ✅ Delete Bookmark
router.delete("/bookmarks/:id", async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: "Bookmark removed" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting bookmark" });
  }
});

module.exports = router;

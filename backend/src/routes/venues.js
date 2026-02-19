const express = require("express");
const db = require("../db");

const router = express.Router();

// GET all venues
router.get("/", async (req, res) => {
  const { sort } = req.query;
  const allowed = ["name", "category", "id"];
  const orderBy = allowed.includes(sort) ? sort : "id";

  const result = await db.query(
    `SELECT * FROM venues ORDER BY ${orderBy} ASC`
  );

  res.json(result.rows);
});

// GET one venue
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    "SELECT * FROM venues WHERE id=$1",
    [id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ error: "Not found" });

  res.json(result.rows[0]);
});

// CREATE venue
router.post("/", async (req, res) => {
  const { name, category, district, website } = req.body;

  if (!name || !category)
    return res.status(400).json({ error: "name and category required" });

  const result = await db.query(
    `INSERT INTO venues (name, category, district, website)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [name, category, district || "", website || ""]
  );

  res.status(201).json(result.rows[0]);
});

// UPDATE venue
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category, district, website } = req.body;

  const result = await db.query(
    `UPDATE venues
     SET name=$1, category=$2, district=$3, website=$4
     WHERE id=$5
     RETURNING *`,
    [name, category, district || "", website || "", id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ error: "Not found" });

  res.json(result.rows[0]);
});


// DELETE venue
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    "DELETE FROM venues WHERE id=$1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0)
    return res.status(404).json({ error: "Not found" });

  res.json({ deleted: true });
});

module.exports = router;

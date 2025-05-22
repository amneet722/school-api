const db = require('../db');
const haversine = require('../utils/distanceCalculator');

exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    await db.execute(query, [name, address, parseFloat(latitude), parseFloat(longitude)]);
    res.status(201).json({ message: 'School added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

exports.listSchools = async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'User coordinates (latitude and longitude) are required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM schools');
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const sorted = rows.map(school => ({
      ...school,
      distance: haversine(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.status(200).json(sorted);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

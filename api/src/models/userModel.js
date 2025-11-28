const db = require('../config/db');

async function createUser({ email, passwordHash, fullName }) {
  const [result] = await db.execute(
    `INSERT INTO users (email, password_hash, full_name)
     VALUES (?, ?, ?)`,
    [email, passwordHash, fullName]
  );
  return { id: result.insertId, email, full_name: fullName };
}

async function findByEmail(email) {
  const [rows] = await db.execute(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await db.execute(
    `SELECT id, email, full_name, role, avatar_url, created_at, updated_at
     FROM users WHERE id = ?`,
    [id]
  );
  return rows[0] || null;
}

module.exports = {
  createUser,
  findByEmail,
  findById
};

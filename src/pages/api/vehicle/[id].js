import sqlite from 'sqlite';

export default async function getVehicleById(req,res) {

  const db = await sqlite.open('./mydb.sqlite');
  const vehicle = await db.all('SELECT * FROM Vehicle where id = ?', [req.query.id]);

  res.json(vehicle)
}
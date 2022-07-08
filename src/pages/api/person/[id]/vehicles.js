import sqlite from 'sqlite';

export default async function getVehiclesByOwnerId(req,res) {

  const db = await sqlite.open('./mydb.sqlite');
  const vehicles = await db.all('SELECT * FROM Vehicle where ownerId = ?', [req.query.id]);

  res.json(vehicles);
}
const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  update,
  remove
}

function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes')
    .where("id", id)
    .first();
}

function findSteps(id) {
  return db("steps")
    .select("step_number", "instructions", "scheme_name")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .orderBy("steps.step_number")
    .where("scheme_id", id)
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id");
}

function addStep(step) {
  return db("steps")
    .insert(step)
}

function update(changes, id) {
  return db('schemes')
    .where({ id })
    .update(changes)
}

function remove(id) {
  return db('schemes')
    .where({ id })
    .del();
}
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
}

function findSteps(id) {
  return db("steps")
    .join("schemes", "steps.scheme_id", "schemes.id")
    .orderBy("steps.step_number")
    .where("scheme_id", id)
}

function add(scheme) {
  return db("schemes")
    .insert(scheme, "id");
}

function addStep(step, scheme_id) {
  return db('steps')
    .insert(step, scheme_id)
    .where("scheme_id", scheme_id);
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
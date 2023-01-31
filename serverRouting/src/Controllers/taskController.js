/* eslint-disable no-unused-vars */

const express = require('express');
const taskService = require('../Services/taskService');

const getTask = async (req, res) => {
  const tasks = await taskService.getTask(req.params.code);
  if (tasks === null) {
    res.status(404).send('Not Found');
  } else {
    res.status(200).json(tasks);
  }
};

const getTasks = async (req, res) => {
  res.status(200).send(await taskService.getTasks());
};

const postTask = async (req, res) => {
  res.status(201).send(await taskService.postTask(req.body));
};

const putTask = async (req, res) => {
  const task = await taskService.putTask(req.body);
  if (task === null) {
    res.status(404).send('Not Found');
  } else {
    res.status(200).json(task);
  }
};

const deleteTasks = async (req, res) => {
  res.status(200).send(await taskService.deleteTasks());
};

const patchTask = async (req, res) => {
  const task = await taskService.patchTask(req.params.id, req.params.isComplete);
  if (task === null) {
    res.status(404).send('Not Found');
  } else {
    res.status(200).json(task);
  }
};

module.exports = { getTask, getTasks, postTask, putTask, deleteTasks, patchTask };
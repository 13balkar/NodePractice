/* eslint-disable no-unused-vars */

const express = require('express');
const taskService = require('../Services/taskService');

const getTask = (req, res) => {
  const tasks = taskService.getTask(req.params.code);
  if (tasks === null) {
    res.status(404).send('Not Found');
  } else {
    res.status(200).json(tasks);
  }
};

const getTasks = (req, res) => {
  res.status(200).send(taskService.getTasks());
};

const postTask = (req, res) => {
  res.status(201).send(taskService.postTask(req.body));
};

const putTask = (req, res) => {
  const task = taskService.putTask(req.body);
  if (task === null) {
    res.status(404).send('Not Found');
  } else {
    res.status(200).json(task);
  }
};

const deleteTasks = (req, res) => {
  res.status(200).send(taskService.deleteTasks());
};

const patchTask = (req, res) => {
  const task = taskService.patchTask(req.params.id, req.params.isComplete);
  if (task === null) {
    res.status(404).send('Not Found');
  } else {
    res.status(200).json(task);
  }
};

module.exports = { getTask, getTasks, postTask, putTask, deleteTasks, patchTask };
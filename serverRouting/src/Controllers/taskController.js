/* eslint-disable no-unused-vars */

const express = require('express');
const taskService = require('../Services/taskService');

const getTask = async (req, res) => {
  try {
    const tasks = await taskService.getTask(req.params.code);
    res.status(200).json(tasks);
  }
  catch (err) {
    res.status(404).send(`No tasks found for id  ${req.params.code}`);
  }
};

const getTasks = async (req, res) => {
  res.status(200).send(await taskService.getTasks());
};

const postTask = async (req, res) => {
  try {
    const task = await taskService.postTask(req.body);
    res.status(201).json(task);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
};

const putTask = async (req, res) => {
  try {
    const task = await taskService.putTask(req.body);
    res.status(200).json(task);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
};

const deleteTasks = async (req, res) => {
  try {
    const tasks = await taskService.deleteTasks();
    res.status(200).json(tasks);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
};

const patchTask = async (req, res) => {
  try {
    const task = await taskService.patchTask(req.params.id, req.params.isComplete);
    res.status(200).json(task);
  }
  catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = { getTask, getTasks, postTask, putTask, deleteTasks, patchTask };
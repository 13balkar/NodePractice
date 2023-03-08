/* eslint-disable no-unused-vars */

const express = require('express');
const taskService = require('../Services/taskService');
const HttpErrors = require('../../Errors/httpErrors');

const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks();
    res.status(200).send(tasks);
  }
  catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else {
      res.status(500).send({ 'message': 'Internal server error.' });
    }
  }
};

const postTask = async (req, res) => {
  try {

    const task = await taskService.postTask(req.body);
    res.status(201).json(task);

  }
  catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else
      res.status(500).send({ 'message': 'Internal server error.' });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const id = req.params.id;
    const message = await taskService.deleteTasks(req.params.id);
    res.status(200).send({ 'message': `${message} tasks deleted` });
  } catch (err) {
    if (err instanceof HttpErrors)
      res.status(err.code).send(err.message);
    else
      res.status(500).send({ 'message': 'Internal server error.' });
  }
};

const patchTask = async (req, res) => {
  try {
    const task = await taskService.patchTask(req.params.id);
    res.status(200).send(task);
  }
  catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else
      res.status(500).send({ 'message': 'Internal server error.' });
  }

};

module.exports = { getTasks, postTask, deleteTasks, patchTask };
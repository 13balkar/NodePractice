/* eslint-disable no-unused-vars */

const express = require('express');
const taskService = require('../Services/taskService');
const HttpErrors = require('../../Errors/httpErrors');

const getTask = async (req, res) => {
  const code = req.params.code;
  try {

    const tasks = await taskService.getTask(code);
    res.status(200).send(tasks);

  }
  catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else
      res.status(500).send({ 'message': 'Internal server error.' });
  }
};

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

const putTask = async (req, res) => {

  try {

    const task = await taskService.putTask(req.body);
    res.status(200).json(task);

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
    const message = await taskService.deleteTasks();
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
    const task = await taskService.patchTask(req.params.id, req.params.isComplete);
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

module.exports = { getTask, getTasks, postTask, putTask, deleteTasks, patchTask };
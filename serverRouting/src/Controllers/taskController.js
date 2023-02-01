/* eslint-disable no-unused-vars */

const express = require('express');
const taskService = require('../Services/taskService');
const Joi = require('joi');
const HttpErrors = require('../../Errors/httpErrors');


const getTask = async (code) => {
  const taskIdSchema = Joi.alternatives().try(
    Joi.string().valid('complete', 'incomplete'),
    Joi.number().integer()
  );
  const { error } = taskIdSchema.validate(code);
  if (error) {
    throw new HttpErrors(error.details[0].message, 400);
  } else {
    const tasks = await taskService.getTask(code);
    return tasks;
  }
};

const getTasks = async (req, res) => {
  try {
    console.log(req.params.code);
    const tasks = req.params.code === undefined ? await taskService.getTasks() : await getTask(req.params.code);
    res.status(200).json(tasks);
  }
  catch (err) {
    if (err instanceof HttpErrors) {
      res.status(err.code).send({ 'message': err.message });
    }
    else
      res.status(500).send({ 'message': 'Internal server error.' });
  }
};

const postTask = async (req, res) => {
  const schema = Joi.object({
    taskName: Joi.string().min(3).max(50).required(),
  });
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpErrors(error.details[0].message, 400);
    } else {
      const task = await taskService.postTask(req.body);
      res.status(201).json(task);
    }
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
  const schema = Joi.object({
    taskName: Joi.string().min(3).max(50).required(),
    isComplete: Joi.boolean().required(),
    id: Joi.number().integer().required()
  });
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpErrors(error.details[0].message, 400);
    }
    else {
      const task = await taskService.putTask(req.body);
      res.status(200).json(task);
    }
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
    res.status(200).json(message);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
};

const patchTask = async (req, res) => {
  const paramSchema = Joi.object({
    id: Joi.number().integer().required(),
    isComplete: Joi.boolean().required()
  }).required();

  try {
    const { error } = paramSchema.validate(req.params);
    if (error) {
      console.log('error');
      throw new HttpErrors(error.details[0].message, 400);
    }
    else {
      const task = await taskService.patchTask(req.params.id, req.params.isComplete);
      res.status(200).json(task);
    }
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
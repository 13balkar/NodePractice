/* eslint-disable no-unused-vars */

const express = require('express');
const taskService = require('../Services/taskService');
const Joi = require('joi');
const HttpErrors = require('../../Errors/httpErrors');


const getTask = async (req, res) => {
  const code = req.params.code;
  console.log(code);
  const taskIdSchema = Joi.alternatives().try(
    Joi.string().valid('complete', 'incomplete'),
    Joi.string().regex(/^[0-9]+$/)
  );
  try {
    const { error } = taskIdSchema.validate(code);
    if (error) {
      res.status(400).send({ 'message': error });
    } else {
      const tasks = await taskService.getTask(code);
      res.status(200).send(tasks);
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
  const schema = Joi.object({
    taskName: Joi.string().min(3).max(30).required(),
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
    taskName: Joi.string().min(3).max(30).required(),
    isComplete: Joi.boolean().required(),
    id: Joi.number().integer().positive().required()
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
    res.status(200).send({ 'message': `${message} tasks deleted` });
  } catch (err) {
    if (err instanceof HttpErrors)
      res.status(err.code).send(err.message);
    else
      res.status(500).send({ 'message': 'Internal server error.' });
  }
};

const patchTask = async (req, res) => {
  const paramSchema = Joi.object({
    id: Joi.number().integer().positive().required(),
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
      res.status(200).send(task);
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
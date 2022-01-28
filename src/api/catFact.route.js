import express from 'express';
const { Router } = express;
import catFactController from "./catFact.controller.js"
const router = new Router();

/* Route defined for the sake of implementing an external public API */
router.route("/")
    .get(catFactController.getCatFact)

export default router


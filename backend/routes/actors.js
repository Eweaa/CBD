import { Router } from "express";
import { Actor } from "../Models/Actor.Model";

const router = Router();

router.route('/').get((res, req) => {
    Actor.find()
    .then(actors => res.join(actors))
    .catch(err => res.status(400).json('Error: ', + err))
})
import { Router } from 'express';
import { recommendFertilizers } from '../controllers/fertilizerController';

const router = Router();

router.post('/recommend', recommendFertilizers);

export default router;

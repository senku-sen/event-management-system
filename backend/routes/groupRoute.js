import express from 'express';

import { createGroup, deleteGroup, getAllGroup, getGroupById, updateGroup } from '../controllers/groupController.js';

import { validatorGroup } from '../validators/groupValidator.js';

const router = express.Router();

router.post('/groups', validatorGroup, createGroup);
router.get('/groups', getAllGroup);
router.get('/groups/:id', getGroupById);
router.put('/groups/:id', updateGroup);
router.delete('/groups/:id', deleteGroup);

export default router;

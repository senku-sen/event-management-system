import express from 'express';

import { createGroup, deleteGroup, getAllGroup, getGroupById, updateGroup } from '../controllers/groupController';

import { validatorGroup } from '../validators/groupValidator';

const router = express.Router();

router.post('/groups', validatorGroup, createGroup);
router.get('/groups', getAllGroup);
router.get('/groups/:id', getGroupById);
router.put('/groups/:id', updateGroup);
router.delete('/groups/:id', deleteGroup);

export default router;

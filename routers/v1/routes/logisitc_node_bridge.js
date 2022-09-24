const router = require("express").Router();
const CRUD_HELPER = require("../../../helpers/crud_helper");
const { body, param, validationResult } = require('express-validator');
const LogisticNodeBridgeModel = require("../../../db/models/model_logistic_node_bridge");


// DEFINE MODEL
const MODEL_TYPE=LogisticNodeBridgeModel;

// GETALL
router.get("/",CRUD_HELPER.GETALL_HELPER(MODEL_TYPE));
// GET BY ID
router.get("/:id",CRUD_HELPER.GETBYID_HELPER(MODEL_TYPE));
// CREATE
router.post("/",CRUD_HELPER.CREATE_HELPER(MODEL_TYPE));
// UPDATE
router.put("/:id",param("id").isUUID(), CRUD_HELPER.UPDATE_HELPER(MODEL_TYPE));
// DELETE
router.delete("/:id", param('id').isUUID(),CRUD_HELPER.DELETE_HELPER(MODEL_TYPE));

module.exports = router;
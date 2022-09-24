const router=require("express").Router();


router.use("/",require("./domain_routes/specific_router"));

// CRUD ROUTES
// router.use("/test",require("./routes/test"));


module.exports = router;

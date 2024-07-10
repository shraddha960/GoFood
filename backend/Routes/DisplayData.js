const express = require('express');
const router = express.Router();

router.post("/foodData", async(req, res) => {
    try {   
        // console.log(global.food_items)
        res.json([global.food_items, global.food_category])

    } catch (error) {
        console.log("error", error)
        console.error(error.message)
        res.send("Server Error")
    }
})

module.exports = router;
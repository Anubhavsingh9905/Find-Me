const express = require('express');
const mongoose = require('mongoose');
const Info = require('../model/info.js');
const {storage, cloudinary} = require('../cloudConfig.js');
const multer = require('multer');
const { isLoggedIn } = require('../middlewares');
const router = express.Router();

const upload = multer({storage});

router.post("/upload/:userId", isLoggedIn, upload.single("photo"), async(req, res) => {
    try {
        const user = req.params;
        const userId = user.userId;

        const info = await Info.findOne({userId});

        if(info && info.photo.url && info.photo.public_id){
            return res.status(400).json({message: "user already upload a photo"});
        }
        
        let newInfo = new Info({userId: userId, 
            photo : {
                url: req.file.path,
                public_id: req.file.filename
            }
        });

        await newInfo.save();

        res.status(200).json({message: "photo sucessfully uploaded"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error})
    }
})

router.post("/delete/:userId", isLoggedIn, async(req, res) => {
    try {
        const user = req.params;
        const userId = user.userId;
        
        const info = await Info.findOne({userId: userId});
        if(!info){
            return res.status(400).json({message: "user donot upload any photo"})
        }

        await cloudinary.uploader.destroy(info.photo.public_id);

        await Info.deleteOne({userId: userId});

        res.status(200).json({message: "photo deleted suceessfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
});


router.get("/:userId", async(req, res) => {
    let userId = req.params.userId;
    const info = await Info.findOne({userId});

    res.json({info});
})

module.exports = router;
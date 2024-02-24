let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
let schemas = require("../models/schemas");


router.get('/rest/klips', async(req, res) => {

  const klips = schemas.Klips

  const klipData = await klips.find({}).exec()

  const postData = {title: "this is where the DB comes to play"}
  // const {title, poster, story} = req.body
  // console.log(title+ "|" + story)

  console.log(JSON.stringify(klipData))

  if (klipData){
    res.send(JSON.stringify(klipData))
  }else{
    res.send("failed to fetch Klips")
  }

  res.end()
})

router.post('/rest/create', async(req, res) => {
  const {title, message} = req.body
  console.log(title+ "|" + message)
  


  const klipData = {title: title, message: message}
  const newKlip = new schemas.Klips(klipData)
  const saveKlip = await newKlip.save()


  if (saveKlip){
    res.send("your klip has been posted")
  }else{
    res.send("failed to post you Klip")
  }

  res.end()
})





router.route("/edit/:id").get(async (req, res, next) => {
  await blog
    .findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
router.route("/update/:id").put(async (req, res, next) => {
  await blog
    .findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    .then((result) => {
      console.log(result);
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
router.route("/delete/:id").delete(async (req, res, next) => {
  await blog
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


module.exports = router;
const IncomingForm = require("formidable").IncomingForm;
const sha = require("sha256");
const fs = require("fs");
module.exports = function upload(req, res) {
  var form = new IncomingForm();

  form.on("file", (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path
    let contents = fs.readFileSync(file.path, "utf8");
    let inpHash = sha(contents);
    form.parse(req);
    console.log(inpHash+"sssssssssssssssssssssssssssssssssssssssssss")
  res.status(202).send({
    'hash':inpHash})
  });
  form.on("end", () => {
    res.json();
  });
  form.parse(req);

};
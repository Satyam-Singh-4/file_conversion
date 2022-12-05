const convertTiff = require("tiff-to-png");
const fs = require("fs");
const { unlink } = require("fs");

//Convert tiff to png

const convertFile = async (req, res) => {
  try {
    const file = req.file.path;
    console.log("path:", file);

    var options = {
      logLevel: 1,
    };

    var converter = new convertTiff(options);
    var location = "./Upload";

    const resp = await converter.convertOne(file, location);

    await unlink(file, function (err) {
      if (err) throw err;

      console.log("file deleted");
    });

    res.status(200).json({
      response: resp,
      message: "successfully converted",
    });
  } catch (error) {}
};

//Convert png to blob

const pngToBlob = (req, res) => {
  try {
    //read file
    const read = fs.readFileSync(req.file.path);

    console.log(read.toString());
    //delete png file
    fs.unlinkSync(req.file.path);
    console.log("file is deleted");

    res.send(read.toString());
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  convertFile,
  pngToBlob,
};

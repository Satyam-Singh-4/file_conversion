const convertTiff = require("tiff-to-png");
const { unlink } = require("fs");
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

module.exports = {
  convertFile,
};

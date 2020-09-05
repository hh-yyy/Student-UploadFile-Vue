module.exports = (req, res) => {
  res.download(`./taskUpload/${req.query.title}/${req.query.fname}`);
};

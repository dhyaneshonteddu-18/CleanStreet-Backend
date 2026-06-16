const Issue =
require(
'../models/Issue'
);

const createIssue =
async (
  req,
  res
) => {

  try {

    const {
  issueType,
  description,
  location,
  email
} = req.body;

    const image =
    req.file
    ?
    `https://cleanstreet-backend.onrender.com/uploads/${req.file.filename}`
    :
    '';

    const issue =
  await Issue.create({

  issueType,
  description,
  location,
  image,
  email

});

    res.status(201)
    .json(issue);

  }

  catch(error){

    res.status(500)
    .json({
      message:
      error.message
    });

  }

};

const getIssues =
async (
  req,
  res
) => {

  const issues =
  await Issue.find()
  .sort({
    createdAt:-1
  });

  res.json(
    issues
  );

};

module.exports = {

  createIssue,
  getIssues

};
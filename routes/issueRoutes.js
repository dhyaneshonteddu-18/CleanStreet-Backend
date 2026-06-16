const express =
require('express');

const router =
express.Router();

const multer =
require('multer');

const path =
require('path');

const {
  createIssue,
  getIssues
} = require(
'../controllers/issueController'
);

const storage =
multer.diskStorage({

  destination:
  (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      'uploads/'
    );

  },

  filename:
  (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      Date.now()
      +
      path.extname(
        file.originalname
      )
    );

  }

});

const upload =
multer({
  storage
});

router.post(
  '/',
  upload.single(
    'image'
  ),
  createIssue
);

router.get(
  '/',
  getIssues
);

router.delete(
  '/:id',

  async (
    req,
    res
  ) => {

    try {

      await Issue.findByIdAndDelete(

        req.params.id

      );

      res.json({

        message:
        'Complaint Deleted'

      });

    }

    catch(error){

      res.status(500)
      .json({

        message:
        'Delete Failed'

      });

    }

  }

);

const Issue =
require('../models/Issue');

router.put(
  '/vote/:id',

  async (req, res) => {

    try {

      const issue =
      await Issue.findById(
        req.params.id
      );

      issue.votes++;

      await issue.save();

      res.json(issue);

    }

    catch(error){

      res.status(500).json({
        message:
        'Vote failed'
      });

    }

  }
);
router.put(
  '/comment/:id',

  async (req, res) => {

    try {

      const issue =
      await Issue.findById(
        req.params.id
      );

      issue.comments.push({

        user:
        req.body.user,

        text:
        req.body.text

      });

      await issue.save();

      res.json(issue);

    }

    catch(error){

      res.status(500).json({

        message:
        'Comment failed'

      });

    }

  }
);

router.delete(

  '/comment/:id/:index',

  async (
    req,
    res
  ) => {

    try {

      const issue =
      await Issue.findById(
        req.params.id
      );

      issue.comments.splice(

        req.params.index,

        1

      );

      await issue.save();

      res.json(
        issue
      );

    }

    catch(error){

      res.status(500)
      .json({

        message:
        'Delete comment failed'

      });

    }

  }
);

router.put(
  '/unvote/:id',

  async (
    req,
    res
  ) => {

    try {

      const issue =
      await Issue.findById(
        req.params.id
      );

      const email =
      req.body.email;

      issue.votedUsers =
      issue.votedUsers.filter(

        user =>
        user !== email

      );

      if (
        issue.votes > 0
      ) {

        issue.votes--;

      }

      await issue.save();

      res.json(
        issue
      );

    }

    catch(error){

      res.status(500)
      .json({

        message:
        'Unvote failed'

      });

    }

  }
);

router.put(
  '/:id',
  async (
    req,
    res
  ) => {

    try {

      const updatedIssue =
      await Issue.findByIdAndUpdate(

        req.params.id,

        {
          status:
          req.body.status
        },

        {
          new: true
        }

      );

      res.json(
        updatedIssue
      );

    }

    catch(error){

      res.status(500)
      .json({

        message:
        'Failed to update status'

      });

    }

  }
);

module.exports =
router;
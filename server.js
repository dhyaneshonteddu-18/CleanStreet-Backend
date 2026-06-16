const express =
require('express');

const cors =
require('cors');

const path =
require('path');

require('dotenv')
.config();

const connectDB =
require('./config/db');

const authRoutes =
require('./routes/authRoutes');

const issueRoutes =
require('./routes/issueRoutes');

const app =
express();

connectDB();

app.use(cors());

app.use(
  express.json()
);

app.use(
  '/uploads',
  express.static(
    path.join(
      __dirname,
      'uploads'
    )
  )
);

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/issues',
  issueRoutes
);

app.get(
  '/',
  (req,res)=>{
    res.send(
      'CleanStreet Backend Running'
    );
  }
);

const PORT =
process.env.PORT ||
3000;

app.listen(
  PORT,
  ()=>{
    console.log(
      `Server running on port ${PORT}`
    );
  }
);
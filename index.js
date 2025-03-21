const express = require('express')
const {connnectToMongoDB} = require('./connect')
const URL = require('./models/url')
const path = require('path')
const cookieParser = require('cookie-parser')
const {restrictToLoggedUserOnly} = require('./middlewares/auth')

const app = express()
const PORT = 8001

//routes
const staticRoute = require('./routes/staticRouter')
const urlRoute = require('./routes/url')
const userRoute = require('./routes/user')


connnectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => {console.log('mongodb connected')})

//setting up ejs template.
app.set("view engine" , "ejs");
app.set('views' , path.resolve("./views"))

//middleware for parsing json data.
app.use(express.json())

app.use(cookieParser());

// middleware to parse formdata .ejs
app.use(express.urlencoded({extended : false}))


app.use("/user" , userRoute);
app.use("/url" ,restrictToLoggedUserOnly , urlRoute);
app.use('/' , staticRoute);


app.get("/test" , async (req , res) => {
  const allUrls = await URL.find({})
  return res.render('home' , {
    urls : allUrls,
  });
});


app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId : shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    
    res.redirect(entry.redirectURL);
 });


 app.listen(PORT , () => {console.log(`server started at port ${PORT}`)})


const express = require('express')
const {connnectToMongoDB} = require('./connect')
const URL = require('./models/url')
const urlRoute = require('./routes/url')


const app = express()
const PORT = 8001

connnectToMongoDB('mongodb://localhost:27017/short-url')
.then(() => {console.log('mongodb connected')})

app.use(express.json())
app.use("/url" , urlRoute)

app.get("/test" , async (req , res) => {
  const allUrls = await URL.find({})
  return res.end(`
      <html>
        <head></head>
        <body>
            <ol>
                ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - ${url.visitHistory.length}</li>`).join('')}
            </ol>
        </body>
      </html>
    `
  )
})


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


import express from 'express'
import testRoute from './src/Routes/testRoute.js'


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

app.use("/TEST",testRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
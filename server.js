import express from 'express'
import routeNote from './src/tesrRoute/testRoute.js'
const app = express()

const port = 3000

app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/TEST",routeNote)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
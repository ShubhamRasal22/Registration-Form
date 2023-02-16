import express from 'express';
const app = express()
const port  = process.env.PORT || '7675'



app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})
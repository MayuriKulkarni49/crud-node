const express=require('express')
const app=express()
const mysql=require('mysql')
const body_parser=require('body-parser')
const cors=require('cors')

const db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Mayuri@4997',
    database:'crud-node'
})
app.use(body_parser.urlencoded({extended:true}))
app.use(cors())
app.use(express.json())
app.post('/api/insert',(req,res)=>{
    const sqlInsert="INSERT INTO `crud-node`.`movie-review` (`name`, `review`) VALUES (?, ?)"
    const movieName=req.body.movieName
    const review=req.body.review
    db.query(sqlInsert,[movieName,review],(err,result)=>{
        res.status(200).send('insertion successful')

    })
})

app.get('/api/get',(req,res)=>{
    const getDetails="SELECT *FROM `crud-node`.`movie-review`"
    db.query(getDetails,(err,result)=>{
        res.send(result)
    })
})

app.delete('/api/delete/:movieId',(req,res)=>{
    const id=req.params.movieId
    const deleteMovie="DELETE FROM `crud-node`.`movie-review` WHERE (`id` = ?)"
    db.query(deleteMovie,id,(err,result)=>{
        res.status(200).send("deletion successful")
    })
})

app.put('/api/update/:id',(req,res)=>{
    const id=req.params.id
    const movieName=req.body.movieName
    const review=req.body.review
    const updateQuery="UPDATE `crud-node`.`movie-review` SET `review` = ? WHERE (`id` = ?);"
    db.query(updateQuery,[review,id],(err,result)=>{
        res.status(200).send("updation successful")
    })
})

app.listen(3001,()=> console.log("listening on port 3001"))
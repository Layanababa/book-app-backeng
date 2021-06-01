'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const Data=require('./Data');
// const seedBookCollection=require('./Data');
// const seedOwnerUserCollection=require('./Data');
// const getBookHandler=require('./Data');
// const addBookHandler=require('./Data');




const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT;


// seedOwnerUserCollection();
// http://localhost:3001/book?email=leana_baba@yahoo.com
server.get('/book',getBookHandler);
server.post('/addBook',addBookHandler);
server.delete('/deleteBook/:index',deleteBookHandler);
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myFavoriteBooks',
   { useNewUrlParser: true, useUnifiedTopology: true });



const bookSchema = new mongoose.Schema({
   name: String,
   description: String,
   img: String, 
   status: String

});

const userSchema = new mongoose.Schema({
   email: String,
   books: [bookSchema]
});

const bookUser = mongoose.model('book', bookSchema);
const ownerUser = mongoose.model('user', userSchema);

function seedBookCollection(){
   const book1 = new bookUser ({
       name: 'Living in the Light: A guide to personal transformation',
       description: 'Learn to light a candle in the darkest moments of someone’s life. Be the light that helps others see; it is what gives life its deepest significance.',
       img:`https://m.media-amazon.com/images/I/411a3QxUrPL.jpg`,
       status: 'Still reading.'
   })

   const book2 = new bookUser ({
       name: 'Give and Take: WHY HELPING OTHERS DRIVES OUR SUCCESS',
       description: 'Everything in the universe is within you. Ask all from yourself.',
       img:`https://m.media-amazon.com/images/I/41PDasOQTxL.jpg`,
       status: 'Still reading.'
   })

   const book3 = new bookUser ({
       name: `13 Things Mentally Strong People Don't Do`,
       description: `Make yourself a priority once in a while. It's not selfish. It's necessary.`,
       img: `https://images-na.ssl-images-amazon.com/images/I/41JQFNXxfdL._SX326_BO1,204,203,200_.jpg`,
       status: 'Still reading.'
   })

   book1.save();
   book2.save();
   book3.save();


}
// seedBookCollection();
function seedOwnerUserCollection(){
   const account1 = new ownerUser ({
       email: `lolo.baba2014@gmail.com`,
       books:[
           {
               name: 'Living in the Light: A guide to personal transformation',
               description: 'Learn to light a candle in the darkest moments of someone’s life. Be the light that helps others see; it is what gives life its deepest significance.',
               img:`https://m.media-amazon.com/images/I/411a3QxUrPL.jpg`,
               status: 'Still reading.'  
           }
       ]

   })

   const account2 = new ownerUser ({
       email: `leana_baba@yahoo.com`,
       books:[
           {
               name: 'Give and Take: WHY HELPING OTHERS DRIVES OUR SUCCESS',
       description: 'Everything in the universe is within you. Ask all from yourself.',
       img:`https://m.media-amazon.com/images/I/41PDasOQTxL.jpg`,
       status: 'Still reading.'  
           },
           {
               name: `13 Things Mentally Strong People Don't Do`,
       description: `Make yourself a priority once in a while. It's not selfish. It's necessary.`,
       img: `https://images-na.ssl-images-amazon.com/images/I/41JQFNXxfdL._SX326_BO1,204,203,200_.jpg`,
       status: 'Still reading.'
           }
       ]

   })
   account1.save();
   account2.save();
}

function getBookHandler(req,res){
   let userName=req.query.email;
   ownerUser.find({email:userName},function(err,ownerData){
       if(err) {
           console.log('did not work')
       } else {
           // console.log(ownerData)
           // console.log(ownerData[0])
           // console.log(ownerData[0].books)
           res.send(ownerData[0].books)
       }
   })
}

function addBookHandler(req,res){
   console.log(req.body);
   let userName=req.body.email;
   console.log(userName);
   const {name,description,img,status} = req.body;
   ownerUser.find({email:userName},(error,userData)=>{
       if(error){res.send('not working')}
       else {
           console.log('before pushing',userName)

           userData[0].books.push({
               name: name,
               description: description,
               img:img,
               status:status
           })
           console.log('after pushing',userData[0].books)
           userData[0].save();

           res.send(userData[0].books);

       }
   })   
}

function deleteBookHandler (req,res){
    const email = req.query.email;
    const index = Number(req.params.index);

    ownerUser.find({email:email},(error,ownerData)=>{
        // filter the cats for the owner and remove the one that matches the index
        const newBookArr = ownerData[0].books.filter((item,idx)=>{
            if( idx !== index) return item;
            // return idx !==index
        })
        ownerData[0].books = newBookArr;
        ownerData[0].save();
        res.send(ownerData[0].books)
    })
}

server.listen(PORT, () => {
    console.log(`Listenging on PORT ${PORT}`);
})

server.get('/', (req, res) => {
    res.send('The home route')
})
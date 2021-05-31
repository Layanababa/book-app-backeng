'use strict';
 module.exports=seedBookCollection;
 module.exports=seedOwnerUserCollection;
 module.exports=getBookHandler;

 
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
            console.log(ownerData)
            console.log(ownerData[0])
            console.log(ownerData[0].books)
            res.send(ownerData[0].books)
        }
    })
}
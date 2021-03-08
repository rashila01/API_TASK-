const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = mongoose.model('User')

const app = express();
const port = 8000;

let blogs=[];

// app.use(bodyParser.json());
app.use(express.json());


//query all stored users
app.get('/user',async (req,res)=>{
    try{
    let users=await User.find({});
    res.json({data:users});
}catch(e){
    res.status(400).json({error:'Bad Request'});
}
});

//store a user
app.post('/user',async(req,res)=>{
    try{
    let{firstName, lastName, address, phone, age} = req.body;
    let user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.address = address;
    user.phone = phone;
    user.age = age;
    user.status = true;
    user.createdAt=Date.now();
    await user.save();

    res.json({data:user});
}catch(e){
    res.status(400).json({error:'Bad Request'});
}

});


//update a user by id
app.put('/user/:id',async(req,res)=>{ 
    try{
        let user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({error:'Data not found'});
        }
    
        let{firstName, lastName, address, phone, age} = req.body;
        user.firstName = firstName;
        user.lastName = lastName;
        user.address = address;
        user.phone = phone;
        user.age = age;
        await user.save();
        res.json({data:user})
    }catch(e){
        res.status(400).json({error:'Bad Request'});
    }

});

//query a user through given id 
app.get('/user/:id', async (req, res)=>{
    try{
        let user = await UserfindById(req.params.id);
    res.json({data: user})
    }catch(e){
        res.status(400).json({error:'Bad Request'});
    }
})

//delete a user by given id
app.delete('/user/:id', async(req, res)=>{
    try{

        let user = await User.findById(req.params.id);
        if(user){
            await User.remove({_id: req.params.id});
        }
        res.status(204).json({});
    
    }catch(e){
        res.status(400).json({error:'Bad Request'});

    }
})
app.listen(port, ()=>{
    console.log(`Application is running on port:${port}`)    
})


module.exports = app

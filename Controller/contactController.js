const asyncHandler = require('express-async-handler')
const Contact = require('../model/contactModel')

//@desc: Get all the contacts
//@route: Get /getAllContacts
//Access public

const getContact = asyncHandler(async(req,res)=>{

    const contacts = await Contact.find({user_id: req.user.id});
    res.status(201).json(contacts);
})

//@desc: Add a new contact
//@route: Get /addContact
//Access public

const addContact = asyncHandler(async(req,res)=>{
    let {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All the fields are required.")
    }
    const contact = await Contact.create({
        user_id : req.user.id,
        name,
        email,
        phone
        
    });
    console.log('contact ,',contact);
    res.status(201).json(contact);
})

//@desc: Get a contact
//@route: Get /addContact
//Access public

const getAContact = asyncHandler(async(req,res)=>{
    console.log('req : ',req.params.id);
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404).json({message: 'Contact not found'});
    }
    res.status(201).json(contact);
})

//@desc: Add a new contact
//@route: Get /addContact
//Access public

const editAContact = asyncHandler(async(req,res)=>{
    //In order to update a contact we need to fetch it and then update it
    const contact = await Contact.findById(req.params.id);
    console.log('contact : ',contact);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(201).json(updatedContact);
})


//@desc: Delete a contact
//@route: Get /addContact
//Access public
const deleteAContact = asyncHandler(async(req,res)=>{
    //To delete a contact first we have to search that contact to know if it is there in db or not. Then Delete it
    const contact = await Contact.findById(req.params.id);
    console.log('contact : ',contact);
    if(!contact){
        res.status(404);
        throw new Error('Contact not found');
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
})

module.exports = {getContact, addContact, getAContact, editAContact, deleteAContact};
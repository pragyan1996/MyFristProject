const asyncHandler = require('express-async-handler')
const Contact = require('../model/contactModel')

//@desc: Get all the contacts
//@route: Get /getAllContacts
//Access public

const getContact = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find();
    console.log('contacts : ',contacts);
    res.status(201).json(contacts);
})

//@desc: Add a new contact
//@route: Get /addContact
//Access public

const addContact = asyncHandler(async(req,res)=>{
    console.log("The request body : ",req.body);
    let {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("All the fields are required.")
    }
    const contact = await Contact.create({
        name,email,phone
    });
    res.status(201).json(contact);
})

//@desc: Get a contact
//@route: Get /addContact
//Access public

const getAContact = asyncHandler(async(req,res)=>{
    console.log('req : ',req.params.id);
    const contact = await Contact.findByID(req.params.id);
    console.log('contact : ',contact);
    if(!contact){
        res.status(404).json({message: 'Contact not found'});
    }
    res.status(201).json(contact);
})

//@desc: Add a new contact
//@route: Get /addContact
//Access public

const editAContact = asyncHandler(async(req,res)=>{
    res.status(201).json({message:"Get a contacts"});
})


//@desc: Delete a contact
//@route: Get /addContact
//Access public
const deleteAContact = asyncHandler(async(req,res)=>{
    res.status(201).json({message:"Delete a contact"});
})

module.exports = {getContact, addContact, getAContact, editAContact, deleteAContact};
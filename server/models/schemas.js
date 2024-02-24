// import Image from 'react-bootstrap/esm/Image';

const mongoose = require('mongoose');
// const { default: Image } = require('react-bootstrap/esm/Image');

const Schema = mongoose.Schema;

let klipSchema = new Schema({
    title: {type: String},
    message: {type: String},
    entryDate: {type: Date, default: Date.now}
})

const Klips = mongoose.model('Klips', klipSchema, 'klips')

const Schemas = {Klips: Klips}

module.exports = Schemas
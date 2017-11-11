// const mongoose = require('mongoose');
//
//   mongoose.connect('mongodb://heroku_d895z9hp:74v0ph37vib5v5gf02jb675acf@ds135522.mlab.com:35522/heroku_d895z9hp', err => {
//     if (err) {
//     console.log("couldn't connect to MongoDB");
//     }
//     console.log('#connected to MongoDB!')
//   })
//
//   const Class = mongoose.model('Class', {
//     event_id: String,
//     time: Date,
//     location: String,
//     url: String
//   })
//
//   Class.create({
//     event_id: "301230213201430232103012a302",
//     time: new Date(),
//     location: "Wcoding",
//     url: "https://www.meetup.com/Learn-Teach-Code-Seoul/events/240927632/",
//   }, (err, data)=>{
//     console.log('#saved ' + data);
//     mongoose.disconnect(err =>{
//       console.log('#disconnected from MongoDB');
//     })
//   })
//
//   Class.findById('594f6dff9a856b58a9299750', (err, data) =>{
//     console.log(data);
//       mongoose.disconnect(err =>{
//         console.log('#disconnected from MongoDB');
//       })
//   })
//
//   Class.findByIdAndUpdate('594f6dff9a856b58a9299750',
//   {location: 'Hawaii', time: new Date()}
//    ,(err, data) =>{
//     console.log(data);
//       mongoose.disconnect(err =>{
//         console.log('#updated and disconnected from MongoDB');
//       })
//   })
//
//   Class.findByIdAndRemove('594f6dff9a856b58a9299750', (err, data) =>{
//     console.log(data);
//       mongoose.disconnect(err =>{
//         console.log('#Found, removed, and disconnected from MongoDB');
//       })
//   })
//
//   Class.find({}, (err, article) =>{
//     console.log(article);
//       mongoose.disconnect(err =>{
//         console.log('#found all and disconnected from MongoDB');
//       })
//   })

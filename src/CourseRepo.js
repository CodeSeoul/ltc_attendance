const Course = require('../models/Course').Course;
const Courses = require('../models/Course').Courses;

Course.create({
  title: "Web Dev",
  description: "Learning Bootstrap"
}, (err, data)=>{
  console.log('#saved ' + data);
  mongoose.disconnect(err =>{
    console.log('#disconnected from MongoDB');
  })
})

Course.findById('594f6dff9a856b58a9299750', (err, data) =>{
  console.log(data);
    mongoose.disconnect(err =>{
      if(err){
        console.log("Couldn't find this course");
      }
      console.log('#disconnected from MongoDB');
    })
})

Course.findByIdAndUpdate('594f6dff9a856b58a9299750',
{title: 'Java Beginners', description: "learn about objects"}
 ,(err, data) =>{
  console.log(data);
    mongoose.disconnect(err =>{
      console.log('#updated and disconnected from MongoDB');
    })
})

Course.findByIdAndRemove('594f71d294f11e593a927ef9', (err, data) =>{
  console.log(data);
    mongoose.disconnect(err =>{
      console.log('#Found, removed, and disconnected from MongoDB');
    })
})

Course.find({}, (err, article) =>{
  console.log(article);
    mongoose.disconnect(err =>{
      console.log('#found all and disconnected from MongoDB');
    })
})

module.exports = CourseRepo

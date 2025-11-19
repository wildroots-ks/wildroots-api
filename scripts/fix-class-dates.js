require('dotenv').config();
const mongoose = require('mongoose');

async function fixClassDates() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Access the classes collection directly (bypass Mongoose model)
    const db = mongoose.connection.db;
    const classesCollection = db.collection('classes');

    // Get all classes
    const classes = await classesCollection.find({}).toArray();
    console.log(`Found ${classes.length} classes to update`);

    // Update each class
    for (const classItem of classes) {
      let dateString;
      
      if (classItem.date instanceof Date) {
        // It's a Date object - convert to YYYY-MM-DD string
        dateString = classItem.date.toISOString().split('T')[0];
      } else if (typeof classItem.date === 'string' && classItem.date.includes('GMT')) {
        // It's a string but contains timezone info - extract just the date
        const date = new Date(classItem.date);
        dateString = date.toISOString().split('T')[0];
      } else {
        // Already a simple string
        dateString = classItem.date;
      }
      
      console.log(`Updating ${classItem.title}:`);
      console.log(`  Old: ${classItem.date}`);
      console.log(`  New: ${dateString}`);
      
      await classesCollection.updateOne(
        { _id: classItem._id },
        { $set: { date: dateString } }
      );
    }

    console.log('✅ All class dates updated successfully!');
    
    // Verify the changes
    const updatedClasses = await classesCollection.find({}).toArray();
    console.log('\nVerification:');
    updatedClasses.forEach(c => {
      console.log(`  ${c.title}: "${c.date}" (type: ${typeof c.date})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixClassDates();
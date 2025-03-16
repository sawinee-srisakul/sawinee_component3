const mongoose = require('mongoose');
async function main() {
  //Please note that this string would be different for everyone.
  const uri =
    'mongodb+srv://admin_courses:CbPIoJaaunxrxvXN@cluster0.oquu1.mongodb.net/courses-iat-sawinee';
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    const dbName = db.databaseName;
    console.log(
      `Connected to MongoDB Atlas using Mongoose! Database Name: ${dbName}`
    );
    const collections = await db.listCollections().toArray();
    console.log(
      `Database Info: ${dbName} has ${collections.length} collections`
    );

    console.log('Collections:');
    collections.forEach((collection) => {
      console.log(collection.name);
    });
  } catch (e) {
    console.error(e);
  }
}
main().catch(console.error);

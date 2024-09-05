export const databaseConfig = {
    uri: process.env.MONGODB_URI,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,   
    dbName: process.env.MONGO_DATABASE,
    authSource: 'admin',
    socketTimeoutMS: 30000,
    keepAlive: true,
    connectTimeoutMS: 30000,
  };
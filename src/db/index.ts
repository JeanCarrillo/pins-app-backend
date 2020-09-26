import * as mongoose from 'mongoose';

const { MONGO_LOGIN, MONGO_PW, MONGO_CLUSTER_URL, DB_NAME } = process.env;

mongoose
  .connect(
    `mongodb+srv://${MONGO_LOGIN}:${MONGO_PW}@${MONGO_CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('MongoDB connected successfully'))
  .catch(() => console.log('MongoDB failed to connect'));

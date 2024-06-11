import app from './app';
import { connect } from "./utils/mongodb";

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  /* eslint-disable no-console */
  // await connect();
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
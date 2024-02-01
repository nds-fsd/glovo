const { app } = require("./server");
const server = app.listen(3001, () => {
  if (process.env.NODE_ENV !== "test") {
    console.log("Server is up and running ⚡");
  }
});

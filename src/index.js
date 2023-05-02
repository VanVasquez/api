const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;

module.exports = {
  start: () => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  },
};

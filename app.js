import express from "express";
import mongoose from "mongoose";
import store from "./api/models/store.js";

const app = express();
const port = 5500;

//conexion con mongoDB
const mongoURL =
  "mongodb+srv://usuario_jahz:1234@cluster0.nkcye.mongodb.net/FirstProject?retryWrites=true&w=majority";

mongoose.connect(mongoURL, { useNewUrlParser: true });

//middlewere
app.use(express.json({ limit: "50mb" }));

//end point
app.post("/api/clients", (req, res) => {
  console.log(req.body);
  let clientData = req.body;
  let mongoRecords = [];
  clientData.forEach((el) => {
    mongoRecords.push({
      firstName: el.firstName,
      phone: el.phone,
      address: el.address,
    });
  });
  //res.send("You have posted someThing");
  store.create(mongoRecords, (err, records) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(records);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

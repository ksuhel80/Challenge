const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
console.log(process.env.USERNAME, process.env.PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pr4szdl.mongodb.net/Challenge?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: String,
  children: [
    {
      name: String,
      children: [
        {
          name: String,
          children: [
            {
              label: String,
            },
          ],
        },
      ],
    },
  ],
});

const userSchema = new mongoose.Schema({
  name: String,
  sectors: [String],
  terms: Boolean,
});

const saveInDB = async () => {
  const Product = mongoose.model("sectors", productSchema);
  let data = new Product({
    name: "Service",
    sub_sector: [
      {
        name: "Business services",
      },
      {
        name: "Engineering",
      },
      {
        name: "Information Technology and Telecommunications",
        subs: [
          {
            name: "Data processing, Web portals, E-marketing",
          },
          {
            name: "Programming, Consultancy",
          },
          {
            name: "Software, Hardware",
          },
          {
            name: "Telecommunications",
          },
        ],
      },
      {
        name: "Tourism",
      },
      {
        name: "Translation services",
      },
      {
        name: "Transport and Logistics",
        subs: [
          {
            name: "Air",
          },
          {
            name: "Rail",
          },
          {
            name: "Road",
          },
          {
            name: "Water",
          },
        ],
      },
    ],
  });
  const result = await data.save();
  console.log(result);
};

const saveUserInDB = async () => {
  const Product = mongoose.model("users", userSchema);
  let data = new Product({
    name: "String",
    sectors: ["String", "String1"],
    terms: true,
  });
  const result = await data.save();
  console.log(result);
};

const updateInDB = async (dataa) => {
  const Product = mongoose.model("users", userSchema);
  let data = await Product.updateOne(
    { _id: dataa._id },
    {
      $set: { name: dataa.name, sectors: dataa.sectors, terms: dataa.terms },
    }
  );
  console.log(data);
  if (data.matchedCount === 0) {
    let data = new Product({
      name: dataa.name,
      sectors: dataa.sectors,
      terms: dataa.terms,
    });
    const result = await data.save();
    console.log(result);
    return result;
  }
  return data;
};

const findInDB = async (collection, schema) => {
  const Product = mongoose.model(collection, schema);
  let data = await Product.find({});
  console.log(data);
  return data;
};

app.get("/", async (req, res) => {
  const result = await findInDB("sectors", productSchema);
  res.send(result);
});

app.get("/sectors", async (req, res) => {
  const Product = mongoose.model("sectors", productSchema);
  let data = await Product.find({}, { _id: 0, __v: 0 });
  console.log(data);

  res.send(data);
});

app.get("/users", async (req, res) => {
  const result = await findInDB("users", userSchema);

  res.send(result);
});

app.post("/users", async (req, resp) => {
  console.log(req.body[0]);
  const result = await updateInDB(req.body[0]);
  resp.send(result);
});
// findInDB("sectors", productSchema);
// findInDB("users", userSchema);
app.listen(port, () => {
  console.log("hiring manager task");
});

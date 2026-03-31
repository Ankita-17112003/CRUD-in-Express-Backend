const express = require("express");
const app = express();


const PORT = 3000;
const HOST = `127.0.0.1`;

//dotenv config
const dotenv = require("dotenv")
dotenv.config();

//middleware

app.use(express.static("public/"));
app.use(express.urlencoded({ extended: true }));

//DB config
const connection = require("./config/db");

//model
const userSchema = require("./model/userSchema");

//routes
app.get("/", (req, res) => {
  res.status(200).render("home.ejs");
});

// saveform
app.post("/saveform", async (req, res) => {
  try {
    const result = new userSchema(req.body);
    await result.save();
    console.log("data inserted suceessfully");
    res.redirect("/view-users");
  } catch (err) {
    res.send("internal server error");
    console.log("something went wrong", err);
  }
});

//read
app.get("/view-users", async (req, res) => {
  try {
    const result = await userSchema.find();
    const obj = { data: result };

    res.render("view_user.ejs", obj);
  } catch (err) {
    console.log("something went wrong", err);
  }
});
// delete route

app.get("/deleteuser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await userSchema.findByIdAndDelete(id);
    res.redirect("/view-users");
  } catch (err) {
    console.log("something went wrong ", err);
  }
});

//edit routes

app.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // res.send("edit form = "+id);
    const result = await userSchema.findById(id)
    // res.send(result)
    const obj = {data:result}
    res.render("edit.ejs",obj)
  } catch (err) {
    console.log("something went wrong", err);
  }
});

app.post("/updateuser/:id",async(req,res)=>{
  try{
 const id =req.params.id
  await userSchema.findByIdAndUpdate(id,req.body)
  // res.send(req.body)
 res.redirect("/view-users")
  }catch(err){
    console.log("something went wrong",err);
    
  }
 
})
app.listen(PORT, HOST, () => {
  console.log(`server is running on http://${HOST}:${PORT}`);
});

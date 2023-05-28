const express = require('express');
const connectDb = require('./config/connectdb')
const app = express();
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const AccountRouter = require('./routes/accountUser');
const blogRoutes = require('./routes/blogRoutes');
const petRoutes = require('./routes/petRoutes');
const AppoinementRoutes = require('./routes/ApoinementsRoute');
const AnnonceRoutes = require('./routes/AnnonceRoutes');
require('dotenv').config();
const PORT = process.env.PORT || 5000 ;


connectDb() ;

app.use( '/public',express.static('public'));

app.use(cors({credentials: true ,origin:"http://localhost:3000"}))

app.use(express.json({extended: false}))

// app.get('/',(req,res)=>{
//     req.send("this is the server side")
// })

app.use('/api/auth',authRoutes);
app.use('/account/user',AccountRouter);
app.use ('/api/blogs', blogRoutes);
app.use ('/api/pets', petRoutes);
app.use ('/api/annonce', AnnonceRoutes);
app.use ('/api/appoinement', AppoinementRoutes);


app.listen(PORT , (err)=>{
    (err)? console.log(err) : console.log(`server starting at port :${PORT}`)
})
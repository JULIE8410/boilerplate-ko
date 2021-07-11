const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const config = require('./config/key');

const { User } = require('./models/User');

//bodyParser가 서버에서 가져온것을 분석해서 서버에서 이용할 수 있게 해줌
// application/w-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

}).then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.get('/', (req, res) => {
    res.send('Hello world');
})


app.post('/register', (req, res) => {
    
    // 회원가입할때 필요한 정보들을 Client에서 가져와서 데이터베이스에 넣어줌
    const user = new User(req.body);
    
    //MongoDB의 메소드, save()
    user.save((err, userInfo) => {
        if(err){
            return res.json({success:false, err})
        }
        return res.status(200).json({
            success: true
        });
    })
});


app.listen(port, () => console.log('App is running on port ${port}'));
const express = require('express')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const User = require("./models").User
const Tag = require("./models").Tag
const UserTags = require("./models").UserTags
const hash = require("./helpers/hashPassword")
const multer = require('multer')
const upload = multer({})
app.use(express.static("public"));
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res) => res.render('index'))
app.get('/register', (req, res) => {
    let err = null;
    res.render('register.ejs', {err})
})



app.post(`/register`, function (req, res) {
    User
        .create({
            UserName: req.body.userName,
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            Email: req.body.email,
            Address: req.body.address,
            Birthday: req.body.birthday,
            Password: req.body.password,
        })
        .then(function () {
            res.redirect(`/`)
        })
        .catch(function (err) {
            res.render("register", {err})
        })
    })
// login
app.get(`/`, function (req, res) {
    let error = null
    res.render("index", {error})
})

app.post(`/`, function (req, res) {
    User
        .findOne({
            where: {
                Email: req.body.email
            }
        })
        .then(function (data) {
            req.session.user = data.dataValues.UserName
            if (data.dataValues.Password === hash(req.body.password, data.dataValues.salt)) {
                res.redirect(`/user`);

            } else {
                let error = "error"
                // console.log(error);

                res.render("index", {error})
            }

        })
        .catch(function (err) {
            // let error = "error"
            console.log(err.message);

            res.render("index", {err})
        })
    })

//halaman user

//halaman user

app.get('/user', (req, res) => {
    let dataUser = null;
    let dataTag = null;
    return User
        .findOne({
            include: Tag,
            where: {
                UserName: req.session.user
            }
        })
        .then((data) => {
            dataUser = data;
            return Tag.findAll()
        })
        .then((data) => {
            dataTag = data
            res.render('user', {
                data: dataUser,
                // data: dataUser.dataValues.avatar,
                dataTag,
                tagName: dataUser.dataValues.Tags
            });
        })
        .catch(err => {
            res.send(err);
        })
    })

//post avatar dan interests

app.post('/user', upload.single('avatar'), function (req, res, next) {
    let dataUser = null;
    // console.log(req.body, req.query)
    let dataForm = {}
    if (req.query.tag) {
        dataForm = {
            tag: req.body.tag
        }
    } else if (req.query.description) {
        dataForm = {
            description: req.body.description
        }
    } else {
        dataForm = {
            avatar: req
                .file
                .buffer
                .toString('base64')
        }
    }


    
    return User
        .update(dataForm, {
            where: {
                UserName: req.session.user
            }
        })
        .then(function () {
            
            return User.findOne({
                include: Tag,
                where: {
                    UserName: req.session.user
                }
            })
        })
        .then(function (data) {
            dataUser = data            
            return Tag.findAll()
        })
        .then(function (data) {
            dataTag = data;
            
            return UserTags.create({UserId: dataUser.dataValues.id, TagId: req.body.tag})
        })
        .then(() => {
            res.redirect(`/user`)

        })
        .catch(function (err) {
            console.log(err.message);
            res.send(err)
        })
    })

//cek match

app.get(`/match`, function (req, res) {
    User
        .findOne({
            where: {
                UserName: req.session.user
            },
            include: [
                {
                    model: Tag,
                    include: [
                        {
                            model: User,
                            where: {
                                UserName: {
                                    [Op.not]: req.session.user
                                }
                            }

                        }
                    ]
                }
            ]

        })
        .then(function (data) {
            res.render('match', {data})
            // res.send(data.Tags[0].Users)
        })
    app.get(`/otheruser/:username`, (req, res) => {
        let dataUser = null;
        let dataTag = null;
        return User
            .findOne({
                include: Tag,
                where: {
                    UserName: req.params.username
                }
            })
            .then((data) => {

                dataUser = data;
                console.log(data);
                return Tag.findAll()
            })
            .then((data) => {
                dataTag = data
                res.render('otherUser', {
                    // data nya sama nnti di ubah
                    data: dataUser,
                    // dataAvatar: dataUser.avatar,
                    dataTag,
                    tagName: dataUser.Tags
                });
            })
            .catch(err => {
                console.log(err.message);

                res.send(err);
            })
        })
})

app.listen(port, () => console.log(`listening on port ${port}!`))
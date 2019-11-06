const userDb = require('./userDb');

const router = require('express').Router();

router.post('/', validateUser, (req, res) => {
    userDb.insert(req.body)
        .then(user => {
            res.status(201).json({
                success: true,
                user
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "server error"
            })
        })
});

router.post('/:id/posts', validateUserId, (req, res) => {


});

router.get('/', (req, res) => {
    userDb.get()
    .then(users => {
        res.status(200).json({success:true, users})
    })
    .catch( err => {
        res.status(500).json({success:false,err});
    })

});

router.get('/:id', validateUserId,(req, res) => {
    res.status(200).json({success:true, user:req.user})
});

router.get('/:id/posts', validateUserId,(req, res) => {
    if(req.user) 
    userDb.getUserPosts(req.user.id)
    .then(posts => {
        res.status(200).json({succes:true, posts});
    })
    .catch(err => {
        res.status(500).json({succes:false,err})
    })
});

router.delete('/:id', validateUserId,(req, res) => {
    if(req.user){
        userDb.remove(req.user.id)
        .then(user => {
            res.status(204).json({success:true,user});
        })
        .catch(err => {
            res.status(500).json({succes:false,err});
        });
    }
});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const {
        id
    } = req.params;

    userDb.getById(id)
        .then(user => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(400).json({
                    message: "invalid user id"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

};

function validateUser(req, res, next) {
    const requiredBody = req.body
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            message: "you aint got no body"
        });
    } else if (!requiredBody.name) {
        res.status(400).json({
            message: "missing require field name"
        });
    } else {
        next();
    }

};

function validatePost(req, res, next) {
    const requiredBody = req.body
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            message: "you aint got no body"
        });
    } else if (!requiredBody.text) {
        res.status(400).json({
            message: "missing require field text"
        });
    } else {
        next();
    }
};

module.exports = router;
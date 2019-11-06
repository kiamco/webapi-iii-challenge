const router = require('express').Router();
const postDb = require('./postDb');
router.get('/', (req, res) => {
    postDb.get()
        .then(posts => {
            res.status(200).json({
                success: true,
                posts
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                err
            });
        })
});

router.get('/:id', validatePostId, (req, res) => {
    if (req.post) {
        postDb.getById(req.post.id)
            .then(posts => {
                res.status(200).json({
                    success: true,
                    posts
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    err
                });
            })
    }
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    const {
        id
    } = req.params;

    console.log(postDb.getById(2));
    postDb.getById(id)
    .then(posts => {
            console.log(posts)
            if (posts) {
                req.post = posts;
                next();
            } else {
                res.status(400).json({
                    message: "invalid post id"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

};

module.exports = router;
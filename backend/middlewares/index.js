async function logger (req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
}

async function isLoggedIn (req, res, next) {
    let authorization = req.session.userdata

    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }
    req.user = req.session.userdata
    next()
}


module.exports = {
    logger, isLoggedIn
}
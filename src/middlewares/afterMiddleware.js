'use-strict'

const finalResponseHandler = (req, res, next) => {
    console.log('Final immutable response handler triggered');
    res.send(req.res);
};

module.exports=finalResponseHandler
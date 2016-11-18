"use strict";

var jwt = require('jsonwebtoken');
var config = require('../../config/main');


class token {
    token(req) {
        return req.headers.authorization.replace(/^\jwt /i, "");
    }
    verify(req, cb) {
        jwt.verify(this.token(req), config.secret, { complete: true }, (err, decoded) => {
            if (err) {
                cb(err);
            } else {
                cb(null, decoded);
            }
        })
    }

}

module.exports = token;
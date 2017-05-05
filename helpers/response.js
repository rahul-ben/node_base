'use strict';
var models = require('mongoose').models;
module.exports = function (res) {
    return {
        success: function (message,code) {
            res.json({
                is_success: true,
                message: message,
                code:code
            });
        },
        failure: function (error,code, message) {
            res.json({
                is_success: false,
                message: message,
                error: error,
                code: code
            });
        },
        data: function (item, message,code) {
            res.json({
                is_success: true,
                message: message,
                data: item,
                code:code
            });
        },
        page: function(items, total, page_no) {
            res.json({
                is_success: true,
                page_no: page_no || 1,
                items: items,
                total: total || items.length
            });
        }
    };
};


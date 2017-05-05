var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var handler = require('../helpers/input_handler');

var post_form = forms.create({
    title: fields.string({
        required: validators.required(' is required')
    })
});


module.exports.post_form = handler.validations(post_form);


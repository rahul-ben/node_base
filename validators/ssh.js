var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var handler = require('../helpers/input_handler');

var ssh_form = forms.create({
    name: fields.string({
        required: validators.required('name is required')
    }),
    key: fields.string({
        required: validators.required('key is required')
    })
});


module.exports.ssh_form = handler.validations(ssh_form);


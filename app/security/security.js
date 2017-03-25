exports.Security = {
    RequestIsValid: function(req, res)
    {
        var errors = require(__base + 'errors');

        // function to check API_KEY for each request
        if (req.body.apiKey != API_KEY)
        {
            errors.response(res, 4);

            return false;
        }
        else
        {
            return true;
        }
    }
}

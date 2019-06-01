import joi from '@hapi/joi';

async function validator({val}) {
    const schema = {
        val: joi.string(),
    }

    const {error, value} = joi.validate({ val }, schema);

    if(error) {
        return error;
    }

    return value;
}  

export {validator}

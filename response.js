module.exports = (data, req, res, next) => {
  let response = {};
  let statusCode;
  if (data.error) {
    if (data.error.isBoom) {
      // eslint-disable-next-line prefer-destructuring
      statusCode = data.error.output.statusCode;
      response = {
        statusCode: data.error.output.statusCode,
        message: data.error.output.payload.message,
      };
    } else {
      console.log(data.error);
      statusCode = 500;
      response = {
        statusCode: 500,
        message: 'Có lỗi xảy ra',
      };
    }
  } else {
    statusCode = 200;
    response = {
      statusCode: 200,
      data,
    };
  }

  return res.status(statusCode).json(response);
};

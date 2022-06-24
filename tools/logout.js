const { logEvents } = require('../tools/logger');

const endMiddleware = (req, res, next) => {
    const defaultWrite = res.write;
    const defaultEnd = res.end;
    const chunks = [];
  
    res.write = (...restArgs) => {
      chunks.push(new Buffer.from(restArgs[0]));
      defaultWrite.apply(res, restArgs);
    };
  
    res.end = (...restArgs) => {
      if (restArgs[0]) {
        chunks.push(new Buffer.from(restArgs[0]));
      }
      const body = Buffer.concat(chunks).toString('utf8');

      logEvents(`${body}\t${JSON.stringify(res.getHeaders())}\t`, 'resLog.txt');
  
      defaultEnd.apply(res, restArgs);
    };
  
    next();
  };



  
module.exports = { endMiddleware };
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
const config = require(`../configuration/mongo-${process.env.NODE_ENV}-server`);

exports.get = key => {
  return process.env[key] || config[key];
};

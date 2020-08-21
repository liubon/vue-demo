// 生产环境
const prodProtocol = 'http://';
const prodHost = 'vue-demo-prod.com';

const prodConfig = {
  host: prodHost,
  url: `${prodProtocol}${prodHost}:`,
  apiUrl: `${prodProtocol}${prodHost}`,
  staticUrl: `${prodProtocol}${prodHost}`,
};

export default prodConfig;

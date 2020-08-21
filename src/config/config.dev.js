// 开发环境配置
const devProtocol = 'https://';
const devHost = 'vue-demo-dev.com';

const devConfig = {
  host: devHost,
  url: `${devProtocol}${devHost}:`,
  apiUrl: `${devProtocol}${devHost}`,
  staticUrl: `${devProtocol}${devHost}`,
};

export default devConfig;

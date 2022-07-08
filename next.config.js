/** @type {import('next').NextConfig} */
const withImages = require('next-images'); // 可选
const withAntdLess = require('next-plugin-antd-less');

const withTM = require('next-transpile-modules')([
  'antd',
]);
// 逐层嵌套
module.exports = withTM(withImages(withAntdLess({
  nextjs: {
    localIdentNameFollowDev: true, // default false, for easy to debug on PROD mode
  }
})));
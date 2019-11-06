import 'antd/dist/antd.css';
import Api from 'wzn-api';

import Util from 'wzn-utils';
import Router from './routes';

const api = new Api();

// 添加请求拦截器
api.interceptors.request.use(config => config, error => Promise.reject(error));

// 添加响应拦截器
api.interceptors.response.use(response => response.data, error => Promise.reject(error));

Object.assign(global, antd);
global.Api = api;
global.Util = Util;

ReactDOM.render(Router, document.getElementById('app'));

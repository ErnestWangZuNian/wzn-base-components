import Router from './routes';
import 'antd/dist/antd.css';

Object.assign(global, antd);

ReactDOM.render(Router, document.getElementById('app'));

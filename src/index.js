import React from 'react';
import ReactDOM from 'react-dom';
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// 全局引入组件样式；

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

import { getRootContainer } from '../utils';
import createStore from './store';
import App from './App';

export default getRootContainer(App, createStore(true));

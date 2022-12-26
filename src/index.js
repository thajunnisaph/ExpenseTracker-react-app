import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ExpenseContextProvider from './store/ExpenseContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ExpenseContextProvider><BrowserRouter><App /></BrowserRouter></ExpenseContextProvider>);

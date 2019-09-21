import React from 'react';
import styles from './App.module.css';
import Layout from './containers/Layout/Layout';
import {BrowserRouter} from 'react-router-dom';
import 'firebase/auth';

function App() {

  return ( 
    <div className={styles.App}>
        <BrowserRouter>
          <Layout>  
          </Layout>   
        </BrowserRouter>   

    </div>
  );
}

export default App;

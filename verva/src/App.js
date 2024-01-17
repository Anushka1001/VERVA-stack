import Home from "./components/Home";
import './App.css';
import { Fragment, useEffect, useState } from "react";
import axios from 'axios';

function App() {

  const [data, setData] = useState([{}])
  useEffect(() => {
    // Fetch data from Flask server 
    axios.get('http://localhost:5000/member')
      .then(response => {
        setData(response.data.member);
        console.log(response.data.member);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Fragment>
        {data.map((member, index) => (
          <div key={index}>{typeof member === 'object' ? JSON.stringify(member) : member}</div>
        ))}
      </Fragment>
      <Home />
    </div>
  );
}

export default App;

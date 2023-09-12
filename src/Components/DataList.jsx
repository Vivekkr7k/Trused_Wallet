import React, { Component } from 'react';

class DataList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    // Fetch data when the component mounts
    const userEmail = localStorage.getItem('email'); // Get the email from localStorage

    if (!userEmail) {
      this.setState({
        error: 'Email not found in localStorage',
        loading: false,
      });
      return;
    }

    fetch('http://localhost:3000/get-all-data') // Replace with your backend API endpoint
      .then((response) => response.json())
      .then((data) => {
        // Filter data based on the UserEmailId
        const filteredData = data.filter((item) => item.UserEmailId === userEmail);

        if (filteredData.length === 0) {
          this.setState({
            data: [],
            loading: false,
          });
        } else {
          this.setState({
            data: filteredData,
            loading: false,
          });

          // Iterate through filteredData and set values in localStorage
          filteredData.forEach((item, index) => {
            localStorage.setItem(`Key${index}`, item.GeneratedKey);
            localStorage.setItem(`Balance${index}`, item.CoinBalance);
           
           
          });

          // Log the values to the console
          for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index);
            const value = localStorage.getItem(key);
            console.log(`${key}: ${value}`);
          }
        }
      })
      .catch((error) => {
        this.setState({
          error: 'Error fetching data',
          loading: false,
        });
      });
  }

  render() {
    const { data, loading, error } = this.state;

    return (
      <div>
        <h1>Data from Backend</h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : data.length === 0 ? (
          <p>No data available for this email.</p>
        ) : (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                Email: {item.UserEmailId}, Key: {item.GeneratedKey}, Balance: {item.CoinBalace}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default DataList;

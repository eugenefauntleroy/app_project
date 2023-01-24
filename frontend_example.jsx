import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    axios.get('/api/properties', { params: filters })
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [filters]);

  const handleFilterChange = event => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <form>
        <label>
          Location:
          <input type="text" name="location" onChange={handleFilterChange} />
        </label>
        <label>
          Price Range:
          <select name="price_range" onChange={handleFilterChange}>
            <option value=""></option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
          </select>
        </label

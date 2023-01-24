import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Home component that displays the list of properties and filter options
function Home() {
  // State to store the list of properties
  const [properties, setProperties] = useState([]);
  // State to store the filter options
  const [filters, setFilters] = useState({});

  // UseEffect Hook to fetch the properties from the backend API
  useEffect(() => {
    axios.get('/api/properties', { params: filters })
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [filters]);

  // Function to handle changes to the filter options
  const handleFilterChange = event => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <form>
        {/* Location filter */}
        <label>
          Location:
          <input type="text" name="location" onChange={handleFilterChange} />
        </label>

        {/* Price range filter */}
        <label>
          Price Range:
          <select name="price_range" onChange={handleFilterChange}>
            <option value=""></option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
          </select>
        </label>
        {/* Other filters such as number of guests, dates, amenities, etc. */}
      </form>
      {/* Display the list of properties */}
      {properties.map(property => (
        <div key={property.id}>
          <h2>{property.name}</h2>
          <img src={property.thumbnail} alt={property.name} />
          <p>{property.location}</p>
          <p>{property.price}</p>
          <button onClick={() => navigate(`/property/${property.id}`)}>View Property</button>
        </div>
      ))}
    </div>
  );
}

export default Home;

//basic example that demonstrates how you might use React and an axios call to fetch data from a backend API, but it is not a complete codebase for a fully functional travel planning site that has similar functionality to Airbnb.The example I provided is only a snippet of the code that handles the filtering of properties on the front-end, it does not include other features such as user authentication, booking, payment, and many other features that are required for a functional travel planning site.

//To build a complete travel planning site like Airbnb, you will also need to build a backend server using a language such as Node.js and a framework like Express.js, and a database such as MongoDB to store user information, properties and booking information.

//Additionally, you'll need to consider implementing user authentication, handling payments and creating a user-friendly interface for customers to easily search and book properties.

//Also, you should consider implementing a CMS to manage properties listing, bookings, and other features.

//It's important to note that building a complex app like this requires a significant amount of technical skills and experience, including programming, software development, and experience with various APIs and frameworks. It's best to consult experts in the field or consider hiring a professional developer if you lack the necessary skills.//
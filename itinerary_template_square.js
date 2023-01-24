import React, { useState } from "react";

// Itinerary component, responsible for displaying the itinerary items
function Itinerary() {
  // useState hook to manage the itinerary items state
  const [itineraryItems, setItineraryItems] = useState([
    { id: 1, name: "Visit the Eiffel Tower", time: "9:00 AM" },
    { id: 2, name: "Take a Boat Tour on the Seine", time: "11:00 AM" },
    { id: 3, name: "Lunch at a French Bistro", time: "1:00 PM" },
  ]);

  return (
    <div>
      <h1>My Itinerary</h1>
      <ul>
        {itineraryItems.map((item) => (
          <li key={item.id}>
            <h2>{item.name}</h2>
            <p>Time: {item.time}</p>
          </li>
        ))}
      </ul>
      <AddItineraryForm addItem={(item) => setItineraryItems([...itineraryItems, item])} />
    </div>
  );
}

// AddItineraryForm component, responsible for adding new itinerary items
function AddItineraryForm({ addItem }) {
  // useState hook to manage the form inputs state
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // add the new item to the itinerary items state
    addItem({ id: Date.now(), name, time });
    // reset the form inputs
    setName("");
    setTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Time:
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

// The App component, that renders the Itinerary component
function App() {
  return (
    <Itinerary />
  );
}

export default App;

//the Itinerary component uses the useState hook to manage the state of the itinerary items,
//and it renders a list of itinerary items using the map function. 
//The AddItineraryForm component uses the useState hook to manage the state of the form inputs, 
//and it renders a form with inputs for the...
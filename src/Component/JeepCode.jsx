import React, { useState } from 'react';

const jeepRoutes = {
  "01A": ["Alpha", "Bravo", "Charlie", "Echo", "Golf"],
  "02B": ["Alpha", "Delta", "Echo", "Foxtrot", "Golf"],
  "03C": ["Charlie", "Delta", "Foxtrot", "Hotel", "India"],
  "04A": ["Charlie", "Delta", "Echo", "Foxtrot", "Golf"],
  "04D": ["Charlie", "Echo", "Foxtrot", "Golf", "India"],
  "06B": ["Delta", "Hotel", "Juliet", "Kilo", "Lima"],
  "06D": ["Delta", "Foxtrot", "Golf", "India", "Kilo"],
  "10C": ["Foxtrot", "Golf", "Hotel", "India", "Juliet"],
  "10H": ["Foxtrot", "Hotel", "Juliet", "Lima", "November"],
  "11A": ["Foxtrot", "Golf", "Kilo", "Mike", "November"],
  "11B": ["Foxtrot", "Golf", "Lima", "Oscar", "Papa"],
  "20A": ["India", "Juliet", "November", "Papa", "Romeo"],
  "20C": ["India", "Kilo", "Lima", "Mike", "Papa", "Romeo"],
  "42C": ["Juliet", "Kilo", "Lima", "Mike", "Oscar"],
  "42D": ["Juliet", "November", "Oscar", "Quebec", "Romeo"]
};

const validateJeepCode = (codes) => {
  const regex = /^(\d{2}[A-Z])(,\d{2}[A-Z])*$/;
  return regex.test(codes);
};

const useJeepCode = () => {
  const [input, setInput] = useState('');
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setRoutes([]);
    setError('');

    if (!validateJeepCode(input)) {
      setError('Invalid format. Please enter valid Jeep Code(s).');
      return;
    }

    const codes = input.split(',');
    const result = codes.map((code) => ({
      code,
      places: jeepRoutes[code] || []
    }));

    setRoutes(result);
  };

  const findCommonPlaces = (allRoutes) => {
    const common = {};

    allRoutes.forEach(({ places }, i) => {
      places.forEach((place) => {
        if (!common[place]) {
          common[place] = new Set();
        }
        common[place].add(i);
      });
    });

    return common;
  };

  return {
    input,
    setInput,
    routes,
    error,
    handleSubmit,
    findCommonPlaces
  };
};

const JeepCode = () => {
  const {
    input,
    setInput,
    routes,
    error,
    handleSubmit,
    findCommonPlaces
  } = useJeepCode();

  const renderRoutes = () => {
    const commonPlaces = findCommonPlaces(routes);

    return routes.map(({ code, places }, routeIndex) => (
      <div key={code} className="route">
        <strong>{code}</strong> ={'>'}{' '}
        {places.map((place, index) => {
          let style = {};
          if (commonPlaces[place].size > 1) {
            const commonRouteIndices = [...commonPlaces[place]];
            const color = routeIndex === commonRouteIndices[0] ? 'yellow' : 'green';
            style = { color };
          }
          return (
            <span key={index} style={style}>
              {place} {index < places.length - 1 && ' <-> '}
            </span>
          );
        })}
      </div>
    ));
  };

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      margin: '20px', padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '5px', 
      maxWidth: '600px' 
      }}>
      <div style={{ 
        backgroundColor: 'maroon', 
        padding: '10px', 
        borderRadius: '5px', 
        marginBottom: '20px'
         }}>
        <h1 style={{ 
          fontSize: '24px', 
          marginBottom: '20px' }}
          >Jeep Code Route Finder</h1>
      </div>
      <div style={{ 
        backgroundColor: 'gold', 
        padding: '10px', 
        borderRadius: '5px', 
        marginBottom: '20px' }}>
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Jeep Code(s) e.g., 01A,03C"
            style={{ 
              padding: '10px', 
              fontSize: '16px', 
              marginRight: '10px', 
              border: '1px solid #ccc',
              borderRadius: '3px' }}
          />
          <button type="submit" style={{ 
            padding: '10px 20px', 
            fontSize: '16px', 
            backgroundColor: 'maroon', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px', 
            cursor: 'pointer' 
            }}>
            Find Route
          </button>
        </form>
        {error && <p style={{ 
          color: 'red', 
          marginBottom: '20px' 
          }}>{error}</p>}
      </div>
      <div style={{ 
        backgroundColor: 'maroon', 
        padding: '10px', 
        borderRadius: '5px' 
        }}>
        <div className="routes" style={{ marginTop: '20px' }}>
          {routes.length > 0 && renderRoutes()}
        </div>
      </div>
    </div>
  );
};

export default JeepCode;
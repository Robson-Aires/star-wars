import React, { useEffect, useState } from 'react';
// import StarWarsContext from '../context/StarWarsContext';
// import { StarwarsProvider: fetchData } from '../context/StarwarsProvider';

function Table() {
  const [inputs, setInputs] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      delete results.residents;
      return setInputs(results);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [inputs]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>orbital_period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          inputs.map((value) => (
            <tr key={ value.name }>
              <td>{value.name}</td>
              <td>{value.rotation_period}</td>
              <td>{value.orbital_period}</td>
              <td>{value.diameter}</td>
              <td>{value.climate}</td>
              <td>{value.gravity}</td>
              <td>{value.terrain}</td>
              <td>{value.surface_water}</td>
              <td>{value.population}</td>
              <td>{value.films}</td>
              <td>{value.created}</td>
              <td>{value.Edited}</td>
              <td>{value.url}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;

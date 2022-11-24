import React, { useEffect, useState } from 'react';

function Table() {
  // const [selected, setselected] = useState({
  //   column: '',
  //   condition: '',
  //   value: '',
  // });
  const [ResultAPIstarwars, setResultAPIstarwars] = useState([]);
  const [inputSearchFilter, setinputSearchFilter] = useState('');
  const fetchData = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const { results } = await response.json();
      delete results.residents;
      return setResultAPIstarwars(results);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [ResultAPIstarwars]);

  const ResultAPIFiltered = ResultAPIstarwars
    .filter((planet) => planet
      .name.toLowerCase().includes(inputSearchFilter));

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        value={ inputSearchFilter }
        onChange={ (event) => setinputSearchFilter(event.target.value) }
      />
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
            ResultAPIFiltered
              .map((value) => (
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
    </>
  );
}

export default Table;

import React, { useEffect, useState } from 'react';

function Table() {
  const [selected, setselected] = useState({
    column: 'population',
    condition: 'maior que',
    value: 0,
  });
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const [selectedArmazenaOsFilters, setSelectedParaArmazenarOsFiltros] = useState([]);
  const [ResultAPIstarwars, setResultAPIstarwars] = useState([]);
  const [inputSearchFilter, setinputSearchFilter] = useState('');
  // eu apaguei o try cath daqui
  const fetchData = async () => {
    const response = await fetch('https://swapi.dev/api/planets');
    // const response = await fetch('https://swapi.py4e.com/api/planets');
    const { results } = await response.json();
    delete results.residents;
    return setResultAPIstarwars(results);
  };

  useEffect(() => {
    fetchData();
  }, [ResultAPIstarwars]);

  const ResultAPIFiltered = ResultAPIstarwars
    .filter((planet) => planet
      .name.toLowerCase().includes(inputSearchFilter));

  const tratarOpcoes = (opcao) => !selectedArmazenaOsFilters
    .find((filtro) => opcao === filtro.column);

  const DadosTratadosParaOfilterDeColuna = (linha) => {
    const bools = [];
    selectedArmazenaOsFilters.forEach((filter) => {
      switch (filter.condition) {
      case 'maior que':
        bools.push(Number(linha[filter.column]) > Number(filter.value));
        break;
      case 'menor que':
        bools.push(Number(linha[filter.column]) < Number(filter.value));
        break;
      case 'igual a':
        bools.push(linha[filter.column] === filter.value.toUpperCase());
        break;
      default:
        return true;
      }
    });
    return bools.every((el) => el);
  };
  // // const number = '-1';

  const handleOrderClick = () => {
  //   // const newList = [...inputSearchFilter];
  //   // newList.sort((a, b) => {
  //   //   if (a.column > b.column) {
  //   //     return 1;
  //   //   }
  //   //   if (b.column > a.column) {
  //   //     return number;
  //   //   }
  //   // });
  //   // setOrder(newList);
  };

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        value={ inputSearchFilter }
        onChange={ (event) => setinputSearchFilter(event.target.value) }
      />
      <select
        data-testid="column-filter"
        value={ selected.column }
        onChange={ (e) => setselected({ ...selected, column: e.target.value }) }
      >
        {['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']
          .filter(tratarOpcoes)
          .map((column) => (
            <option value={ column } key={ column }>
              {column}
            </option>
          ))}
      </select>
      <select
        data-testid="comparison-filter"
        value={ selected.condition }
        onChange={ (e) => setselected({ ...selected, condition: e.target.value }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        placeholder="digite seu valor"
        name="filterValue"
        value={ selected.value }
        onChange={ (e) => setselected({ ...selected, value: e.target.value }) }

      />
      <button
        type="button"
        data-testid="button-filter"
        className="add"
        onClick={ () => {
          setSelectedParaArmazenarOsFiltros([...selectedArmazenaOsFilters, selected]);
          setselected({
            column: 'population',
            condition: 'maior que',
            value: 0,
          });
        } }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ () => {
          setSelectedParaArmazenarOsFiltros([]);
          setselected({
            column: 'population',
            condition: 'maior que',
            value: 0,
          });
        } }
      >
        Remover Filtro
      </button>
      <br />
      <select
        data-testid="column-sort"
        value={ order.column }
        onChange={ (e) => setOrder({ ...order, column: e.target.value }) }
      >
        {['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']
          .map((NameOfColumn) => (
            <option value={ NameOfColumn } key={ NameOfColumn }>
              {NameOfColumn}
            </option>
          ))}
      </select>
      <input
        type="radio"
        data-testid="column-sort-input-asc"
        value="ASC"
        name="sort"
      />
      ascendente
      <input
        type="radio"
        data-testid="column-sort-input-desc"
        value="DESC"
        name="sort"
      />
      descendente
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleOrderClick }
      >
        Ordenar
      </button>
      {selectedArmazenaOsFilters.map((filter, idx) => (
        <div
          data-testid="filter"
          key={ filter.column }
        >
          <button
            type="button"
            onClick={ () => {
              const ArrayClonadoParaFazerOBotãoFilter = [...selectedArmazenaOsFilters];
              ArrayClonadoParaFazerOBotãoFilter.splice(idx, 1);
              setSelectedParaArmazenarOsFiltros(ArrayClonadoParaFazerOBotãoFilter);
            } }
          >
            x
          </button>
          <span>
            {filter.column}
            {filter.condition}
            {filter.value}
          </span>
        </div>
      ))}
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
              .filter(DadosTratadosParaOfilterDeColuna)
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

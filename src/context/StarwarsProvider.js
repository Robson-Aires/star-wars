import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import StarWarsContext from './StarWarsContext';

function StarwarsProvider({ children }) {
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
  // a ideia de usar o usememo é para evitar multiplas alocações na memória
  const values = useMemo(() => ({
    inputs, setInputs, fetchData,
  }), [inputs]);

  return (
    <StarWarsContext.Provider value={ values }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarwarsProvider.propTypes = {
  children: PropTypes.number.isRequired,
};
export default StarwarsProvider;

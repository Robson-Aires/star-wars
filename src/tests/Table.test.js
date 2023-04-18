import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import App from '../App';
import starwarsMock from './mockdata'
import StarwarsProvider from '../context/StarwarsProvider'

// import Login from '../pages/Login';
// import Renderwith from './renderwith';

const dataTestingemailID = "name-filter"
const dataTestingNumberID = "value-filter"
const dataTestingSelectingID = "column-filter"
const dataTestingSelectingID2 = "comparison-filter"

describe('Testa a página table',() => {
  beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(starwarsMock)
    })
  })

  test('testa se todos os inputs estão na tela.', async () => {
    render(<StarwarsProvider><App /></StarwarsProvider>);
    const input = await screen.findByTestId(dataTestingemailID);
    expect(input).toBeInTheDocument();
    const input2 = await screen.findByTestId(dataTestingNumberID);
    expect(input2).toBeInTheDocument();
    const select =  await screen.findByTestId(dataTestingSelectingID);
    expect(select).toBeInTheDocument();
    const select2 = await screen.findByTestId(dataTestingSelectingID2);
    expect(select2).toBeInTheDocument();
  });

    test('testa se caso eu coloque a letra t é filtrado os nomes corretamente', async () => {
       render(<StarwarsProvider><App /></StarwarsProvider>)
         expect(await screen.findByText('Tatooine')).toBeInTheDocument()
         userEvent.type(await screen.findByTestId('name-filter'), 'ta')
         expect(await screen.findByText('Tatooine')).toBeInTheDocument()
         expect(screen.queryByText('Hoth')).not.toBeInTheDocument()
         expect(screen.queryByText('Dagobah')).not.toBeInTheDocument()
         userEvent.clear(await screen.findByTestId('name-filter'))
         expect(await screen.findByText('Tatooine')).toBeInTheDocument()
         expect(await screen.findByText('Hoth')).toBeInTheDocument()
         expect(await screen.findByText('Dagobah')).toBeInTheDocument()
        })
        test('Selecionar população, operador menor que, valor "20000" e pressionar o botão de filtro "Yavin IV" deve renderizar na tela.', async () => {
          render(<StarwarsProvider><App /></StarwarsProvider>)
          expect(await screen.findByText('Tatooine')).toBeInTheDocument()
          userEvent.type(await screen.findByTestId('value-filter'), '20000')
          expect(await screen.findByText('Tatooine')).toBeInTheDocument()
          userEvent.selectOptions(await screen.findByTestId('comparison-filter'), await screen.findByText('menor que'))
          userEvent.click(await screen.findByTestId('button-filter'))
          expect(await screen.findByText('Yavin IV')).toBeInTheDocument()
        })
        test('Selecionando população, operador igual a, valor "4500000000" e pressione o botão de filtrar e "Naboo" deve  ser renderizado na tela', async () => {
          render(<StarwarsProvider><App /></StarwarsProvider>)
          expect(await screen.findByText('Tatooine')).toBeInTheDocument()
          userEvent.selectOptions(await screen.findByTestId('comparison-filter'), await screen.findByText('igual a'))
          userEvent.type(await screen.findByTestId('value-filter'), '4500000000')
          userEvent.click(await screen.findByTestId('button-filter'))
          expect(await screen.findByText('Naboo')).toBeInTheDocument()
        })
        test('Selecionando população, operador maior que, valor "4500000000" e pressione o botão de filtrar "Coruscant" deve ser renderizado na tela', async () => {
          render(<StarwarsProvider><App /></StarwarsProvider>)
          expect(await screen.findByText('Tatooine')).toBeInTheDocument()
          userEvent.selectOptions(await screen.findByTestId('comparison-filter'), await screen.findByText('maior que'))
          userEvent.type(await screen.findByTestId('value-filter'), '4500000000')
          userEvent.click(await screen.findByTestId('button-filter'))
          expect(await screen.findByText('Coruscant')).toBeInTheDocument()
        })
     })
   
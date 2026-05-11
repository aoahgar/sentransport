import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('filtre les lignes avec le champ de recherche', () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/rechercher une ligne/i), {
    target: { value: 'Pikine' },
  });

  expect(screen.getByText(/1 ligne trouvée/i)).toBeInTheDocument();
  expect(screen.getByText(/Pikine/i)).toBeInTheDocument();
  expect(screen.queryByText(/Ouakam/i)).not.toBeInTheDocument();
});

test('affiche et masque les arrets au clic', () => {
  render(<App />);

  const ligneOuakam = screen.getByText(/Ouakam/i).closest('.ligne-bus');

  fireEvent.click(ligneOuakam);

  expect(screen.getByText(/Ligne 23/i)).toBeInTheDocument();
  expect(screen.getByText(/Ouakam Village/i)).toBeInTheDocument();

  fireEvent.click(ligneOuakam);

  expect(screen.queryByText(/Ouakam Village/i)).not.toBeInTheDocument();
});

test('affiche un message quand aucune ligne ne correspond', () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/rechercher une ligne/i), {
    target: { value: 'Rufisque' },
  });

  expect(screen.getByText(/Aucune ligne trouvée/i)).toBeInTheDocument();
});

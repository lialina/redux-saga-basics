import { useSelector } from 'react-redux';

function App() {
  const store = useSelector(store => store);

  return (
    <div className="App">
      redux-saga tutorial
    </div>
  );
}

export default App;

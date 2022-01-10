import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function App() {
  const store = useSelector(store => store);
  const dispatch = useDispatch();
 
  return (
    <div className="App">
      Redux-Saga Tutorial
      <div>
        <Link to={'/blog'}>
          Go to Blog
        </Link>
      </div>
    </div>
  );
}

export default App;

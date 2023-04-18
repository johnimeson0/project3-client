import { useState } from 'react';

function Searchbar(props) {
  const { searchResults } = props;
  const [query, setQuery] = useState('');

  const handleQuery = (e) => {
    setQuery(e.target.value);
    searchResults(e.target.value);
  };

  return (
    <div>

      <input type="text" name="search" value={query} placeholder='Search Here...'onChange={handleQuery} />
      
    </div>
  );
}

export default Searchbar;
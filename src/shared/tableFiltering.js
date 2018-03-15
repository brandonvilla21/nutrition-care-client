
const filterCaseInsensitive = (filter, row) => {
  const id = filter.pivotId || filter.id;
  if (row[id] !== null){
      return (
          row[id] !== undefined ?
              String(row[id].toString().toLowerCase()).startsWith(filter.value.toLowerCase())
              :
              true
      );
  }
};

export default filterCaseInsensitive;
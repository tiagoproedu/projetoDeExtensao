function transformData(response) {
  const name_domain = response.map(entry => entry.Title).join(',');

  const leaked_data = response.map(entry => convertLeakedData(entry.DataClasses)).join(',');

  return {
    name_domain,
    leaked_data,
  };
}

module.exports = transformData;

function convertLeakedData(dataClasses) {
  const mapping = {
    Names: "Nome",
    "Email addresses": "Email",
    Passwords: "Senha",
  };

  const uniqueClasses = new Set();

  dataClasses.forEach((dataClass) => {
    const mappedClass = mapping[dataClass];
    if (mappedClass) {
      uniqueClasses.add(mappedClass);
    }
  });

  return Array.from(uniqueClasses).join(',');
}




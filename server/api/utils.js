// transformData.js
function transformData(response) {
    return response.map(entry => ({
        name_domain: entry.Title,
        leaked_data: convertLeakedData(entry.DataClasses),
        breach_date: entry.BreachDate
    }));
}

module.exports = transformData;

function convertLeakedData(dataClasses) {
    const mapping = {
        "Names": "Nome",
        "Email addresses": "Email",
        "Passwords": "Senha",
        "Usernames": "Nome de Usuário"
    };

    return dataClasses
        .map(dataClass => mapping[dataClass] || null)
        .filter(dataClass => dataClass !== null);
}

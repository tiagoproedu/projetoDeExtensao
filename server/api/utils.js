// transformData.js
function transformData(response) {
    return response.map(entry => ({
        name_domain: entry.Title,
        leaked_data: entry.DataClasses,
        breach_date: entry.BreachDate
    }));
}

module.exports = transformData;

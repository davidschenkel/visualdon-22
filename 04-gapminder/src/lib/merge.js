// Récupère toutes les années
const annees = Object.keys(populationData[0])
console.log(annees)

let converterSI = (array, variable, variableName) => {

    let convertedVariable = array.map(d => {
        // Trouver le format SI (M, B, k)
        let SI = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? d[variable.toString()].slice(-1) : d[variable.toString()];
        // Extraire la partie numérique
        let number = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? parseFloat(d[variable.toString()].slice(0, -1)) : d[variable.toString()];
        // Selon la valeur SI, multiplier par la puissance
        switch (SI) {
            case 'M': {
                return {
                    "country": d.country,
                    [variableName]: Math.pow(10, 6) * number
                };
                break;
            }
            case 'B': {
                return {
                    "country": d.country,
                    [variableName]: Math.pow(10, 9) * number
                };
                break;
            }
            case 'k': {
                return {
                    "country": d.country,
                    [variableName]: Math.pow(10, 3) * number
                };
                break;
            }
            default: {
                return {
                    "country": d.country,
                    [variableName]: number
                };
                break;
            }
        }
    })
    return convertedVariable;
};


let pop = [],
    income = [],
    life = [],
    dataCombined = [];

// Merge data
const mergeByCountry = (a1, a2, a3) => {
    let data = [];
    a1.map(itm => {
        let newObject = {
            ...a2.find((item) => (item.country === itm.country) && item),
            ...a3.find((item) => (item.country === itm.country) && item),
            ...itm
        }
        data.push(newObject);
    })
    return data;
}

annees.forEach(annee => {
    pop.push({
        "annee": annee,
        "data": converterSI(populationData, annee, "pop")
    })
    income.push({
        "annee": annee,
        "data": converterSI(incomeData, annee, "income")
    })
    life.push({
        "annee": annee,
        "data": converterSI(lifeData, annee, "life")
    })
    const popAnnee = pop.filter(d => d.annee == annee).map(d => d.data)[0];
    const incomeAnnee = income.filter(d => d.annee == annee).map(d => d.data)[0];
    const lifeAnnee = life.filter(d => d.annee == annee).map(d => d.data)[0];
    dataCombined.push({
        "annee": annee,
        "data": mergeByCountry(popAnnee, incomeAnnee, lifeAnnee)
    })
});
console.log(dataCombined)
function arrayTransformed(array) {
    const arrayTransformed = array.map(d => {
        // Trouver le format SI (M, B, k)
        let SI = typeof d["2021"] === 'string' || d["2021"] instanceof String ? d["2021"].slice(-1) : d["2021"];

        // Extraire la partie numérique
        let number = typeof d["2021"] === 'string' || d["2021"] instanceof String ? parseFloat(d["2021"].slice(0, -1)) : d["2021"];

        // Selon la valeur SI, multiplier par la puissance
        switch (SI) {
            case 'M': {
                return {
                    "country": d.country,
                    "2021": Math.pow(10, 6) * number
                };
                break;
            }
            case 'B': {
                return {
                    "country": d.country,
                    "2021": Math.pow(10, 9) * number
                };
                break;
            }
            case 'k': {
                return {
                    "country": d.country,
                    "2021": Math.pow(10, 3) * number
                };
                break;
            }
            default: {
                return {
                    "country": d.country,
                    "2021": number
                };
                break;
            }
        }
    })
    return arrayTransformed
}

export default arrayTransformed
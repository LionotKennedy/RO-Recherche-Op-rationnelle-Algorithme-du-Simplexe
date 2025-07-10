// /**
//  * Utilitaires pour travailler avec les fractions
//  */
// class FractionUtils {
//   /**
//    * Calcule le PGCD (Plus Grand Commun Diviseur) de deux nombres
//    * @param {number} a - Premier nombre
//    * @param {number} b - Deuxième nombre
//    * @returns {number} - PGCD
//    */
//   static gcd(a, b) {
//     a = Math.abs(a);
//     b = Math.abs(b);
//     while (b !== 0) {
//       const temp = b;
//       b = a % b;
//       a = temp;
//     }
//     return a;
//   }

//   /**
//    * Convertit un nombre décimal en fraction simplifiée
//    * @param {number} decimal - Nombre décimal à convertir
//    * @param {number} tolerance - Tolérance pour considérer un nombre comme entier
//    * @returns {Object} - Objet avec numerator, denominator et display
//    */
//   static decimalToFraction(decimal, tolerance = 1e-10) {
//     // Gérer les cas spéciaux
//     if (Math.abs(decimal) < tolerance) {
//       return { numerator: 0, denominator: 1, display: '0' };
//     }
    
//     if (Math.abs(decimal - Math.round(decimal)) < tolerance) {
//       const rounded = Math.round(decimal);
//       return { numerator: rounded, denominator: 1, display: rounded.toString() };
//     }

//     // Déterminer le signe
//     const sign = decimal < 0 ? -1 : 1;
//     decimal = Math.abs(decimal);

//     // Utiliser l'algorithme des fractions continues pour une meilleure précision
//     let numerator = 1;
//     let denominator = 1;
//     let remainder = decimal;
    
//     // Limiter la précision pour éviter les fractions trop complexes
//     const maxDenominator = 1000;
    
//     for (let i = 0; i < 20 && remainder > tolerance; i++) {
//       const wholePart = Math.floor(1 / remainder);
      
//       if (denominator * wholePart > maxDenominator) {
//         break;
//       }
      
//       const tempNumerator = numerator;
//       const tempDenominator = denominator;
      
//       numerator = denominator;
//       denominator = tempNumerator + tempDenominator * wholePart;
      
//       remainder = (1 / remainder) - wholePart;
//     }

//     // Calculer le numérateur final
//     numerator = Math.round(decimal * denominator);
    
//     // Simplifier la fraction
//     const divisor = this.gcd(numerator, denominator);
//     numerator = (numerator / divisor) * sign;
//     denominator = denominator / divisor;

//     // Créer l'affichage
//     let display;
//     if (denominator === 1) {
//       display = numerator.toString();
//     } else if (Math.abs(numerator) > denominator) {
//       const wholePart = Math.floor(Math.abs(numerator) / denominator);
//       const fractionPart = Math.abs(numerator) % denominator;
//       if (fractionPart === 0) {
//         display = (sign * wholePart).toString();
//       } else {
//         display = `${sign * wholePart} ${fractionPart}/${denominator}`;
//       }
//     } else {
//       display = `${numerator}/${denominator}`;
//     }

//     return { numerator, denominator, display };
//   }

//   /**
//    * Formate un nombre pour l'affichage (fraction ou décimal selon le cas)
//    * @param {number} value - Valeur à formater
//    * @param {number} precision - Précision décimale si pas de fraction
//    * @returns {string} - Valeur formatée
//    */
//   static formatNumber(value, precision = 4) {
//     if (typeof value !== 'number' || isNaN(value)) {
//       return value.toString();
//     }

//     const fraction = this.decimalToFraction(value);
    
//     // Si la fraction est plus simple que le décimal, l'utiliser
//     if (fraction.denominator <= 20 && fraction.denominator > 1) {
//       return fraction.display;
//     }
    
//     // Sinon, utiliser le format décimal
//     return parseFloat(value.toFixed(precision)).toString();
//   }

//   /**
//    * Formate un tableau de nombres pour l'affichage avec fractions
//    * @param {Array} tableau - Tableau à formater
//    * @returns {Array} - Tableau formaté
//    */
//   static formatTableau(tableau) {
//     return tableau.map(row => 
//       row.map(val => this.formatNumber(val))
//     );
//   }
// }

// module.exports = FractionUtils;





















































/**
 * Utilitaires pour travailler avec les fractions
 */
class FractionUtils {
  /**
   * Calcule le PGCD (Plus Grand Commun Diviseur) de deux nombres
   */
  static gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  /**
   * Convertit un nombre décimal en fraction simplifiée
   */
  static decimalToFraction(decimal, tolerance = 1e-10) {
    if (Math.abs(decimal) < tolerance) {
      return { numerator: 0, denominator: 1, display: '0' };
    }

    if (Math.abs(decimal - Math.round(decimal)) < tolerance) {
      const rounded = Math.round(decimal);
      return { numerator: rounded, denominator: 1, display: rounded.toString() };
    }

    const sign = decimal < 0 ? -1 : 1;
    decimal = Math.abs(decimal);

    let bestNumerator = 0;
    let bestDenominator = 1;
    let bestError = Math.abs(decimal);

    // Essaye tous les dénominateurs jusqu'à 1000
    for (let denominator = 1; denominator <= 1000; denominator++) {
      const numerator = Math.round(decimal * denominator);
      const error = Math.abs(decimal - numerator / denominator);

      if (error < bestError) {
        bestError = error;
        bestNumerator = numerator;
        bestDenominator = denominator;
      }
    }

    // Simplifie la fraction
    const divisor = this.gcd(bestNumerator, bestDenominator);
    const numerator = (bestNumerator / divisor) * sign;
    const denominator = bestDenominator / divisor;

    return { 
      numerator, 
      denominator, 
      display: denominator === 1 ? numerator.toString() : `${numerator}/${denominator}`
    };
  }

  /**
   * Formate un nombre en fraction (toujours sous forme fractionnaire)
   */
  static formatNumber(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      return value.toString();
    }
    return this.decimalToFraction(value).display;
  }

  /**
   * Formate un tableau de nombres en fractions
   */
  static formatTableau(tableau) {
    return tableau.map(row => 
      row.map(val => typeof val === 'number' ? this.formatNumber(val) : val)
    );
  }
}

module.exports = FractionUtils;
Scenario Outline: Estimation du capital à la retraite
  Étant donné un montant investi de <montant> € et un âge de <age>
  Quand je calcule le capital à 65 ans avec un taux de 4%
  Alors le capital estimé est <capital>

  Examples:
    | montant | age | capital     |
    | 1000    | 40  | 2665.83     |
    | 1350    | 30  | 5093.35     |
    | 1200    | 60  | 1459.38     |


Scenario Outline: Calcul de l’avantage fiscal estimé
Étant donné un montant investi de <montant> €, un âge de <age>
Quand je calcule l’avantage fiscal
Alors le pourcentage de déduction est <pourcentage> %
Et l’avantage fiscal est <résultat>

Examples:
| montant | age | pourcentage | résultat     |
| 1000    | 40  | 30           | 108000       |
| 1200    | 50  | 25           | 54000        |
| 1050    | 30  | 30           | 141750       |

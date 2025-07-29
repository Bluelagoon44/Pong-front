// Fonction utilitaire pour formater une date
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('fr-FR');
}

const formatDate = (date: Date | undefined) => {
  if (!date) return "Sélectionnez une date";
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

export default formatDate;

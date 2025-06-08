
 const formatDate = (date) => {
  const options = { month: 'long' };
  const day = date.getDate();
  const month = date.toLocaleDateString('es-ES', options);
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
};

module.exports = formatDate

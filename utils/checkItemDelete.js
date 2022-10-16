module.exports = (allTours) => {
  const tours = [];
  allTours.forEach((el) => {
    if (el.ItemDelete === false) {
      tours.push(el);
    }
  });

  return tours;
};

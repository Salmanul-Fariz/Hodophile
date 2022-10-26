module.exports = (items) => {
  const tours = [];
  items.forEach((el) => {
    if (el.ItemDelete === false) {
      tours.push(el);
    }
  });
  return tours;
};

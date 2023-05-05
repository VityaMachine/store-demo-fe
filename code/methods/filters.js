export function colorsFilterHandler(arr, color) {
  const modifiedArr = arr.map((el) => {
    const elementColors = [];

    el.availableOptions.forEach((elem) => {
      elementColors.push(elem.optionColorName);
    });

    return {
      ...el,
      colors: elementColors,
    };
  });

  const filteredArr = modifiedArr.filter((el) => el.colors.includes(color));

  return filteredArr;
}

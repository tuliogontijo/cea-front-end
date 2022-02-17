export const validateUsername = (value) => {
  const regexTipsOne = /[@!#$%&_]{1,}/;
  const regexTipsTwoChar = /[a-zA-Z]/;
  const regexTipsTwoNumber = /[0-9]/;
  const regexTipsThree = /\s{1}/;

  return {
    tipsOne: regexTipsOne.test(value),
    tipsTwo: regexTipsTwoChar.test(value) && regexTipsTwoNumber.test(value),
    tipsThree: value.length !== 0 && !regexTipsThree.test(value),
  };
}

export const validatePassword = (passString) => {
  let isValid = true;
  //Contains special chars: !,#,$,+,-
  const formatSpecChar = /[ !#$+-]/;
  //Contains numbers
  const formatNumber = /\d/;

  if (passString.length < 6) {
    isValid = false;
  }

  if (!formatSpecChar.test(passString)) {
    isValid = false;
  }

  if (!formatNumber.test(passString)) {
    isValid = false;
  }

  return isValid;
};

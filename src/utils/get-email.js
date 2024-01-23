export const getEmail = (urlString) => {
  // Use a regular expression to extract the email address
  const emailRegex = /\bemail=([^&]+)/;
  const match = urlString.match(emailRegex);

  // Check if there is a match and get the email address
  const emailAddress = match ? match[1] : null;
  return emailAddress;
};

export const getUserQuery = (urlString) => {
  // Use a regular expression to extract the email address
  const emailRegex = /\buser=([^&]+)/;
  const match = urlString.match(emailRegex);

  // Check if there is a match and get the email address
  const userAddress = match ? match[1] : null;
  return userAddress;
};

export const getPhoneNumber = (urlString) => {
  // Use a regular expression to extract the email address
  const emailRegex = /\bphone=([^&]+)/;
  const match = urlString.match(emailRegex);

  // Check if there is a match and get the email address
  const phoneNumber = match ? match[1] : null;
  return phoneNumber;
};

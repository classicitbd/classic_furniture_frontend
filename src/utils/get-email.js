export const getEmail = (urlString) => {
  // Use a regular expression to extract the email address
  const emailRegex = /\bemail=([^&]+)/;
  const match = urlString.match(emailRegex);

  // Check if there is a match and get the email address
  const emailAddress = match ? match[1] : null;
  return emailAddress;
};

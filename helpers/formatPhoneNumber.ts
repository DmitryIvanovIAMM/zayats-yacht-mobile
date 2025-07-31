export const formatPhoneNumber = (phoneNumber: string): string => {
  const match = phoneNumber.match(/^\+1(\d{3})(\d{3})(\d{4})$/);
  return match ? `+1 (${match[1]}) ${match[2]}-${match[3]}` : phoneNumber;
};

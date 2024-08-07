export function validateForm(checkoutInfo) {
  const newErrors = {};
  if (!checkoutInfo.email) newErrors.email = "Email address is required";
  if (!checkoutInfo.nameOnCard)
    newErrors.nameOnCard = "Name on card is required";
  if (!checkoutInfo.cardNumber)
    newErrors.cardNumber = "Card number is required";
  if (!checkoutInfo.exp) newErrors.exp = "Expiration date is required";
  if (!checkoutInfo.cvc) newErrors.cvc = "CVC is required";
  if (!checkoutInfo.address) newErrors.address = "Address is required";
  if (!checkoutInfo.city) newErrors.city = "City is required";
  if (!checkoutInfo.state) newErrors.state = "State is required";
  if (!checkoutInfo.postal) newErrors.postal = "Postal code is required";

  return newErrors;
}

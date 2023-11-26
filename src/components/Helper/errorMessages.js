// errorMessages.js

export const ERROR_MESSAGES = {
  card_declined: 'Payment declined. Please input valid card details.',
  expired_card: 'Card expired. Please use a card that has not expired.',
  incorrect_cvc: 'Incorrect CVC. The CVC number you provided is incorrect.',
  incorrect_number: 'Incorrect card number. The card number you provided is incorrect.',
  insufficient_funds: 'There are insufficient funds on the card.',
  lost_card: 'The card has been reported as lost. Please use a different card.',
  stolen_card: 'The card has been reported as stolen. Please use a different card.',
  fraudulent: 'This payment has been flagged as potentially fraudulent.',
  payment_intent_authentication_failure: 'Authentication for this payment failed. Please try again with a different card.',
  processing_error: 'There was an error processing your payment. Please try again later.',
  other_payment_error: 'An error occurred while processing your payment. Please try again later.',
  // Add more error messages as needed
};

export function getErrorMessage(errorCode) {
  return ERROR_MESSAGES[errorCode] || 'An error occurred while processing your payment. Please try again later.';
}

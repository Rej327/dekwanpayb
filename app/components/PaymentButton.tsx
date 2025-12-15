import React from 'react'
import { Button } from '@mantine/core'

interface PaymentButtonProps {
  amount: number
  onPayment: () => void
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, onPayment }) => {
  // Intentional unused variable to trigger ESLint error
  const unusedVariable = 'This will cause an error'

  return <Button onClick={onPayment}>Pay ${amount}</Button>
}

export default PaymentButton

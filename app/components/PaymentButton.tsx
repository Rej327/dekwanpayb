import React from 'react'
import { Button } from '@mantine/core'

interface PaymentButtonProps {
  amount: number
  onPayment: () => void
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, onPayment }) => {
  // Intentional unused variable to trigger ESLint error

  // Another any usage to cause error

  return <Button onClick={onPayment}>Pay ${amount}</Button>
}

export default PaymentButton

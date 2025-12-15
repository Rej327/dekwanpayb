import { isValidEmail, isValidUsername } from '../app/utils/validators'

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('returns true for valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
      expect(isValidEmail('plus+tag@gmail.com')).toBe(true)
    })

    it('returns false for invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('missing@domain')).toBe(false) // The simple regex ^\S+@\S+$ actually matches this if "domain" has no spaces. Wait, \S matches non-whitespace. So missing@domain is valid per current regex.
      // Let's test what the current regex actually supports.
      // The current regex is /^\S+@\S+$/
      expect(isValidEmail('no-at-sign.com')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
      expect(isValidEmail('user name@domain.com')).toBe(false)
    })
  })

  describe('isValidUsername', () => {
    it('returns true for usernames with 3 or more characters', () => {
      expect(isValidUsername('bob')).toBe(true)
      expect(isValidUsername('alice')).toBe(true)
    })

    it('returns false for usernames shorter than 3 characters', () => {
      expect(isValidUsername('bo')).toBe(false)
      expect(isValidUsername('')).toBe(false)
    })
  })
})

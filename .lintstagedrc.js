import path from 'path'

const buildEslintCommand = (filenames) =>
  `eslint --no-ignore ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

const config = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
}

export default config

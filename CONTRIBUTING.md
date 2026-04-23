# Contributing to MiniGig

First off, thank you for considering contributing to MiniGig! It's people like you that make it such a great tool for the Celo community.

## Code of Conduct

Help us keep our community healthy and welcoming. Please be respectful and inclusive.

## How Can I Contribute?

### Reporting Bugs

- Use a clear and descriptive title for the issue.
- Describe the exact steps which reproduce the problem in as many details as possible.
- Provide specific examples to demonstrate the steps.

### Pull Requests

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Workflow

1. **Local Setup**: Follow the steps in the README to get the environment running.
2. **Environment Variables**: Ensure you have a `.env` file with the necessary RPC URLs and private keys for deployment.
3. **Smart Contract Testing**: Run `npx hardhat test` before submitting any contract changes.
4. **Build Verification**: Run `npm run build` to ensure the frontend compiles correctly.

## Branching Strategy

- `main`: Production-ready code.
- `develop`: Ongoing development.
- `feature/*`: New features.
- `fix/*`: Bug fixes.
- `docs/*`: Documentation updates.

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript/TypeScript Styleguide

- Use 2 spaces for indentation.
- Use single quotes for strings.
- Use semicolons.
- Favor functional components and hooks for React.
- Ensure all functions have JSDoc comments.
- Use descriptive variable and function names.

### Solidity Styleguide

- Follow the official [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html).
- Use 4 spaces for indentation.
- Ensure all public/external functions have NatSpec comments.
- Use `require` or `revert` with descriptive error messages.
- Prefer `uint256` for gas efficiency unless packing is required.

## License

By contributing to MiniGig, you agree that your contributions will be licensed under its MIT License.

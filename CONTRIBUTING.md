# Contributing to ML Laboratory

ML Laboratory is a landing site for independent, public project repositories. The landing catalog is driven by GitHub repositories owned by `ML-Laboratory-Community` and tagged with the `ml-laboratory-project` topic. Configure `GITHUB_PROJECT_OWNER_TYPE=org` for the community organization, or `GITHUB_PROJECT_OWNER_TYPE=user` for a personal owner.

The catalog revalidates hourly. If GitHub or an individual project README request fails, the site degrades safely instead of allowing the landing page to fail.

## Proposal-to-merge flow

1. **Proposal** — open an issue or discussion describing the problem, research question, intended users, scope, and expected outcome.
2. **Approval** — wait for maintainers to confirm the idea, repository name, ownership, and acceptance criteria before creating a project repository.
3. **Repository** — create or request a dedicated repository under the agreed owner. Add the `ml-laboratory-project` topic and complete the project README template.
4. **Branch or fork** — work on a focused branch in the repository, or fork it when you do not have write access. Keep changes small and reproducible.
5. **Pull request** — open a PR against the default branch with context, validation steps, screenshots or results when relevant, and links to the proposal.
6. **Merge** — maintainers review the PR, confirm checks and documentation, then merge it. The landing site will discover eligible repositories on its next revalidation cycle.

## Project repository requirements

Every project repository should include:

- A clear `README.md` following [`templates/project/README.md`](templates/project/README.md).
- The `ml-laboratory-project` GitHub topic.
- Reproducible setup and run instructions.
- A license and attribution information where applicable.
- Tests or a documented validation procedure appropriate to the project.
- No committed credentials, private data, or generated artifacts that expose sensitive information.

## Secret rules

- **Never commit secrets**: API keys, access tokens, passwords, private keys, cookies, `.env` files with values, or credentials copied into notebooks/logs.
- Use local environment variables and keep real `.env` files ignored by Git. Commit only safe placeholders in `.env.example`.
- Use GitHub Actions secrets for CI. Do not print secrets in CI output.
- If a secret is exposed, revoke or rotate it immediately, then notify maintainers; deleting the line is not sufficient because Git history may retain it.
- Do not request or share credentials in issues, PRs, chat, or documentation.

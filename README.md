# comments-emoji

A Github Action to convert your comment message to emojis.

## Sample Workflow

```yml
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]

jobs:
  comment-emoji:
    runs-on: ubuntu-latest
    name: Emoji Comments
    steps:
      - uses: actions/checkout@v2
      - name: Comment Emoji - action exe
        uses: ./
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

- GITHUB_TOKEN

  The YML workflow will need to set GITHUB_TOKEN with the GitHub Secret Token
  GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

  https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret

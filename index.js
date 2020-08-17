const github = require("@actions/github");
const core = require("@actions/core");
const translate = require("moji-translate");

async function run() {
  const githubToken = core.getInput("GITHUB_TOKEN");
  const octokit = github.getOctokit(githubToken);
  const { eventName, repo } = github.context;

  switch (eventName) {
    case "issue_comment":
      const { data: comment } = await octokit.issues.getComment({ ...repo });
      const body = translate.translate(comment);
      octokit.issues.updateComment({ ...repo, body });
      break;
    case "pull_request_review_comment":
      const { data: comment } = await octokit.pulls.getReviewComment({
        ...repo,
      });
      const body = translate.translate(comment);
      octokit.pulls.updateReviewComment({ ...repo, body });
      break;
    default:
      core.warning(
        'Currently this action is configured for "Issue Comments" and "Pull Request Comments" only.'
      );
      break;
  }
}

run();

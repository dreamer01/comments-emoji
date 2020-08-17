const github = require("@actions/github");
const core = require("@actions/core");
const translate = require("moji-translate");

async function run() {
  const githubToken = core.getInput("GITHUB_TOKEN");
  const octokit = github.getOctokit(githubToken);
  const { eventName, repo } = github.context;
  let body;

  try {
    switch (eventName) {
      case "issue_comment":
        const { data: issueComment } = await octokit.issues.getComment({
          ...repo,
        });
        body = translate.translate(issueComment);
        console.log(body);
        octokit.issues
          .updateComment({ ...repo, body })
          .then(() => core.info("Done !"))
          .catch((error) => core.error(error));
        break;
      case "pull_request_review_comment":
        const { data: prComment } = await octokit.pulls.getReviewComment({
          ...repo,
        });
        body = translate.translate(prComment);
        console.log(body);
        octokit.pulls
          .updateReviewComment({ ...repo, body })
          .then(() => core.info("Done !"))
          .catch((error) => core.error(error));
        break;
      default:
        core.warning(
          'Currently this action is configured for "Issue Comments" and "Pull Request Comments" only.'
        );
        break;
    }
  } catch (error) {
    core.error(error);
  }
}

run();

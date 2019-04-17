workflow "Monorepo PR Repo Labeler" {
  on = "pull_request"
  resolves = ["Label PR Monorepos"]
}

action "Label PR Monorepos" {
  uses = "adamzolyak/monorepo-pr-labeler-action@master"
  secrets = ["GITHUB_TOKEN"]
  env = {
    BASE_DIRS = "packages"
  }
}

workflow "Automatic Rebase" {
  on = "issue_comment"
  resolves = "Rebase"
}

action "Rebase" {
  uses = "docker://cirrusactions/rebase:latest"
  secrets = ["GITHUB_TOKEN"]
}

workflow "on pull request merge, delete the branch" {
  on = "pull_request"
  resolves = ["branch cleanup"]
}

action "branch cleanup" {
  uses = "jessfraz/branch-cleanup-action@master"
  secrets = ["GITHUB_TOKEN"]
}

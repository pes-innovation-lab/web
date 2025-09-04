---
title: 'Git It Done'
date: '2025-07-10'
language: 'en'
tags: ['Blog', 'Git', 'Guide']
author: 'Anirudh Revanur'
draft: false
description: 'A cheatsheet of Git so you can Git stuff done'
---

# Git Stuff Done

This cheatsheet is part of the ongoing **Git Gud** series, where we dive into how Git works and how to use it like a pro.
Here, you’ll find all the essential commands in one place — no fluff, just quick, useful reference to help you **get stuff done** faster and more confidently with Git.

GitHub is where the majority of the action happens, so along with `git`, we'll also be looking into how to use GitHub's official CLI tool in order to manage Pull Requests, Repositories and Issues all from the command line.

## Setup Git

Users who are using Git for the first time will have to setup Git and GitHub CLI.

```bash
# Sets your Git username and email globally (applies to all repositories)
git config --global user.name "John Doe"
git config --global user.email "johndoe@example.com"
```

## Initialization

Creating a new Repository, or cloning an existing repository

```bash
# Initialize a new Git repository using Git
git init

# Clone an existing repository using Git
git clone <repository-url>
```

## Staging and Committing

Work with files you've changed in your repository. This area is unique to `Git` and so you cannot use the GitHub CLI to handle this area.

```bash
# Show files that you changed
git status

# Stage a file for commit
git add [path to file]

# Unstage a file from the commit
git reset [path to file]

# See changes made to the files
git diff

# Commit your changes
git commit -m "Commit message explaining the changes made"
```

## Branches

Branches are important when it comes to working with multiple people on the same repository.

```bash
# List all the branches
git branch

# Create a new branch
git branch <branch-name>

# Switch to the new branch
git switch <branch-name>

# Switch to the previous branch you were on
git switch -

# Recommended Practice: create and switch in one step
git switch -c <branch-name>

# Delete a branch if commits are merged
git branch -d <branch-name>

# Delete a branch forcefully
git branch -D <branch-name>
```

## Comparison

Examine logs, compare branches and commits

```bash
# Show the commit history
git log

# Show commit history, but only the hash and the commit message
git log --oneline

# See the history as a nice little graph
git log --oneline --graph

# See all the changes that have been made in a commit
git show [SHA value]
```

## Update Local Repository

Sync your local repositories with the ones that are present in the remote

```bash
# Add a Remote tracking URL that you will be pushing to
git remote add [alias] [URL]  # The alias is what we use instead of the URL when performing changes

# Fetch all the branches from remote, but do not disrupt current working tree
git fetch [alias]

# Push your current branch to remote (For the first time)
git push -u [alias] <branch-name>

# Subsequent pushes
git push

# Fetch and merge any commits from remote branch
git pull
```

## Change the History

Rewrite the history to make it look cleaner

```bash
# Apply a specific commit onto the current branch
git cherry-pick [SHA]

# Move the HEAD Pointer and reset index, while keeping your working directory unchanged
git reset [SHA]

# Undo all commit entirely from specified hash
git reset --hard [SHA]

# Revert a specific commit by creating a new commit that undoes it (safe for public history)
git revert [SHA]
```

**Note:** When rewriting history, you'll often have to use `git push --force-with-lease`. However, use this with caution as it rewrites public history and can disrupt others when collaborating.

### Rebase

Re-apply commits on top of another base to make the history look linear

```bash
# Rebase the current branch on top of another branch (Example: branchA)
git rebase branchA

# Interactively reorder, edit or squash commits (n is the number of commits to rebase)
git rebase -i HEAD~<n>

# If merge conflicts arise, resolve them in the editor, then continue the rebase
git rebase --continue

# Abort the rebase and go back to how the history was before the rebase
git rebase --abort
```

Squashing commits is a process of combining multiple commits into a single commit to maintain cleaner history, but it is useful only if the commits being squashed are of the same change.
To squash commits, you have to start an interactive rebase first

```bash
# Example Scenario

git rebase -i HEAD~3

# Editor opens like this:
pick abc123 Initial Commit
pick def456 Feature Added
pick ghi789 Bug fixed
```

In order to squash the commits into a single commit that can be seen on GitHub, change the commit messages to

```bash
pick abc123 Initial Commit
squash def456 Feature Added
squash ghi789 Bug fixed
```

After a rebase has been done, make sure to push your changes with `git push --force-with-lease`

### Reflog

Reflog is an ordered list of the commits that HEAD has pointed to. So in any case if you were to overwrite your commit with rebase or reset, reflog has your back and can recover from it.

```bash
# Show the log of all commits
git reflog

# Restore a commit or branch from the reflog
git checkout [SHA]

# If you want to make it a branch instead
git checkout -b <branch-name> [SHA]
```

## Temporary Stores

If you want to temporarily store your current changes

```bash
# Save modified and staged changes (Useful if you wanna switch branches)
git stash

# List all the changes in the stash
git stash list

# Apply the changes from the stash
git stash apply

# Delete the top of the stash
git stash drop
```

## Commonly Confused Terms

| Terms               | Quick Explanation                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| `commit` vs `push`  | `commit` saves changes locally, `push` uploads it to the remote                                    |
| `pull` vs `fetch`   | `fetch` downloads changes, `pull` fetches the changes and merges                                   |
| `reset` vs `revert` | `reset` changes the history itself, while `revert` adds a new commit that undoes a previous commit |
| `merge` vs `rebase` | `merge` preserves full history, `rebase` linearizes history                                        |

If you feel like you don't know what to do, break the problem down into simpler concepts to see if you can use any of these commands to solve the issue. Most of your problems will be solved with these simple Git commands.

## GitHub Integration

The GitHub CLI allows you to use GitHub's features from the terminal. This makes it faster to manage your repositories, issues and pull requests all from the terminal.

### Repository Management

```bash
# View details about the current repository
gh repo view

# Create a new repository in interactive mode
gh repo create

# Clone a GitHub repository
gh repo clone <OWNER>/<REPO>

# Fork and clone a repository
gh repo fork <OWNER>/<REPO> --clone
```

### Pull Requests

```bash
# Create a new Pull Request from a current branch
gh pr create

# List all open Pull Requests
gh pr list

# List all the Pull Requests that a specific user has opened
gh pr list -A "AuthorName"

# View the details of a specific Pull Request
gh pr view <PR-Number>

# Merge a Pull Request
gh pr merge <PR-Number>
```

**Quick Tip:** `gh pr create` will create a PR in interactive mode, so you will be asked questions. If you do not want this to happen, then you can use flags like `--title`, `--body` and `--base` while creating a Pull Request.

## Putting it All Together

Now let's see how an ideal workflow will exist from start to end

```bash
# Clone a repository
gh repo clone user/name

# Create a new branch
git switch -c feature-branch

# Make changes
git add .
git commit -m "feat: Added feature that allows the user to do something new"

# Push the branch to GitHub
git push -u origin feature-branch

# Create a Pull Request
gh pr create --base main --title "Added feature" --body "This PR adds this particular feature"
```

## Good Git Practices

### Avoid Long Running Branches

It's good practice to open a branch when needed to make a feature, then delete the branch once the PR is merged. If a branch is alive for too long, then it will increase the number of conflicts and make PRs much harder to review.
If in case you need to keep a branch alive for a long time, then make sure that you rebase the branch frequently.

```bash
git fetch origin
git rebase origin/main
```

### Delete Branches after Merge

Old feature branches clutter the repository and can confuse everyone. It's preferable to delete the local and the remote branch after the PR is merged.

```bash
# Delete the local branch
git branch -d <branch-name>

# Delete remote branch
git push origin --delete <branch-name>
```

### Use Conventional Commit Messages

Conventional Commits allow all the users and developers to see what each commit does. [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) show how you can write neat commit messages to show your changes in a simple line.

```bash
git commit -m "feat: Added a feature to read this website in Spanish"
git commit -m "chore: Dropped support for old versions of Node and Python"
```

Above are some examples of conventional commits

### Rebase Frequently

Always pull before you push, and use the rebase flag to avoid merge conflicts and to keep linear history

```bash
git pull --rebase
```

### Draft Pull Requests

Use draft pull requests to get early feedback on your changes and to keep chain of custody on your work. Draft pull requests cannot be merged into main accidentally.

```bash
gh pr create --draft
```

---
title: 'Git Gud'
date: '2025-06-30'
language: 'en'
tags: ['Blog', 'Git', 'Guide']
author: 'Anirudh Revanur'
draft: true
description: 'A deep dive into how Git works'
---

# How to Git Gud (A Beginner's Guide to Git)

## Version Control: Keeping Track of History

Before we dive head-first into Git and how to use it, let's take a moment to understand _why_ it's used in the first place.

**Version Control** is a system that allows users to track changes to files over time. It enables you to revisit any version of a file, compare changes, and revert mistakes with ease.

Keeping a history of file changes is incredibly useful—errors can be undone, and accidental additions or deletions can be reversed with minimal hassle.

### Types of Version Control Systems

There are three main types of version control systems:

- **Local Version Control**
  This is the simplest form, often built into operating systems or specific applications. It keeps track of changes made to files on a single machine.

- **Centralized Version Control (CVC)**
  In this model, there's a central server that holds the versioned files. Developers pull from and push changes to this central repository. This became popular when teams began collaborating on shared codebases.

- **Distributed Version Control (DVC)**
  Every developer has a full copy (clone) of the entire repository, including its history. This allows for offline work, local commits, and removes the single point of failure that centralized systems suffer from. Git is a prime example of a distributed version control system.

## What Is Git?

Okay, now that we’ve introduced Git as a Distributed Version Control System, let’s talk about it for a hot minute.

Git is used to handle everything from small projects to massive enterprise-level codebases. It allows for all interactions to be done with utmost speed and precision.

Git was originally created in 2005 by **Linus Torvalds** (the creator of Linux). It was built out of pure necessity—to ensure control and integrity while managing the large, open-source Linux kernel.

Originally made to manage Linux, Git has since grown into the most widely used version control system in the world.

### Okay, but _why_ Git?

We've spoken about what Git is and what it does, but we haven't spoken about _why_ we use it. Here's what makes Git so special:

- **Distributed Design**
  Every single developer has a _full_ copy of the entire project history. This means you can work even when you're offline, and push changes when you're back online.

- **Snapshots vs. Differences**
  Other version control systems think about files as a series of differences (or _deltas_). They keep track of the changes made and build the version history as a list of deltas.

  Git uses something called _snapshots_—a picture (figuratively) of all your files at a given moment. If a file hasn't changed, Git doesn't take a new snapshot of it. Instead, it links to the previous, unchanged version.

  So instead of thinking in terms of deltas, Git thinks in terms of a stream of snapshots.

- **Integrity**
  Git watches everything 👀. It makes sure nothing slips by using cryptographically secure hashing algorithms.

  Specifically, Git uses **SHA-1** as an integrity check. Everything is stored in Git’s database not by filename, but by its SHA-1 digest.

  You’ll see hashes like `b9c4c1cae1bcec5f1cd4a38f6cdac929e132465d` throughout this guide—but don’t worry. Git is smart enough to let you use just the first few characters most of the time. (More on that later.)

---

## Three Stages of Git

This is by far one of the most important concepts in Git—and what really sets it apart from other version control systems.

Git has **three main states** that your files can be in:

- `modified/untracked` – You've changed the file, but it hasn’t been staged for commit yet.
- `staged` – You’ve marked the modified file as ready to be committed.
- `committed` – The change is safely stored in Git’s local database.

A basic Git workflow looks like this:

1. You **modify** files in your local working directory.
2. You **stage** the changes that you want to include in your next commit.
3. You **commit** the staged changes, permanently storing a snapshot in your local Git database.

> Understanding these three stages is crucial to mastering Git. Once you get this flow down, the rest starts to click.

---

## Getting Hands-On

Time to get our hands messy with Git! First step is to install Git on your local machine.

### Unix users

```shell
sudo apt-get install git # Debian Users

sudo dnf install git # Fedora

sudo pacman -S git # Arch
```

### macOS users

```shell
xcode-select --install # Xcode Command Line Tools include Git

brew install git # If you want to use Homebrew
```

### Windows users

Visit the official website where you can get the standalone installers for Windows. Click here to go to the website [Download for Windows](https://git-scm.com/downloads/win)

Congratulations! You now have Git installed and are now one step closer to getting good at Git!

---

## First-Time Git Setup

Before we go ahead and start creating Git repositories and saving changes, we need to configure git first. All of the following steps have to be run only once on any given machine.

Git gives you a simple tool called as `git config`, which lets you get started and sets configuration variables that controls **everything** about how Git operates

In order to view your existing configuration, run the following command:

```shell
git config --list
```

This will list out all of your git settings. But wait, something is missing. Git doesn't know who you are yet. We have to give this information so that Git will be able to tell which user has pushed which changes and when.

To set your username and email address, run the following commands. Make sure to get them right as these values will be the ones to be used in **every** commit that you make.

```shell
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

You will have to run these commands only once since you are using the `--global` flag, and Git will use these values in order to make all the commits.

Now when you check your settings by running `git config --list`, you should be seeing your username and email ID as well.

---

## Initializing a Git Repository

Having Git installed on your machine is just the beginning. You need to use Git in your existing projects and directories.

There are two ways you can obtain a Git repository

1. Convert an existing directory into a Git repository.
2. You can `clone` an existing Git repository from somewhere else to your local machine.

In this exercise, we'll go through both of these and see what we'll use where.

### Initialize a Git Repository

So let's make a small project and we'll use Git in order to have version control on that. The project can be anything, and for this example, we'll just change a text file here and there.

```shell
mkdir ~/Programs/my_project
cd ~/Programs/my_project

git init # This initializes an empty git repository
```

Now in this directory, we see a new subdirectory called `.git`. This subdirectory is what allows Git to keep track of everything. We won't go into the internals of this directory.

Make a new file and name it whatever you want it to be

```shell
touch first.txt
echo "Hello There!" > first.txt
```

The file `first.txt` is now in the "Modified/Untracked" stage of the Git Cycle. In order to move it to staged, we run the following command:

```shell
git add first.txt # This adds only the file that has been modified/untracked into staging
git add . # This adds all the files into staging (DO NOT FORGET THE '.')
```

Now we are in the second phase of the Git Cycle. In order to move these files into the local database we have, we have to "commit" the changes

```shell
git commit -m "Initial Project"
```

This moves all of the files that are in staging into the committed section, meaning that version of the file is now saved and cannot be removed.
This file is now safely committed and versioned.

### Clone an existing repository

Let's say that you and your friend are working on a project, and they have already hosted their files on a server. We can get **all** of those changes locally along with the entire history by _cloning_ the repository locally.

```shell
git clone https://github.com/AnirudhRevanur/rsa-tool # Clone the repository locally and use the default directory name

git clone https://github.com/AnirudhRevanur/rsa-tool my-rsa-tool # Clone the repository, but name it something else
```

There we go! We have now learnt how to use git to initialize a repository and how to clone a repository that is hosted on a server

---

## File Status in Git

We’ve talked about the **Three Stages** of files in Git—`modified`, `staged`, and `committed`—but how do you _actually_ know what stage a file is in?

`git status` is the tool that allows you to see what stage your files are present in. By default all the files are in "Untracked" mode. When a file is untracked, it means that the file is in the repository, but Git does not follow along with it and is not included in snapshots.
This command is liek Git's internal report card. It tells you _exactly_ which files are:

- Being Tracked
- Not tracked
- Staged for Commit
- Modified, but not staged

### Untracked Files

By default in a Git repository, all the new files are **untracked**. This means that Git knows the file exists, but isn't keeping snapshots of it... Yet.
Let's look at how a freshly cloned repository status looks like:

```shell
$ git status
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

This means that everything is up to date. All of the files that are being tracked by git are **not** modified, and you have not added any new files.
Now let's add a file:

```shell
touch README.md
```

Run `git status` again:

```shell
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	README.md

nothing added to commit but untracked files present (use "git add" to track)
```

### Tracking Files

To tell Git when and which files to track, we use the `git add` command

```shell
git add README.md    # Adds only the one file that you have mentioned
git add docs/        # Includes the directory and all of the files that are instide the directory as well.
git add .            # Adds all the changes in the directory (Use with caution)
```

Now when you run `git status`, you should be getting an output that looks something along these lines:

```shell
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   README.md
```

### Modifying Tracked Files

Now we know how to add new files to tracking, but what about existing files? What about those? Let's make a small change in our Rust code in our `src/` directory:

```shell
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   README.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/algorithms/math.rs
```

Now Git sees that you have:

- Added a `README.md` file and staged it
- Modified `src/algorithms/math.rs`, but have not staged it yet

To include the modified file in your next commit:

```shell
$ git add src/algorithms/math.rs

$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   README.md
	modified:   src/algorithms/math.rs
```

Perfect. Both files are now staged and ready to be committed, but wait I think there are some environment variables.

### OOPS! I Didn't Mean to Add That...

You saw the environment variables file and decided that you should share that as well, now what?

```shell
$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   .env
```

Don't feel to bad about yourself. Git has your back. You can _unstage_ the file before it gets committed by running:

```shell
$ git restore --staged .env

$ git status
On branch main
Your branch is up to date with 'origin/main'.

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	.env

nothing added to commit but untracked files present (use "git add" to track)
```

Crisis averted. We have now removed the .env file from the tracking status. But wait, there has to be a better way to do this.

### Gitignore

Many times, the project we work on will create a compiled output, or we have some secrets that are stored in a secrets file.
In order to make sure that no developer ever accidentally commits the compiled output or secrets, Git has a special file called as `gitignore`, and all the files that are present in this file will be ignored by git.

Gitignore follows a simple regex-based matching for all the files in that current directory.
Here's an example of a simple `.gitignore`.

```shell
$ cat .gitignore

# All lines starting with a # will be ignored

# Ignore all the files that have an extension .a
*.a

# Override the above rule for this one file
!file.a

# Ignore the all the files in directory called build
build/
```

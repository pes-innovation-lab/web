---
title: 'Digital Forensic Investigation and Tools'
date: '2024-12-29'
language: 'en'
tags: ['Blog', 'Forensics', 'DFIR']
author: 'Anirudh Revanur'
draft: false
description: "Let's become a Forensic Investigator"
---

Digital Forensics is a branch of forensic science that deals with the investigation of cybercrimes, but it can also be used to capture evidence available on any digital device at any kind of crime scene.

In this series, we will be going through the **basics of Forensic Investigation**, dive into some common tools that we will be using and how to use those tools. For the sake of this series, I have made a custom **Linux Virtual Machine** specifically designed for performing basic forensic investigations.

# Steps in Forensic Investigation

Before we get our hands messy with some cases, we first have to look at the five major steps of Forensic Investigation

1. **Acquisition:**
   The process of securing and duplicating data from a crime scene without altering the original evidence

2. **Validation:**
   Ensuring the integrity and authenticity of the acquired data by verifying against the original source.

3. **Extraction:**
   Retrieveing of meaningful information from the data like files, logs and hidden data fragments

4. **Reconstruction:**
   Rebuilding events from the extracted data to create a clear picture of what happened

5. **Reporting:**
   Documenting findings in a comprehensive manner so that it can be presented and understood in court.

Each of these steps are important in making sure that all of the evidence is safe and secure, and we have neat documentation of what is happening and what has happened.

# Role of Tools

In Digital Forensics, tools play a very important role. They help us take the raw data we have and convert them into usable and presentable information. Some tasks can be done manually but are extremely time consuming. To tackle this, forensic tools offer many advantages

<br />
## Why use Tools?

1. **Efficiency** - Manually examining and processing large amounts of information
   can be very time consuming and prone to oversight - Tools can perform these repetitive tasks and simplify
   complex tasks that reduce the time needed for analysis

2. **Precision and Accuracy**

- Tools are designed to follow standard patterns and practices, ensuring a high level of accuracy
- They can be used to detect and recover data that may have been overlooked such as broken partitions or hidden files

3. **Integrity**

- Just like physical evidence, digital evidence can also be tampered with. To prevent this, tools ensure a "write-block" policy that will not allow modifications on the original evidence
- Tools also include hashing mechanisms to verify the integrity of the data.

4. **Consistency**

- Tools can be used to get the same outputs and results over and over again.

## Types of Tools

Forensic Tools are categorized based on what they do and what purpose they serve

- **Acquisition Tools:** Used to create exact copies of data while preserving the integrity
- **Analysis Tools:** Extract, Visualise and Interpret data like file systems and time stamps
- **Memory Forensics:** Analyze the contents of Volatile Memory to see if there are anything in the current running processes
- **Network Forensics:** Tools used to monitor and analyze the network traffic.

Selecting the right tool for the job is a key skill for forensic investigators, as using the wrong tool can not give us the required outputs.
We shall go more into these specific tools when we reach those topics.

# Acquisition

The first step of Forensic Investigation, Acquisition. It's involves:

- Securing the scene: Ensuring that the data remains untouched during the acquisition
- Creating duplicates: Using forensic tools to create an exact duplicate of the original data, bit-by-bit

Acquisition is important, because any alteration can lead to major changes in the evidence and render the investigation useless

## Common Tools for Acquisition

### dd

dd is a low-level command line utility that is available on all UNIX-like machines that allows us for copying and conversion of data from one location to another.
This tool allows us to directly write files from the hardware/device drives because UNIX treats all the storage devices as files.
When working with storage devices or RAM in UNIX, it's like working with a _special_ file. We can use this to our advantage to make bit-by-bit copies of storage media

Here's the basic syntax of `dd`

```shell

dd if=<input_file> of=<output_file> [options]

```

- **`if`** is the storage device that we will be making an image of
- **`of`** is the output file where we will be writing the forensic image to
  Output files are usually of type **`.img`** or **`.dd`** formats

#### Creating a Forensic Image

A Forensic Image is a bit-by-bit vopy of the source media that includes everything like files, file systems and unallocated space.

**WARNING: Make sure that you double check the device that you are reading from and writing to. There is no GUI and no confirmation message for any of this, so it is possible that you overwrite you existing Operating System. If you are not sure, then _do not_ run these commands. I am not responsible for your data loss**

<br />
<br />
<br />
##### **Forensic Image of a Flash Drive** 

**Step 1:** First we have to identify the device we will be
making a forensic image of. This can be done with tools like **`lsblk`** and **`fdisk`** for Linux users.
First note down all of the disks you see after running these commands. Plug in the Flash Drive, then
run these commands again. The new disk that appears is the Flash drive that we will be making a forensic
image of. It will be labeled as **`/dev/sda`** or **`dev/sdb`**

**Step 2:** Use **`dd`** to make the forensic image of the device and store it in a file. Run the following command:

```shell

sudo dd if=dev/sda of=/forensic_image.dd bs=64K conv=noerror,sync status=progress

```

- **`sudo`**: We have to run this command with superuser privileges because normal users do not have access to hardware devices
- **`if=/dev/sda`**: We are assuming that the Flash drive we have inputted is at `/dev/sda`
- **`of=forensic_image.dd`**: Telling where the image file has to be saved
- **`bs=64K`**: This sets the block size to 64 Kilobytes. It can be used to optimize the transfer speed
- **`conv=noerror,sync`**: This option tells `dd` to continue even if there are errors and to make sure that the input blocks are synchronized with the output, preventing data loss or corruption
- **`status=progress`**: Displays the progress of the operation

**Step 3:** Once the process is complete, it's important to verify the integrity of the forensic image. This can be done by comparing the has values of the source device and the forensic image. UNIX can calculate the hash value of any file from the command line itself

```shell

sha256sum /dev/sda #This is the hash value of the source device
sha256sum forensic_image.dd #This is the hash value of the forensic image created

```

<br />
<br />
<br />
##### **Make a Forensic Image of a Partition**

There are some scenarios where the entire drive need not copied, and one partition is enough. **`dd`** can also be used in such cases, we just have to change the input file that we are using.

UNIX treats all device drivers and hardware as files and we can use this to our advantage. Files like **`dev/sda`** is the entire disk itself, but the file **`dev/sda1`** is a partition of the disk. In order to create a forensic image of this partition, we can do this

```shell

sudo dd if=/dev/sda1 of=forensic_image.dd bs=64K status=progress

```

#### Best Practices

- Always make sure that you know what file corresponds to what what drive, as we do not want to accidentally wipe the evidence or our own data
- Always verify the image with the help of **`sha256sum`** or **`md5sum`**
- Create multiple copies of the image
- write-block the device that is being copied

### Guymager

Guymager is a lightweight open source forensic imaging tool that's available only in for Debian and Arch distributions. It provides a GUI for the users who are not very confident or comfortable in using command line tools.

#### Installation

1. **Debian Distros:**

```shell

sudo apt update
sudo apt install guymager

```

2. **Arch Distros:**

```shell

git clone https://aur.archlinux.org/guymager.git
cd guymager/
makepkg -si

```

Make sure to launch Guymager with superuser privileges, because it has to access the disk drives.

#### Creating a Forensic Image

**Step 1:** Connect the target device and note down it's Linux device path. We do not want to accidentally clone our own disk or perform any changes to our own disk, so make sure that you know prior which disk is yours

_Tip: If you are not sure what disk is what, then open **`guymager`** first without connecting the device, make a note of all available disks, then connect the USB drive_

**Step 2: Start the Imaging Process**

1. In the **`Guymager`** interface, click on the device that has to be imaged

![Idle Guymager](/static/images/Forensic-1/idle.png)

In this case, **`/dev/nvme0n1`** is the name of my local SSD and **`dev/sda`** is the USB drive that I have to make an image of

2. Right click on the device and choose **`Acquire Image`**
   ![Acquire UI](/static/images/Forensic-1/AcquireUI.png)

This is the UI that will pop up after clicking on **`Acquire Image`**

3. Configure the image settings

   - Choose what file extension the image has to be in
   - Choose where the image has to be stored
   - Select and verify the validity of the image with the hash algorithms **`MD5`**, **`SHA-1`** and **`SHA-256`**

4. Click **`Start`** to begin the imaging process - A progress bar will appear at the disk to show how much has been done
   ![Progress Bar](/static/images/Forensic-1/progress.png)

**Step 3: Verify the Image**
Once the imaging process is complete, you can tell **`Guymager`** to verify the image or you can just have it calculate the hash values.

If **`Guymager`** is the one verifying the image, then it will take twice as long as normal, but if you prefer to do it manually, then you can use command line utilities like **`md5sum`** or **`sha256sum`** to verify the image's hash

# Wrapping It Up

Digital Forensic Investigations are a critical part of solving cybercrimes and uncovering evidence from digital devices in a crime scene. In this post, we spoke about the **five major steps** of forensic analysis, focused on the importance of tools and the different kinds of tools.
Understanding these tools is the first step to becoming a skilled investigator. As we've seen, it lets us handle complex tasks very easily.

In this session we've also seen about the **Acquisition** techniques and tools to acquire the forensic images of disks using tools like **`dd`** and **`Guymager`**. There are many more tools out there, and I encourage you to keep digging and finding more tools because investigators cannot be confined to only one or two tools.

In the next part of this series, we will see how to **Extract** information and store it in a useful manner.

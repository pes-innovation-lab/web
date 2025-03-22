import json, csv
from sys import argv

d = {
    "Year Interning/Interned": {
        "replace": "batch"
    },
    "Full Name": {
        "replace": "name"
    },
    "Year of Graduation": {
        "replace": "grad_batch"
    },
    "Branch of Study": {
        "replace": "branch"
    },
    "E-mail": {
        "replace": "email"
    },
    "LinkedIn Profile (URL)": {
        "replace": "linkedin"
    },
    "GitHub Profile (URL)": {
        "replace": "github"
    },
    "Picture for the website": {
        "replace": "picture_url"
    }
}

year = "2023"
picture_url_base = f"https://site-images.pages.dev/images/members/{year}/"

with open(argv[1], "r") as f:
    reader = csv.DictReader(f, fieldnames=f.readline().strip().split(","))
    
    arr = []
    for i in reader:
        inter = {}
        for k in d.keys():
            inter[d[k]["replace"]] = i[k]

        inter["picture_url"] = picture_url_base + inter["name"].split(" ")[0] + ".jpg"

        arr.append(inter)

    print(json.dumps(arr))


"""
"batch": "",
"name": "",
"grad_batch": "",
"branch": "",
"linkedin": "",
"email": "",
"github": "",
"picture_url": ""

FORM : 
"Timestamp": "",
"Email Address": "",
"Year Interning/Interned": "",
"Full Name": "",
"Year of Graduation": "",
"Branch of Study": "",
"LinkedIn Profile (URL)": "",
"E-mail": "",
"GitHub Profile (URL)": "",
"Picture for the website": ""
"""
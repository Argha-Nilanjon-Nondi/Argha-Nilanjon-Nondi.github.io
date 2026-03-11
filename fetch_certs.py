import urllib.request
import re
import json

urls = [
    "https://coursera.org/share/4b5e7255d4efeb0774ae352ededac567",
    "https://coursera.org/share/3a4472f97323e3aa3d2c54a096f5f064",
    "https://coursera.org/share/e7bce66fba9dc261df6f69837be3416c",
    "https://coursera.org/share/f5e96c2f98adbc47803a2ef41b77da8c",
    "https://coursera.org/share/d0ff5f3c13ca75f70b5fd1374b632ef4",
    "https://www.futurelearn.com/certificates/7nhg43c",
    "https://www.futurelearn.com/certificates/5tlil0i",
    "https://www.datacamp.com/completed/statement-of-accomplishment/course/2f1c65c53da1e83634194c37301e7cb3cc307e2b",
    "https://credentials.edx.org/records/programs/shared/455d1215d231411593c7b26eaae7e353",
    "https://courses.cognitiveclass.ai/certificates/adc1716930de42e2b7058ee8632cdc41",
    "https://courses.cognitiveclass.ai/certificates/f29a2a2c3364439a9304be3d48fcf1a4",
    "https://courses.cognitiveclass.ai/certificates/5db9b2a8a953449ea72cadaa7af1b7f8",
    "https://courses.cognitiveclass.ai/certificates/bf1892f5b142461d9e6d2a8e471fd967"
]

results = []
for url in urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
        title = title_match.group(1) if title_match else ""
        
        # Try finding og:image
        meta_img_match = re.search(r'<meta.*?property="og:image".*?content="(.*?)".*?>', html, re.IGNORECASE)
        if not meta_img_match:
            meta_img_match = re.search(r'<meta.*?content="(.*?)".*?property="og:image".*?>', html, re.IGNORECASE)
            
        img = meta_img_match.group(1) if meta_img_match else ""
        results.append({"url": url, "title": title.strip(), "image": img})
    except Exception as e:
        results.append({"url": url, "error": str(e)})

print(json.dumps(results, indent=2))

#!/usr/local/bin/python

##
# This script crawls the archive directory peeking in each post to see if an article 
# has been updated (It knows from the "status: modified" attribute in the .md file).
# If the file has been modified, it regenerates the metadata.json with the new edits. 
##
# TODO:
##

##
# Article JSON Format:
# 	- slug
# 	- title
# 	- published
# 	- edited
# 	- type
#	- tags
#	- author
#	- status
#	- pubdate
#	- content
# 	- location
#	- link
# 	- article-number 
##

import glob
import json
import markdown
import sys
import os
import shutil	
from email import utils
import datetime
import time
import uuid
import fileinput

webroot = "http://brianschrader.com/"
userroot = "/Users/ifoundit/Dropbox/Sites/BrianSchrader.com/"

# Parsing blog post markdown files.	
def ParseArticleAtPath(path):
	file = open(path, 'r')
	contents = file.read()
	file.close()
	arrContents = contents.splitlines()
	tags = ["title:", "slug:", "published:", "edited:", "type:", "tags:", "author:", "status:"]
	metadata = {}
	linesToRemove = []
	for line in arrContents:
		for tag in tags:
			if tag in line:
				# Tag was found. 
				if "status:" in tag and "edited" not in line:
					# Do nothing. 
					return
				# Normalize tag name, and strip fluff from line.
				metadata[tag.lower()[:-1]] = line[len(tag):].strip()
				# Remember to remove line from arrContents.
				linesToRemove.append(line)
			else:
				# Tag not found. Do nothing
				continue
	# Remove lines from earlier
	for line in linesToRemove:
		arrContents.remove(line)
	# Open the Markdown file and change the line to published!
	for line in fileinput.input(path, inplace=True): 
		if "status:" in line:
	 		print line.replace(line, "status: published")
	 	else:
	 		print line
 	# Put the file back together missing the tags.
	contents = os.linesep.join(arrContents)
	html = markdown.markdown(contents)
	metadata["content"] = html
	timeStr = utils.formatdate(time.mktime(datetime.datetime.now().timetuple()))
	metadata["edited"] = timeStr[:17]	
	# Archive the old JSON. 
	json_path = path[:path.rfind("/")]
	shutil.copyfile(json_path + "/metadata.json", json_path + "/metadata-"+ timeStr[12:25].replace(":","-").replace(" ","-") +".json")
	# Dump the new JSON.
	json_str = json.dumps(metadata, separators=(',',':'))
	if os.path.exists(json_path + "/metadata.json"):
		os.remove(json_path + "/metadata.json")
	json_file = open(json_path + "/metadata.json", "w")
	json_file.write(json_str)
	json_file.close()
	
if __name__ == "__main__":
	drafts = glob.glob(userroot + "archive/*/*.md")
	for draft in drafts:
		ParseArticleAtPath(draft)
	

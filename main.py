#--------------------------------------------------------------------------------
# Made with Love By Ali Frh (and Possibly future contributors)					#
#																		        #
# License: MIT																	#
# (Do what ever you want at YOUR RISK, we dont take ANY responsibility at all)	#
#--------------------------------------------------------------------------------
VERSION = "1.1"


import markdown
from dotenv import load_dotenv
from os import getenv,listdir,system
import itertools
from time import sleep
import re
from sys import argv
from datetime import datetime
from Plugins.jtime import gregorian_to_jalali,jweek,jmonth,hc
from Plugins.imgutils import get_size

load_dotenv('config.env')

Show_As_Jalali = bool(getenv("Show_As_Jalali"))
# print(Show_As_Jalali,type(Show_As_Jalali))

# Basic Data
dist_path = "dist"
template = f'Templates/{getenv("Theme")}/'
comments_enabled = bool(getenv('Comments_Enabled'))
baseurl = getenv('BaseUrl')
blogname = getenv('Blog_Name')
posts_sorted = {}
posts_chunked = []
categories_list = {}
posts_asc = {}
posts_by_category = {}
chunked_cats = {}

posts_in_home = int(getenv('Posts_in_Home'))

# Special Modes
quiet = False
fastprint = False


class bcolors:
    head = '\033[95m'
    blue = '\033[94m'
    cyan = '\033[96m'
    green = '\033[92m'
    yellow = '\033[93m'
    fail = '\033[91m'
    ENDC = '\033[0m'
    bold = '\033[1m'
    underline = '\033[4m'

def sprint(text,color='',carrage=True,slp=0.25):  #aka Sexy Print
	if quiet == True:
		return		
	remain = abs(70 - len(text))
	if text[-1] == "\n":
		text = text[:-1] + " "*remain + "\n"
	else:
		text = text + " "*remain
	if carrage == True:
		carrage = '\r'
	else:
		carrage = ''

	if color != '':
		print ( f'{carrage}{color}{text}{bcolors.ENDC}', end="" )
	else:	
		print ( f'{carrage}{text}', end="" )
	if fastprint == False:
		sleep(slp)


def fetch(f):
	z = open(f,'r')
	f = z.read()
	z.close()
	return f

def put(place,data):
	z = open(place,'w')
	z.write(data)
	z.close()
	return 1

def split_dict(d, n):
    keys = list(d.keys())
    for i in range(0, len(keys), n):
        yield {k: d[k] for k in keys[i: i + n]}

#--------------------------------Description----------------------------------
# This function analyze posts and categories, then add them in supposed dicts#
#-----------------------------------------------------------------------------
def analPosts():
	sprint('Analyzing Posts and Categories ...',color=bcolors.bold)
	global categories_list,posts_by_category
	z = fetch('categories.txt').split('\n')
	for i in z:
		categories_list[i.split(':')[0]] = i.split(':')[1]
		posts_by_category[i.split(':')[0]] = {}

	global posts_asc,posts_sorted,posts_chunked
	di =  sorted(listdir('Posts'))
	di.remove('uploads')
	for i in di:
		posts_asc[i[:-3]] = fetch('Posts/'+i)
	di.reverse()
	for i in di:
		r = fetch('Posts/'+i)
		cat = r.split('\n')[0]
		# print(r)
		# print(cat,i[:-3])
		posts_by_category[cat][i[:-3]] = r
		posts_sorted[i[:-3]] = r


	for item in split_dict(posts_sorted, posts_in_home):
		posts_chunked.append(item)

	global chunked_cats
	for catname,data in posts_by_category.items():
		chunked_cats[catname] = []
		for item in split_dict(data,posts_in_home):
			chunked_cats[catname].append(item)

	sprint('Analyzing Done!\n',color=bcolors.green)
	return 1


#--------------------------------Description-------------------------------------
# it generates home template from the template files in Templates/{Templatename}#
# then return them for next step 												#
#--------------------------------------------------------------------------------

def makeHome():
	base = fetch(template+"Base.html")
	# Latest Posts:
	latest = ""
	last = dict(itertools.islice(posts_chunked[0].items(), 5))
	for key,val in last.items():
		posturl = key.split('_')[0].split(' ')[0] + "_" + key.split('_')[1]
		url = baseurl + "posts/" + posturl + ".html"
		titl = val.split('\n')[1][1:]
		fullttl = titl
		if len(titl) > 30:
			titl = titl[:30] + "..."
		tmp = f'<li><a href="{url}" title="{fullttl}">{titl}</a></li>'
		latest = latest + tmp

	latest = f'<ul>{latest}</ul>'
	categories = "<ul>"
	for i in fetch('categories.txt').split('\n'):
		name = i.split(':')[1]
		url = baseurl + "categories/" + i.split(':')[0] + ".html"
		categories = categories + '<li><a href="'+url+'">'+name+"</a>"
	
	navlinks = ""
	for i in  sorted(listdir('Pages')):
		z = fetch('Pages/'+i)
		title = z.split('\n')[0].replace('#','')
		url = baseurl + 'pages/' + i.split('_')[1][:-3] + ".html"
		navlinks = navlinks + f'<li><a href="{url}">{title}</a></li>'


	categories = categories + "</ul>"
	dic = {
		'[& Home_Link &]':baseurl,
		"[& Blog_Name &]":blogname,
		"[& Page_Title &]":blogname,
		"[& Latest_Posts &]":latest,
		"[& Categories &]":categories,
		"[& Nav_Links &]":navlinks,
		"[& Base_Url &]":baseurl ,
		"[& GB_Version &]":VERSION,
	}
	# base = base.replace('[& Home_Link &]',getenv('BaseUrl'))
	for key,val in dic.items():
		base = base.replace(key,val)

	# print(base)
	return base


#--------------------------------Description-------------------
# As it called, it generates paginator in the bottom of pages #
#--------------------------------------------------------------

def paginator(totalpages,currentpage,path):
	pagelist = []
	chunk = 4
	prefix = False
	postfix = False
	if totalpages < 5:
		for i in range(1,totalpages+1):
			pagelist.append(i)
	else:
		
		if currentpage <= chunk - 1:
			pagelist = [1,2,3,4]
			postfix = True

		elif currentpage <= totalpages and currentpage >= totalpages-2:
			pagelist = [
				totalpages - 3,
				totalpages - 2,
				totalpages - 1,
				totalpages
			]
			prefix = True
		else:
			pagelist = [
				currentpage - 1,
				currentpage,
				currentpage + 1,
				currentpage + 2
			]

			prefix = True
			postfix= True

	templ = '<div id="paginator" dir="rtl"><ul>[& PAGES &]</ul></div>'
	pages = ""
	home = True
	for i in pagelist:
		if path == "/": #its home
			if i == 1:
				url = ""
			else:
				url = f'page-{i}.html'
		else:	# path = "/categories/1.html"
			home = False
			if i == 1:
				url = path
			else:
				url = f"{path[:-5]}-{i}.html"
		
		crnt = ""
		url = baseurl + url
		temp = f'<li><a href="{url}">{i}</a></li>'
		if i == currentpage:
			crnt = "current-page"
			temp = f'<li><a class="{crnt}">{i}</a></li>'		
		pages  =  pages + temp

	
	# PREFIX AND POSTFIX BUTTONS


	pref = ""
	postf = ""
	
	if home == True:
		prefurl = ""
		postfurl= f'page-{totalpages}.html'
	else:
		prefurl = path
		postfurl= f"{path[:-5]}-{totalpages}.html"
	
	if prefix == True:
		pref = f'<li><a href="{baseurl + prefurl}">اول</a></li>'
	if postfix == True:
		postf = f'<li><a href="{baseurl + postfurl}">آخر</a></li>'

	pages = pref + pages + postf
	res = templ.replace('[& PAGES &]',pages)    
	# print(res)
	return res


#--------------------------------Description----------------------------------
# This function generate Home Page add posts in it, basically it renders the #
# index.html file and other pages of home page.							     #
#-----------------------------------------------------------------------------

def h_and_p(home):
	hpost_template = fetch(template+"HomePostTemplate.html")
	itr = 1
	for i in posts_chunked:
		if itr == 1:
			#no postfix
			page = "index.html"
		else:
			page = f"page-{itr}.html"

		gen_html = ""

		for pkey,pval in i.items():
			temp = hpost_template
			posturl = pkey.split('_')[0].split(' ')[0] + "_" + pkey.split('_')[1]
			mini = markdown.markdown("\n".join(pval.split('\n')[2:])[:700] + "...")
			
			# Fixing Images CLS
            rex = r'<img[\w| |=\"\']+src=\"([\w:\/\.\-@!#$%^&\*\_]+)\" />'
			cz = re.findall(rex,mini)
			for zi in cz:
				# Actually for image link in image links
				size = get_size(f'Posts/{zi}')
				mini = mini.replace(zi+"\"", f'{zi}\" width="{size[0]}" height="{size[1]}"')

			# fixing possible links
			r = re.findall('src="(.*)"',mini)
			for it in r:
				mini = mini.replace(it,baseurl + it)            

			Date = pkey.split('_')[0]
			if Show_As_Jalali == True:
				gt = datetime.strptime(Date, '%Y-%m-%d %H:%M')
				jd = gregorian_to_jalali(gt.year,gt.month,gt.day)
				# Important Note: in Python, Monday is 0 and Sunday is 6'th day.
				week = gt.weekday()
				Date = f'{jweek[week]}، {jd[2]} {jmonth[jd[1]]} ماه {jd[0]}، ساعت {hc(str(gt.hour))}:{hc(str(gt.minute))}'


			dic = {
				'[& Post_Date &]':Date,
				"[& Post_Title &]":pval.split('\n')[1][1:],
				"[& Post_MiniText &]" : mini,
				"[& Post_Url &]":baseurl+"posts/"+posturl+".html",
				"[& Post_Category &]":categories_list[pval.split('\n')[0]],
				"[& Base_Url &]":baseurl
			}
			for tk,tv in dic.items():
				temp = temp.replace(tk,tv)

			gen_html = gen_html + temp

		gen_html = gen_html + paginator(len(posts_chunked),itr,'/')
		dat = home.replace('[& Yield &]',gen_html)
		put(dist_path+"/"+page,dat)
		if itr == len(posts_chunked):
			sprint(f"Generated {itr} Pages Successfully \n",color=bcolors.green)

			return

		sprint(f"Generating Home Pages {itr}/{len(posts_chunked)}",color=bcolors.yellow,slp=0.01)
		itr = itr + 1


#--------------------------------Description----------------------------------
# Makes Individual post pages, put real data in Yielded Positions in Template#
# Also Add comment section after it.									     #
#-----------------------------------------------------------------------------

def individual_posts(home):
	sprint('Generating Individual Posts',color=bcolors.bold)
	system(f'mkdir {dist_path}/posts &> /dev/null ')
	hpost_template = fetch(template+"PostTemplate.html")
	comments_template = fetch(template+"CommentsSection.html")
	
	i = 0
	for pkey,pval in posts_asc.items():
		gen_html = ""
		slug = pkey.split('_')[1]
		temp = hpost_template
		posturl = pkey.split('_')[0].split(' ')[0] + "_" + pkey.split('_')[1]
		txt = markdown.markdown("\n".join(pval.split('\n')[2:]))
		# fixing possible links
		r = re.findall('src="(.*)"',txt)
		for it in r:
			txt = txt.replace(it,baseurl + it) 

		Date = pkey.split('_')[0]
		if Show_As_Jalali == True:
			gt = datetime.strptime(Date, '%Y-%m-%d %H:%M')
			jd = gregorian_to_jalali(gt.year,gt.month,gt.day)
			week = gt.weekday()
			Date = f'{jweek[week]}، {jd[2]} {jmonth[jd[1]]} ماه {jd[0]}، ساعت {hc(str(gt.hour))}:{hc(str(gt.minute))}'


		dic = {
			'[& Post_Date &]':Date,
			"[& Post_Title &]":pval.split('\n')[1][1:],
			"[& Post_Text &]" :txt,
			"[& Post_Url &]":baseurl+"posts/"+posturl+".html",
			"[& Post_Category &]":categories_list[pval.split('\n')[0]]
		}
		for tk,tv in dic.items():
			temp = temp.replace(tk,tv)
		gen_html = gen_html + temp

		 # Comments
		if comments_enabled == True:
			temp = comments_template
			dic = {
				"[& Cusdis_Key &]":getenv('Cusdis_Key'),
				"[& Post_Id &]":pkey,
				"[& Post_Url &]":baseurl+"posts/"+posturl+".html",
				"[& Post_Title &]":pval.split('\n')[1][1:],
				"[& Base_Url &]":baseurl
			}

			for tk,tv in dic.items():
				temp = temp.replace(tk,tv)

			gen_html = gen_html + temp
		home_sample = home
		dat = home_sample.replace('[& Yield &]',gen_html)
		put(dist_path+"/posts/"+posturl+".html",dat)
		sprint(f'Generating Individual Post {i}/{len(posts_asc.items())}',color=bcolors.yellow,slp=0.01)
		i = i + 1

	sprint(f'Generated {len(posts_asc.items())} Individual Posts.\n',color=bcolors.green)
	return 1

#--------------------------------Description------------------------------------
# It makes individual category pages, for example the page that shows all posts#
# related to category '0', very similar to Home page generator but bigger.     #
#-------------------------------------------------------------------------------

def individual_cats_gen(home):
	sprint('Generating Individual Category Views',color=bcolors.bold)
	system(f'mkdir {dist_path}/categories &> /dev/null ')
	hpost_template = fetch(template+"HomePostTemplate.html")
	res = ""
	# print(chunked_cats)

	for catname,catchunk in chunked_cats.items():
		# print(catchunk)
		itr = 1
		for i in catchunk:
			# print(i)
			if itr == 1:
				#no postfix
				page = f"categories/{catname}.html"
			else:
				page = f"categories/{catname}-{itr}.html"

			gen_html = ""

			for pkey,pval in i.items():
				#print(pkey)
				temp = hpost_template
				posturl = pkey.split('_')[0].split(' ')[0] + "_" + pkey.split('_')[1]
				mini = markdown.markdown("\n".join(pval.split('\n')[2:])[:700] + '...')
				# fixing possible links
				r = re.findall('src="(.*)"',mini)
				for it in r:
					mini = mini.replace(it,baseurl + it)  

				Date = pkey.split('_')[0]
				if Show_As_Jalali == True:
					gt = datetime.strptime(Date, '%Y-%m-%d %H:%M')
					jd = gregorian_to_jalali(gt.year,gt.month,gt.day)
					week = gt.weekday()
					Date = f'{jweek[week]}، {jd[2]} {jmonth[jd[1]]} ماه {jd[0]}، ساعت {hc(str(gt.hour))}:{hc(str(gt.minute))}'


				dic = {
					'[& Post_Date &]':Date,
					"[& Post_Title &]":pval.split('\n')[1][1:],
					"[& Post_MiniText &]" : mini,
					"[& Post_Url &]":baseurl+"posts/"+posturl+".html",
					"[& Post_Category &]":categories_list[pval.split('\n')[0]]
				}
				for tk,tv in dic.items():
					temp = temp.replace(tk,tv)

				gen_html = gen_html + temp

			gen_html = gen_html + paginator(len(catchunk),itr,f'categories/{catname}.html')
			dat = home.replace('[& Yield &]',gen_html)
			put(dist_path+"/"+page,dat)
			sprint(f"Generating Individual Category '{catname}': Pages {itr}/{len(catchunk)}",color=bcolors.yellow,slp=0.01)
			itr = itr + 1
			
	sprint(f'Generated {len(chunked_cats.items())} Category Views.\n',color=bcolors.green)

	return 1

#--------------------------------Description------------------------------
# resolve assets belong to Template (CSS,JS and crap) + posts' resources #
#-------------------------------------------------------------------------

def res_assets():
	sprint('Resolving Theme Assets and Uploads',color=bcolors.bold)
	system(f'cp {template}assets/ {dist_path}/ -r')
	system(f'cp Posts/uploads/ {dist_path}/ -r &> /dev/null')

	# below crap fixing gh-pages issue with baseurl
	f = fetch(f'{dist_path}/assets/cusdis.es.full.js')
	put(f'{dist_path}/assets/cusdis.es.full.js',f.replace('[& Base_Url &]',baseurl))
#	f = fetch(f'{dist_path}/cusdis.es.full.js')
#	put(f'{dist_path}/cusdis.es.full.js',f.replace('[& Base_Url &]',baseurl))
	system(f'touch {dist_path}/.nojekyll')
	
	sprint('Assets Resolved.\n',color=bcolors.green)
	return 1

#---------------------Description----------------------
# Generate Individual Pages Like About Page and stuff #
#------------------------------------------------------

def gen_pages(home):
	sprint('Generating Individual Pages',color=bcolors.bold)
	system(f'mkdir {dist_path}/pages &> /dev/null ')
	page_template = fetch(template+"PageTemplate.html")
	di = listdir('Pages')
	for i in di:
		data = fetch('Pages/'+i)
		text = markdown.markdown(data)
		res = page_template.replace('[& Page_Text &]',text)
		generated = home.replace('[& Yield &]',res)
		put(f'{dist_path}/pages/{i.split("_")[1][:-3]}.html',generated)
	sprint(f'Generated {len(di)} Individual Pages.\n',color=bcolors.green)
	return 1
		
		

def do():
	sprint(f'GrapeBlog v{VERSION} Initialized!\n',color=bcolors.blue)
	# STEP 0 - Controling Step !
	
	system('mkdir dist &> /dev/null')
	# STEP 1 - Analyze Posts and Categories
	sprint('Initialized Successfully!',color=bcolors.bold)
	analPosts()

	# STEP 2 - Make Home Page
	sprint('Generating Home Template',color=bcolors.bold)
	home = makeHome()
	sprint('Home Template Done!',color=bcolors.green)

	# STEP 3 - Home Posts and Pagination
	sprint('Generating Home Page',color=bcolors.bold)
	h_and_p(home)

	# STEP 4 - Resolve Assets
	res_assets()

	# STEP 5 - Make Individual Posts
	individual_posts(home)

	# STEP 6 - Make Category Individual View
	individual_cats_gen(home)

	# STEP 7 - Generate Individual Pages
	gen_pages(home)

	# Done
	sprint('\nProcess Completed!\nYour Blog is Ready to Deploy\nHurry Your Audiences are Waiting :)\n',color=bcolors.blue)

def argparse(arg):
	del arg[0] # first elem is file name
	#print(arg)
	if "-f" in arg:
		global fastprint
		fastprint = True
	if "-q" in arg:
		global quiet
		quiet = True
	if "-v" in arg:
		sprint(f'GrapeBlog ‌‌v{VERSION}',color=bcolors.blue)
		return
	if "-r" in arg:
		system("rm dist/ -rf &> /dev/null")

	# Eventually
	do()
	
if __name__ == "__main__":
	argparse(argv)

from PIL import Image
import glob
from os import remove as rmv
def get_size(fpath):
	img = Image.open(fpath)
	return [img.width,img.height]

def compress(fpath):
	foo = Image.open(fpath)
	fpath_without_extension = fpath.replace(fpath.split('.')[-1], '')
	foo.save(fpath_without_extension + "webp",optimize=True,quality=80,format="webp")
	return 1

def remove(fpath):
	try:
		rmv(fpath)
	except:
		pass

def compress_assets():
	# for Major image formats
	try:
		for filename in glob.iglob('./dist/uploads/' + '**/*.png', recursive=True):
			compress(filename)
			remove(filename)

		for filename in glob.iglob('./dist/uploads/' + '**/*.jpg', recursive=True):
			compress(filename)
			remove(filename)

		for filename in glob.iglob('./dist/uploads/' + '**/*.jpeg', recursive=True):
			compress(filename)
			remove(filename)


	except Exception as e:
		print('err',e)



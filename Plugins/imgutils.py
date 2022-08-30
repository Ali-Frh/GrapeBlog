from PIL import Image
  
def get_size(fpath):
	img = Image.open(fpath)
	return [img.width,img.height]

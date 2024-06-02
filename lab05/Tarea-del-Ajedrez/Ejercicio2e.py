from interpreter import draw
from chessPictures import *

square_normal = square
square_inverter = square.negative()

base_case = square_inverter.join(square_normal)
final_img = base_case.horizontalRepeat(4)    

draw(final_img)
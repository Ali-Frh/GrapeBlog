def gregorian_to_jalali(gy, gm, gd):
	g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
	if (gm > 2):
		gy2 = gy + 1
	else:
		gy2 = gy
	days = 355666 + (365 * gy) + ((gy2 + 3) // 4) - ((gy2 + 99) // 100) + ((gy2 + 399) // 400) + gd + g_d_m[gm - 1]
	jy = -1595 + (33 * (days // 12053))
	days %= 12053
	jy += 4 * (days // 1461)
	days %= 1461
	if (days > 365):
		jy += (days - 1) // 365
		days = (days - 1) % 365
	if (days < 186):
		jm = 1 + (days // 31)
		jd = 1 + (days % 31)
	else:
		jm = 7 + ((days - 186) // 30)
		jd = 1 + ((days - 186) % 30)
	return [jy, jm, jd]

def hc(number):		# Aka HumanClock
	number = str(number)
	if len(number) == 1:
		return f"0{number}"
	else:
		return number

# in Python's datetime, First Day of week is Monday which is 'دوشنبه' in Jalali Calendar.
jweek = ['دوشنبه','سه شنبه','چهارشنبه','پنج شنبه','جمعه','شنبه','یکشنبه']
jmonth =['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند']
#input is in day5input.txt
input=open("day5input.txt")
lines=input.read().splitlines()

def listrange(l: list) -> range: return range(len(l))

seeds=[]

#putting the seeds into a list
seeds=lines[0][lines[0].index(":")+2:].split()
seeds=[int(i) for i in seeds]
del lines[0]

templines=lines.copy()

#removing unnecessary lines
for i in templines:
    if "-" in i:
        lines.remove(i)
    if i=="":
        lines.remove(i)

#parsing the rest of the lines
lines=[i.split() for i in lines]
lines=[[int(j) for j in i] for i in lines]

#the actual code
for i in lines:
    diff=i[1]-i[0]
    for j in listrange(seeds):
        if seeds[j]>=i[1] and seeds[j]<i[1]+i[2]:
            seeds[j]-=diff

print(min(seeds))
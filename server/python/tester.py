import sys
import json
sys.path.append(sys.argv[1])
from solver import solution
args = open(sys.argv[1] + "/data.json")
data = json.loads(args.read())
print(solution(**data))
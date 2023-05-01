#!/usr/bin/env python3

import os
import sys
import subprocess

# rough script to quickly grade for provided test cases

def main(argv):
    if (not len(argv)): return
    if (len(argv) > 1):
        if (argv[0] == "-c"):
            files = os.listdir(argv[1] + "/tests")
            for file in files:
                if (".java" not in file): continue
                directory = argv[1] + "/tests/" + file
                error = subprocess.run(["./codegen", directory], stderr=subprocess.PIPE).stderr.decode('utf-8')
                if (error):
                    print(f"FAILED COMPILATION: {directory}")
                    print(error)
                    continue
    else:
        files = os.listdir(argv[0] + "/tests"); score = 0; filesAssessed = 0
        for file in files:
            if (".s" not in file): continue
            filesAssessed += 1
            directory = argv[0] + "/expected/" + file.replace(".s", ".out")
            with open(directory) as input:
                error = subprocess.run(["gcc", "-o", "temp", argv[0] + "/tests/" + file], stderr=subprocess.PIPE).stderr.decode('utf-8') # change this to match the ARM assembler instruction
                if (error):
                    print(f"FAILED COMPILATION: {directory}")
                    print(error)
                    continue
                result = subprocess.run(["./temp", "555"], stdout=subprocess.PIPE).stdout.decode('utf-8').splitlines()
                temp = input.readline().replace('\n', ''); iterator = 0; diffFlag = False
                while temp:
                    if (iterator >= len(result) or temp != result[iterator]): 
                        diffFlag = True
                        break
                    temp = input.readline().replace('\n', '')
                    iterator += 1

                if diffFlag:
                    print(f"FAIL: {directory} on line {iterator + 1}"),
                    print(f"\texpected: {temp}")
                    if (iterator >= len(result)):
                        print(f"\tgiven: *empty*")
                    else:
                        print(f"\tgiven: {result[iterator]}")
                    continue
                else:
                    score += 100
        
        score = score / filesAssessed
        print("-----------------------")
        print(f"Overall Score: {score}")

if __name__ == "__main__":
    main(sys.argv[1:])
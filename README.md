## THE IDEA

Project was created to help super cool guy, that works in cable factory *(or sum idk he makes cables happen)*. 
They were supposed to calculate some absurd stuff - '60 holes 53 cables', make it symetrical, so they did, by **counting it on paper**.
Well now they don't have to. If you know any guy with same struggles, share this site, branch it, do whatever pleases you 😼😼.


## TO DO

0. Fix the allert when trying to enter number larger than 9999 (idk why cause its input length locked but looks cool).
1. Figure out better way to show patterns that are repeatable but got some extra element at the end.
2. Expand functionality after feedback from Mr.CableMaker.
3. Write tests.
4. Make it look decent.
5. Change logo (maybe).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:PORT](http://localhost:PORT) with your browser to see the result.
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

*/components* contain CableVizualizer that renders 2d elements and my footer. I tried creating 3d model with three.js but it seemed like an overkill.

*/utils* contains cableCalculator that it whole logic behind cable/hole placement on the "ring". 

>"Have you ever stopped to watch a bluebird drop from a tree, and take to the air? Me Neither. Have you ever stopped to finish out a rhyme but the right words just weren't there? Meat Cleaver"

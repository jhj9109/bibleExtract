# bibleExtract

## To use

### install package:
`npm install package.json`

### exec file with argument:
`node ./src/main.js bookName chapterNumber verseNumberStart verseNumberEnd`
- `bookName`(required): 어느성경인지, 성경 범례 활용
- `chapterNumber`: 몇 장인지, 해당 성경 범위 넘어가면 에러
- `verseNumberStart`(required): 몇절부터인지, 해당 성경 범위 넘어가면 에러
- `verseNumberEnd`(optional): 몇절까지인지, 해당 성경 범위 넘어가면 에러, 입력하지 않으면 verseNumberStart 값 (즉 1절만 선택)

예시: `./src/main.js 창 2 10 15`

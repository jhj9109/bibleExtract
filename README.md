# bibleExtract

## To use

### install package:
`npm install package.json`

### exec file with no argument:
`node ./src/main.js`

### first, select version
```
역본을 선택해주세요.(default: 개역개정)
[개역개정, 개역한글, 표준새번역, 새번역, 공동번역, 공동번역 개정판, CEV]:
```
- 아무 입력없이 엔터를 입력하면 디폴트 값인 개역개정 선택
- 이외 올바른 입력이 들어 올때까지 계속 prompt

### query info typing
```
찾을 성경 구절을 입력하세요. (e.g. 창 1 1 2) | 그만 하시려면 y를 입력하세요
찾을 성경 구절:
```
- `bookName`(required): 어느성경인지, 성경 범례 활용
- `chapterNumber`: 몇 장인지, 해당 성경 범위 넘어가면 에러
- `verseNumberStart`(required): 몇절부터인지, 해당 성경 범위 넘어가면 에러
- `verseNumberEnd`(optional): 몇절까지인지, 해당 성경 범위 넘어가면 에러, 입력하지 않으면 verseNumberStart 값 (즉 1절만 선택)

### output
- 루트 경로에 "output.txt" 이름으로 파일 생성
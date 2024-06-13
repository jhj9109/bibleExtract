# bibleExtract

## To use

### install package:

`npm install package.json`

### exec file with no argument:

`node ./src/main.js`

### first, select version

```text
역본을 선택해주세요.(default: 개역개정)
[개역개정, 개역한글, 표준새번역, 새번역, 공동번역, 공동번역 개정판, CEV]:
```

- 아무 입력없이 엔터를 입력하면 디폴트 값인 개역개정 선택
- 이외 올바른 입력이 들어 올때까지 계속 prompt

### query info typing

```text
찾을 성경 구절을 입력하세요. (e.g. 창 1 1 2) | 그만 하시려면 y를 입력하세요
찾을 성경 구절:
```

- `bookName`(required): 어느성경인지, 성경 범례 활용
- `chapterNumber`: 몇 장인지, 해당 성경 범위 넘어가면 에러
- `verseNumberStart`(required): 몇절부터인지, 해당 성경 범위 넘어가면 에러
- `verseNumberEnd`(optional): 몇절까지인지, 해당 성경 범위 넘어가면 에러, 입력하지 않으면 verseNumberStart 값 (즉 1절만 선택)

### output

- 루트 경로에 "output.txt" 이름으로 파일 생성

### 발견했으나 아직 미해결인 문제

1. 윈7에서 한글포맷 관련 오류

- 증상: 콘솔에서 프롬프트의 한글이 깨지는 현상 발생
- 원인: UTF-8이 기본 포맷이 되기전으로(?) 프롬프트 출력전 포맷 변화 필요한것으로 파악

## 에러 핸들링

### 1. Axios로 요청시 `UNABLE_TO_VERIFY_LEAF_SIGNATURE` 에러

Leaf Certificate

- SSL/TLS 인증서 체인의 최종 인증서를 의미
- 서버에 의해 제공되고, 클라이언트(Axios)가 이 인증서를 검증

Unable to Verify

- Axios가 제공된 Leaf certificate의 유효성을 검증할 수 없다는 것을 의미
- 인증서가 자체 서명된 경우 or 만료된 경우 or 또는 클라이언트에 의해 신뢰되지 않는 발급 기관에 의해 발급된 경우 발생

인증서에 어떤 오류가?

- 실제 웹사이트에서는 정상적인 자물쇠 표시

내 문제인가?

- curl로 테스트시 동일한 문제 발생
- curl: (60) SSL certificate problem: unable to get local issuer certificate

즉, 서버의 SSL 인증서를 발급한 인증 기관(CA)을 실행중인 로컬 시스템에서  알려져 있지 않거나 신뢰되지 않기 때문에 발생

#### 해결책 1. 우회하기

```typescript
const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});
```

```typescript
const instance = axios;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
```

#### 해결책 2. 인증서 관련 업데이트

`update-ca-certificates`

- 실패

내가 업데이트를 잘 못 한것일까? 다시 해보자

`openssl s_client -connect www.bskorea.or.kr:443 -servername www.bskorea.or.kr`

- `verify error:num=20:unable to get local issuer certificate`
- `verify error:num=21:unable to verify the first certificate`
- 서버가 전체 인증서 체인, 특히 루트 CA에 신뢰 체인을 설정하는 데 필요한 중간 인증서를 보내지 않은것이 원인

로그 비교

```text
실제 로그
Certificate chain
 0 s:C = KR, ST = Seoul, L = Seocho-gu, O = Korean Bible Society, CN = www.bskorea.or.kr
   i:C = US, O = DigiCert Inc, OU = www.digicert.com, CN = Thawte TLS RSA CA G1
```

```text
정상이였다면 가정하는 로그
Certificate chain
 0 s:C = KR, ST = Seoul, L = Seocho-gu, O = Korean Bible Society, CN = www.bskorea.or.kr
   i:C = US, O = DigiCert Inc, OU = www.digicert.com, CN = Thawte TLS RSA CA G1
 1 s:C = US, O = DigiCert Inc, OU = www.digicert.com, CN = Thawte TLS RSA CA G1
   i:C = US, O = DigiCert Inc, CN = DigiCert Global Root CA
```

해석

- 인증서 체인 부분
- 0은 서버 인증서
  - 도메인에 대한 인증서
  - 인증 기관(CA)에서 해당 Domain Name에 대해 발급
- 1은 중간 인증서, 0 서버 자체 인증서를 루트 CA 인증서에 연결
  - 서버 인증서와 루트 CA 인증서 사이의 격차해소
  - 루트 CA에서 인증서 발급 권한을 부여한 중간 CA에 의해 발급
  - 서버 인증서에서 신뢰할 수 있는 루트 CA로 신뢰 체인 설정에 중요한 역할

루트 CA의 자체 인증서는 자체 서명되어 신뢰 계층 최상위에 존재. 사전 설치되어 웹 브라우저 및 OS에서 신뢰

결론

- 서버측에서 인증서 체인을 위한 인증서를 충분히 보내지 않아 생기는 문제 => 서버 측에서 해결해야함
- or codespace 환경에서 충분한 루트 인증서를 가지고 있지 않음 => 설치 시도 해봤으나, 해결 실패
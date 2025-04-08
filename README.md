#  event-mobile-front

알바몬 이벤트 모바일 웹 프로젝트

---

## HTTPS 로컬 개발환경 구성 가이드

로컬에서 `https://local.event.albamon.com:4300` 으로 접속 가능한 HTTPS 개발환경을 구성 (회사용)

---

### 1. hosts 파일 등록

`sudo vi /etc/hosts` 파일에 아래 라인을 추가합니다:

```
127.0.0.1 local.event.albamon.com
```

---

###  2. 로컬 인증서 생성 (mkcert 사용)

HTTPS 접속을 위해 로컬 인증서를 생성합니다.

#### 2-1. mkcert 설치 (최초 1회만)

```bash
brew install mkcert
mkcert -install
```

#### 2-2. 인증서 생성

```bash
mkdir -p cert
mkcert -key-file cert/local.event.key.pem -cert-file cert/local.event.cert.pem albamon.com local.event.albamon.com
```

생성된 인증서 파일:
```
cert/
├— local.event.key.pem
└— local.event.cert.pem
```

---

### 3. http, https 개발 서버 실행

#### 빌드 & 실행

```bash
pnpm dev // http
pnpm start // https
```
접속 주소:
- https://local.event.albamon.com:4300
- http://localhost:3000

---

##  프로젝트 구조

```
event-mobile-front/
├— cert/
│   ├— local.event.key.pem
│   └— local.event.cert.pem
├— src
│   ├— app/
│   ├— components/
│   └— ...
├— public/
├— server.js
├— package.json
└— ...
```

---

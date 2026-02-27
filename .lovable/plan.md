
# 어드민 인증 시스템 구축 계획

## 개요
관리자 대시보드(`index.html`)와 상세 페이지(`detail.html`)에 로그인 보호를 추가하고, 어드민 전용 회원가입/로그인 페이지를 만듭니다.

## 구현 단계

### 1. 데이터베이스 변경
- `admin_accounts` 테이블 생성 (id, user_id, email, approved, created_at)
- 초대 코드 컬럼 또는 별도 승인 로직 추가 -- 첫 번째 가입자는 자동 승인, 이후 가입자는 기존 어드민이 승인
- RLS 정책 설정

### 2. 어드민 로그인/가입 페이지 생성 (`admin-login.html`)
- 이메일/비밀번호 회원가입 및 로그인 폼
- 회원가입 시 초대 코드 입력 필드 (선택사항) 또는 기존 어드민 승인 방식
- 승인 대기 상태 안내 화면
- 로그인 성공 시 `index.html`로 리다이렉트

### 3. `index.html` 수정
- 페이지 로드 시 `localStorage`의 토큰으로 인증 상태 확인
- 인증되지 않은 경우 `admin-login.html`로 리다이렉트
- `admin_accounts` 테이블에서 해당 유저가 승인된 어드민인지 서버 측 확인
- 어드민 관리 탭에 "어드민 계정 승인" 기능 추가
- 로그아웃 버튼 추가

### 4. `detail.html` 수정
- 동일한 인증 가드 로직 적용
- 미인증 시 `admin-login.html`로 리다이렉트

### 5. `vite.config.js` 수정
- `admin-login.html`을 빌드 엔트리에 추가

## 기술 상세

### DB 스키마
```sql
CREATE TABLE public.admin_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  email TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.admin_accounts ENABLE ROW LEVEL SECURITY;
```

### 인증 가드 로직 (index.html, detail.html 공통)
```text
1. localStorage에서 sb_access_token 확인
2. 없으면 -> admin-login.html로 리다이렉트
3. 있으면 -> admin_accounts 테이블에서 user_id + approved=true 확인
4. 미승인이면 -> 로그아웃 후 리다이렉트
5. 통과하면 -> 정상 렌더링
```

### 첫 번째 어드민 문제 해결
- 첫 가입자(admin_accounts 테이블이 비어있을 때)는 자동으로 `approved: true`로 설정
- 이후 가입자는 기존 승인된 어드민이 대시보드에서 승인

### 어드민 계정 관리
- 기존 "가입 승인" 탭 옆에 "어드민 관리" 섹션 추가
- 승인 대기 중인 어드민 목록 표시 및 승인/거부 기능

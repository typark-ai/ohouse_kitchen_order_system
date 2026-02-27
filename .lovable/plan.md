

# 재마감 기능 비활성화 (Coming Soon 처리)

## 개요
재마감 관련 기능만 정확히 4곳에서 비활성화합니다. 다른 코드는 일절 수정하지 않습니다.

## 수정 범위 (detail.html만 수정)

### 1. MokdaeSectionC - "재마감 요청" 버튼 (2593-2603행)
- 버튼을 `disabled` 처리, `onClick` 제거
- 텍스트를 "재마감 요청 (Coming Soon)"으로 변경
- 스타일을 회색(`text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed`)으로 변경

### 2. MokdaeSectionD - 재마감 요청 아코디언 (2657행~)
- 섹션 헤더 제목 옆에 "Coming Soon" 뱃지 추가
- 신규 요청 작성 폼 영역의 input, textarea, button을 `disabled` 처리
- 기존 전송 내역(claims)은 읽기 전용으로 그대로 유지

### 3. SangpanSectionC - "재마감 요청" 버튼 (4801-4811행)
- MokdaeSectionC와 동일한 패턴 적용

### 4. SangpanSectionD - 재마감 요청 아코디언 (4823행~)
- MokdaeSectionD와 동일한 패턴 적용

## 수정하지 않는 부분
- 상태 옵션 배열(MOKDAE_STATUS_OPTS 등)의 "재마감확정" 등 기존 값
- factory.html / countertop.html의 재마감 관련 표시 로직
- 긴급 조정 버튼 (재마감과 별개 기능)
- 그 외 모든 코드


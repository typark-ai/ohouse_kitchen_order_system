

## Detail 탭 기본 앵커 및 느낌표 로직 개선

### 현재 문제

1. **탭 기본값**: `useState("목대")`로 하드코딩되어 있어 항상 목대 탭이 먼저 열림
2. **느낌표(!)**: `TAB_ALERT` 객체가 실측/목대/상판에 정적으로 `!`를 표시 -- 실제 상태와 무관한 더미 로직

---

### 1. 탭 앵커 자동 결정 로직 (추천)

케이스의 진행 단계에 따라 "지금 가장 주목해야 할 탭"을 자동 선택합니다.

**우선순위 규칙** (위에서 아래로 체크, 첫 번째 해당 탭을 기본값으로):

| 순서 | 조건 | 기본 탭 |
|------|------|---------|
| 4 | `dispatched_sangpan === true` (상판 발주 시작됨) | 상판 |
| 3 | `dispatched_gigi === true` (기기 발주 시작됨) | 기기 |
| 2 | `dispatched_mokdae === true` (목대 발주 시작됨) | 목대 |
| 1 | 그 외 (최초 생성, 아직 아무것도 발송 안 됨) | 실측 |

`caseData`가 로드된 후 `dispatched_*` 플래그를 확인하여 `activeTab`을 설정합니다. 이미 DB에 있는 필드를 활용하므로 추가 DB 변경 없음.

---

### 2. 느낌표(!) 알림 로직 (추천)

정적 `TAB_ALERT` 객체를 제거하고, **실시간 상태 기반**으로 "주의가 필요한 탭"에만 느낌표를 표시합니다.

**느낌표 표시 조건:**

| 탭 | 느낌표 조건 |
|----|------------|
| 실측 | 실측 일정이 아직 확정되지 않았을 때 (`silcheuk_finalized === false`) |
| 목대 | 반려/수정요청/클레임이 있을 때, 또는 소비자 승인 대기 중일 때 |
| 기기 | 기기 발주 요청 후 업체 응답 대기 중일 때 |
| 상판 | 반려/수정요청/클레임이 있을 때, 또는 소비자 승인 대기 중일 때 |

---

### 기술 구현 (detail.html 수정)

1. **`getDefaultTab(caseData)` 함수 추가**: dispatched 플래그 기반으로 기본 탭 결정
2. **`getTabAlerts(caseData, caseStatus)` 함수 추가**: 상태 기반으로 느낌표 표시 여부 계산, 객체 반환
3. **RightPanel 수정**:
   - `useState("목대")` 를 `useState("실측")`으로 변경 (초기값)
   - `useEffect`에서 caseData 로드 후 `getDefaultTab()` 호출하여 `setActiveTab`
   - `TAB_ALERT` 정적 객체 대신 `getTabAlerts()` 결과 사용

추가 DB 변경 없이, 기존 `cases` 테이블의 `dispatched_*`, `silcheuk_finalized`, `status` 등 기존 필드만 활용합니다.


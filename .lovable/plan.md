
# 목대/상판 일정 반영 로직 수정

## 문제
목대(상판)에서 발주서 버전이 여러 개일 때, 이전 버전의 공장 확인 여부와 관계없이 최신 버전이 공장 확인(factoryChecked)되면 해당 버전의 일정이 기본 정보에 반영되어야 합니다. 현재는 cross-tab 동기화(localStorage) 의존으로 인해 factory.html에서 확인한 결과가 detail.html에 제때 반영되지 않는 문제가 있습니다.

## 수정 내용

### 1. detail.html - MokdaeSectionA 일정 전달 로직 (약 1597-1606행)

현재 로직:
```javascript
const approved = versions
  .filter(v => !v.isNew && v.factoryChecked)
  .sort((a, b) => b.versionNo - a.versionNo);
const date = (approved.length > 0 && approved[0].mokdaeDate) || "";
```

수정 방향:
- 최신 제출된 버전(isNew가 false인 것 중 versionNo가 가장 큰 것)이 factoryChecked이면, 해당 버전의 mokdaeDate를 사용
- 이전 버전들의 factoryChecked 여부는 무시
- `initVersions` 변경 시에도 확실히 재계산되도록 의존성 배열에 `initVersions` 추가

### 2. detail.html - SangpanSectionA 일정 전달 로직 (약 3541-3550행)

목대와 동일한 패턴으로 수정:
- 최신 제출 버전의 factoryChecked + sangpanDate 기준으로 일정 전달
- 이전 버전 확인 여부와 무관하게 동작

### 3. cross-tab 동기화 강화

현재 `initVersions`가 변경되면 내부 `versions` 상태를 갱신하지만, `onMokdaeSchedule`/`onSangpanSchedule` useEffect의 의존성이 내부 `versions`만 참조하여 타이밍 이슈 발생 가능. `initVersions` 변경 시에도 스케줄 재계산이 트리거되도록 보장.

## 수정 파일
- `detail.html` (MokdaeSectionA, SangpanSectionA 두 곳)

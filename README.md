## 인스타그램 콜론 코딩 프로젝트

Dream Coding Academy에서 진행한 인스타그램 클론 코딩 프로젝트를 바탕으로 개선한 프로젝트입니다.

### 🔗 배포 주소

https://instagram-with-react-query.vercel.app/

</br>

### ⚙️ 사용 기술

![TypeScript](https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)

</br>

### 🚀 개선 사항

#### 1. `SWR` -> `React Query`로 변경

* 강의에서 SWR을 사용해 구현해본 경험을 바탕으로, 현재 현업에서 많이 사용되고 있다고 생각하는 React Query를 활용해보기 위해 변경해 보았습니다.
* 그리고 `staleTime`을 설정해 불필요한 리패칭을 방지하고, 데이터 통신 비용을 줄이기 위해 사용했습니다.

#### 2. `Optimistic Update`을 사용하여 즉각적인 UI 업데이트

좋아요, 북마크 기능은 useQuery를 사용해서 클라이언트에서 가져온 데이터이기 때문에 Mutation 함수만으로 Optimistic Update가 가능했지만, 프로필 페이지의 유저 데이터는 서버에서 이미 받아온 데이터였기 때문에 따로 refresh를 해줘야 했다.
</br>
그러면 서버에서 데이터를 받아오는 시간동안의 텀이 생기기 때문에, useOptimistic을 사용해 Optimistic Update를 적용하였다. 따라서 유저에게 즉각적인 UI 업데이트를 제공할 수 있게 되었다.
</br>
추가적으로 `try...catch`문을 사용해서 mutate 함수 실패 시 상태를 되돌려 주었다.

| 강의                                                                                                            | Optimistic Update (개선 후)                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/8b2ab231-cfda-435a-9015-edb7a0d508e5" width="400"> | <img src="https://github.com/user-attachments/assets/c1e33a61-cc7b-4d29-b327-28722a2eabaa" width="400"> |

</br>

#### 3. `Prefetch`와 `Hydration`을 이용한 데이터 패칭

메인 페이지의 포스트 리스트 데이터를 클라이언트에서 받아와 보여주니 레이아웃에 크게 변동이 생겨 `lighthouse`의 Performance 부분 `CLS`에서 굉장히 낮은 점수를 받았습니다.</br>
그래서 메인 페이지의 포스트 리스트 데이터를 Prefetching을 통해 서버에서 미리 받아와 렌더링함으로써 레이아웃 변경을 최소화할 수 있었습니다.

| 강의 (73점)                                                                                                           |   Prefetch (개선 후 98점)                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/user-attachments/assets/9c0bcecf-c8a7-4fd1-93f9-892039200df0" width="400"> | <img src="https://github.com/user-attachments/assets/a08072a4-7811-4f9a-91d2-0b87854db131" width="400"> |

</br>

### 📚 진행중

메인 페이지에서 모든 포스트 리스트를 모두 가져와서 보여주기 때문에 포스트가 많아질 경우 많이 비용이 들것입니다. 그렇기 때문에 데이터 패칭 방법을 무한 스크롤로 개선하여 초기 렌더링을 더욱 최적화할 예정입니다!

</br>



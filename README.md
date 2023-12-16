# 겪은 문제

## 스타일링

진짜 tailwind 개같구먼
Image 컴포넌트를 쓰면 일반적인 스타일링을 사용하기 너무 어렵다.
퍼센트를 사용해봤는데, 그냥 상수를 넣는게 답인 것 같다.
퍼센트로하니까 엄청 깨지는데, 상수로 하니까 깨지지 않는다.

폰트를 적용해야한다.
import { Inter } from 'next/font/google'
-> 튜토리얼 사이트 보고 해결함

로딩 끝나면 스탭 페이지로 넘어가야한다

<w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: ENOENT: no such file or directory, rename '/home/leedo/바탕화면/source/side/doombti/.next/cache/webpack/client-development-fallback/0.pack.gz\_' -> '/home/leedo/바탕화면/source/side/doombti/.next/cache/webpack/client-development-fallback/0.pack.gz'

이건 뭔 에러야 스와이프 쓰니까 이 에러가 난다.
스토리북은 잘되는데 왜 dev는 안되는거지
-> 스와이프에도 use client가 있어야했다.

버튼 컴포넌트 안됨
-> 스타일 안가져왔었네
-> 다크모드 이거 좀 골때리네

tailwind 개어렵다.

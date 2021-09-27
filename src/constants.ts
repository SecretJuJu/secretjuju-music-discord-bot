export const helpMessage = `
\`\`\`
사용할 수 있는 명령어

!!play
    - 플레이 할 음악의 youtube url을 입력합니다
    - ex: !!play https://www.youtube.com/watch?v=wDfqXR_5yyQ

!!add
    - 플레이리스트에 음악을 추가합니다.
    - ex: !!add https://www.youtube.com/watch?v=wDfqXR_5yyQ

!!insert
    - 플레이리스트에 음악을 삽입합니다.
    - ex: !!insert 2 https://www.youtube.com/watch?v=wDfqXR_5yyQ
        - 플레이리스트에 음악이 5개 있을경우 2번째 음악으로 삽입됩니다.

!!delete
    - 플레이리스트의 음악을 삭제합니다.
    - ex: !!delete 2
        - 플레이리스트의 2번째 음악을 삭제합니다.
    - ex: !!delete 2 1 3 4 5
        - 플레이리스트의 2,1,3,4,5 번 항목을 삭제합니다.

!!show
    - 플레이리스트에 들어가있는 음악을 보여줍니다.

!!clear
    - 플레이리스트를 비웁니다.

!!skip
    - 현재 음악을 건너뜁니다.

!!loop
    - 플레이리스트를 반복합니다.

!!help
    - 도움말을 보여줍니다.

\`\`\`

* 문의사항이 있으시다면 \`dev.tmdqh@gmail.com\`으로 문의 해 주세요.
`;

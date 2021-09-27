export class NoGuildException extends Error {
  message = "길드 채널에서만 가능합니다.";
}
export class NotJoinedVoiceException extends Error {
  message = "음성채널에 입장 후 실행 해 주세요.";
}

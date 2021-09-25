export default interface music {
  title: string;
  url: string;
}

export const playList = new Map<String, music[]>();

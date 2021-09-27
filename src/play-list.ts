import { StreamDispatcher, TextChannel, VoiceConnection } from "discord.js";
import ytdl, { downloadOptions } from "ytdl-core";
import { v4 as uuid } from "uuid";

export interface IMusic {
  pk: string;
  title: string;
  url: string;
}

export class PlayList {
  constructor(guildId: string) {
    this.guildId = guildId;
    this.isLoop = false;
    this.isPlaying = false;
    this.voiceConnection = null;
    this.lastMessagedChannel = null;
    this.dispatcher = null;
    this.musicList = [];
  }
  isLoop: boolean;
  private isPlaying: boolean;
  private voiceConnection: VoiceConnection | null;
  private guildId: string;
  private musicList: Array<IMusic>;
  private lastMessagedChannel: TextChannel | null;
  private dispatcher: StreamDispatcher | null;

  startPlayList() {
    if (this.isPlaying) {
      return;
    }
    const currentMusic = this.musicList[0];
    console.log(currentMusic);
    if (!currentMusic) {
      return;
    }

    this.streamMusic(currentMusic);
  }

  playNextMusic(currentMusicPk: string) {
    const musicList = this.getMusicList();

    if (this.musicList.length === 0) {
      this.isPlaying = false;
      return;
    }

    const currentMusicIndex = this.musicList.findIndex(
      (currentMusic) => currentMusic.pk === currentMusicPk
    );

    if (currentMusicIndex === -1) {
      this.isPlaying = false;
      return;
    }

    let nextMusic = this.musicList[currentMusicIndex + 1];

    if (this.isLoop && !nextMusic) {
      nextMusic = this.musicList[0];
    }

    if (!nextMusic) {
      this.isPlaying = false;
      return;
    }

    if (!this.isLoop) {
      this.musicList.splice(currentMusicIndex, 1);
    }

    this.streamMusic(nextMusic);
  }

  streamMusic(music: IMusic) {
    const { url, pk } = music;

    if (!this.voiceConnection) {
      return;
    }

    const streamOption: downloadOptions = {
      filter: "audioonly",
    };
    const stream = ytdl(url, streamOption);

    this.dispatcher = this.voiceConnection.play(stream);

    this.isPlaying = true;

    this.dispatcher.on("error", (err: Error) => {
      if (this.lastMessagedChannel !== null) {
        this.lastMessagedChannel.send(
          "에러가 발생하여 해당 음원이 건너뛰기 되었습니다."
        );
      }
    });

    this.dispatcher.on("close", () => {
      this.playNextMusic(pk);
    });
  }

  getMusicList() {
    return this.musicList;
  }

  async getMusicInfo(url: string): Promise<IMusic | null> {
    let videoInfo;
    try {
      videoInfo = await ytdl.getInfo(url);
    } catch (_) {
      return null;
    }

    const { title } = videoInfo.videoDetails;
    const music: IMusic = { pk: uuid(), url, title };
    return music;
  }

  async addMusic(url: string) {
    const music = await this.getMusicInfo(url);
    if (music === null) {
      return false;
    }

    this.musicList.push(music);
    return true;
  }

  async insertMusic(url: string, order: number) {
    if (order < 1 || isNaN(order)) {
      return false;
    }

    const music = await this.getMusicInfo(url);
    if (music === null) {
      return false;
    }

    this.musicList.splice(order - 1, 1, music);
    return true;
  }

  deleteMusic(targetList: Array<number>) {
    const pkList: Array<String> = this.musicList
      .filter((_, index) => targetList.includes(index))
      .map((e) => e.pk);

    this.musicList = this.musicList.filter(
      (element) => !pkList.includes(element.pk)
    );
  }

  clearMusicList() {
    this.musicList = [];
  }

  skipMusic() {
    this.dispatcher?.destroy();
  }

  getVoiceConnection() {
    return this.voiceConnection;
  }
  setVoiceConnection(voiceConnection: VoiceConnection) {
    this.voiceConnection = voiceConnection;
  }

  setLastMessageChannel(textChannel: TextChannel) {
    this.lastMessagedChannel = textChannel;
  }
}

export const PlayListMap = new Map<String, PlayList>();

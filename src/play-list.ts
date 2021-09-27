import { TextChannel, VoiceConnection } from "discord.js";
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
    this.currentMusicPk = null;
    this.voiceConnection = null;
    this.lastMessagedChannel = null;
    this.musicList = [];
  }
  isLoop: boolean;
  private isPlaying: boolean;
  private currentMusicPk: string | null;
  private voiceConnection: VoiceConnection | null;
  private guildId: string;
  private musicList: Array<IMusic>;
  private lastMessagedChannel: TextChannel | null;

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
      this.musicList.splice(currentMusicIndex, 0);
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

    const dispatcher = this.voiceConnection.play(stream);

    this.isPlaying = true;

    dispatcher.on("error", (err: Error) => {
      if (this.lastMessagedChannel !== null) {
        this.lastMessagedChannel.send(
          "에러가 발생하여 해당 음원이 건너뛰기 되었습니다."
        );
      }
    });

    dispatcher.on("close", () => {
      this.playNextMusic(pk);
    });
  }

  getMusicList() {
    return this.musicList;
  }

  async addMusic(url: string) {
    let videoInfo;
    try {
      videoInfo = await ytdl.getInfo(url);
    } catch (_) {
      return false;
    }

    const { title } = videoInfo.videoDetails;
    const music: IMusic = { pk: uuid(), url, title };

    this.musicList.push(music);
    return true;
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

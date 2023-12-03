import { RedisClientType, createClient } from "redis";

enum CHANNELS {
  GAME = "game-channel",
  USER = "user-channel",
}

export type IMessageBroker = {
  publish: (message: string) => Promise<void>;
};

export const CONFI_CHANNELS = {
  GAME: {
    PUBLISH: CHANNELS.GAME,
    SUBSCRIBE: CHANNELS.USER,
  },
  USER: {
    PUBLISH: CHANNELS.USER,
    SUBSCRIBE: CHANNELS.GAME,
  },
};

export class MessageBroker {
  private readonly pubClient: RedisClientType;
  private readonly subClient: RedisClientType;

  private readonly publishChannel: CHANNELS;
  private readonly subscribeChannel: CHANNELS;

  constructor(publishChannel: CHANNELS, subscribeChannel: CHANNELS) {
    this.publishChannel = publishChannel;
    this.subscribeChannel = subscribeChannel;

    const { REDIS_HOST } = process.env;
    const config = {
      url: `redis://${REDIS_HOST}:6379`,
      legacyMode: true,
    };

    this.pubClient = createClient(config);
    this.subClient = createClient(config);

    this.onEvents();

    this.pubClient.connect();
    this.subClient.connect().then((localClient) => {
      localClient.v4.subscribe(this.subscribeChannel, (message: string, channel: string) => {
        console.log({
          receivedMessage: JSON.parse(message),
          fromChannel: channel,
        });
      });
    });
  }

  public async publish(message: string) {
    await this.pubClient.publish(this.publishChannel, message);
  }

  private onEvents() {
    this.pubClient.on("connect", () => {
      console.log("Connected to Redis - Publisher");
    });

    this.pubClient.on("error", (error) => {
      console.error("Subscriber client error:", error);
    });

    this.subClient.on("connect", () => {
      console.log("Connected to Redis - Subscriber");
    });

    this.subClient.on("error", (error) => {
      console.error("Subscriber client error:", error);
    });
  }
}

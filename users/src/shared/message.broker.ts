import { createClient, RedisClientType } from "redis";

const CHANNEL_PUBLISH = "user-channel";
const CHANNEL_SUBSCRIBE = "game-channel";

export class MessageBroker {
  private readonly pubClient: RedisClientType;
  private readonly subClient: RedisClientType;

  constructor() {
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
      localClient.v4.subscribe(CHANNEL_SUBSCRIBE, (message: string, channel: string) => {
        console.log({
          receivedMessage: JSON.parse(message),
          fromChannel: channel,
        });
      });
    });
  }

  public async publish(message: string) {
    await this.pubClient.publish(CHANNEL_PUBLISH, message);
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

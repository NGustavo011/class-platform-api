import env from "../../main/config/env";
import RabbitmqServer from "../../main/rabbitmq-server";

export const mockRabbitmqServer = (): RabbitmqServer => {
    return new RabbitmqServer(env.rabbitmqServer);
}

export const mockRabbitmqQueue = (): string => {
    return env.rabbitmqQueue;
}

export const mockRabbitmqExchange = (): string => {
    return env.rabbitmqExchange;
}

export const mockRabbitmqRoutingKey = (): string => {
    return env.rabbitmqRoutingKey
}
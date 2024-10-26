import { Kafka } from "kafkajs";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

class KafkaConfig {
    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKERS],
            ssl: {
                ca: [fs.readFileSync(path.resolve(process.env.KAFKA_SSL_CA_PATH), "utf-8")]
            },
            sasl: {
                username: process.env.KAFKA_SASL_USERNAME,
                password: process.env.KAFKA_SASL_PASSWORD,
                mechanism: process.env.KAFKA_SASL_MECHANISM
            }
        });
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: "youtube-uploader" });
    }

    async produce(topic, messages) {
        try {
            await this.producer.connect();
            console.log("Kafka connected...");
            await this.producer.send({
                topic: topic,
                messages: messages
            });
        } catch (error) {
            console.log("Error in produce:", error);
        } finally {
            await this.producer.disconnect();
        }
    }

    async consume(topic, callback) {
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({ topic: topic, fromBeginning: true });
            await this.consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const value = message.value.toString();
                    callback(value);
                }
            });
        } catch (error) {
            console.log("Error in consume:", error);
        }
    }
}

export default KafkaConfig;

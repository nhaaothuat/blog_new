import amqb from "amqplib"


let channel:amqb.Channel;


export const connectRabbitMQ = async()=>{
     try {
          const connection = await amqb.connect({
               protocol:"amqp",
               hostname:"localhost",
               port:5672,
               username:"admin",
               password:"admin123"
          })

          channel = await connection.createChannel()
          console.log("Connected to Rabbit MQ")
     
     } catch (error) {
          console.log("failed to connect rabbit",error)
     }
}

export const publishToQueue = async(queueName:string,message:any)=>{
     if(!channel){
          console.error("Rabbit channel is not initialized")
          return;
     }

     await channel.assertQueue(queueName,{durable:true});

     channel.sendToQueue(queueName,Buffer.from(JSON.stringify(message)),{
          persistent:true
     })
}

export const invalidateCacheJob = async(cacheKeys:string[])=>{
    try {
     const message = {
          action:"invalidateCache",
          keys:cacheKeys
     }

     await publishToQueue("cache-invalidation",message)

     console.log("Cache invalidation job published to rbbmq")
    } catch (error) {
       console.log("failed to cache rabbit",error)
    }
}
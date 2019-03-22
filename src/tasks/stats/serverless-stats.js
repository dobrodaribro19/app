const AWS = require('aws-sdk')
const s3 = new AWS.S3({ apiVersion: '2006-03-01' })

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false

    const data = await s3
        .getObject({
            Bucket: process.env.STATS_BUCKET,
            Key: 'stats.json',
        })
        .promise()

    const results = JSON.parse(data.Body.toString('utf-8'))
    results.lastUpdated = data.LastModified

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    }
}
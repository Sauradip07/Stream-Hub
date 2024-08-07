import AWS from 'aws-sdk';
import fs from 'fs'


// import * as maintenanceModeMessage from 'aws-sdk/lib/maintenance_mode_message.js';

// maintenanceModeMessage.suppress = true;

// const uploadFileToS3 = async(req, res) => {
  
//    const filePath = './User/dsa.png';
//    // Check if the file exists
//    if (!fs.existsSync(filePath)) {
//        console.log('File does not exist: ', filePath);
//        return;
//    }

//    process.env.AWS_SDK_JS_SUPPRESS_MAINTENANCE_MODE_MESSAGE = '1';
//    AWS.config.update({
//        region: 'eu-north-1',
//        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//    });


//    const params = {
//        Bucket: process.env.AWS_BUCKET,
//        Key: 'dsa.png',
//        Body: fs.createReadStream(filePath)
//    };


//    const s3 = new AWS.S3();


//    // Upload the file to S3
//    s3.upload(params, (err, data) => {
//        if (err) {
//            console.log('Error uploading file:', err);
//            res.status(404).send('File could not be uploaded!');
//        } else {
//            console.log('File uploaded successfully. File location:', data.Location);
//            res.status(200).send('File uploaded successfully');
//        }
//    });
// }


// export default uploadFileToS3;




const uploadFileToS3 = async(req, res) => {
    console.log('Upload req received');
   
    if (!req.file) {
        console.log('No file received');
        return res.status(400).send('No file received');
    }
    const file = req.file;
 
 
    AWS.config.update({
        region: 'eu-north-1',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
 
 
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: file.originalname,
        Body: file.buffer
    };
 
 
    const s3 = new AWS.S3();
    s3.upload(params, (err, data) => {
        if (err) {
            console.log('Error uploading file:', err);
            res.status(404).send('File could not be uploaded!');
        } else {
            console.log('File uploaded successfully. File location:', data.Location);
            console.log('\n Upload file is:', file);
            res.status(200).send('File uploaded successfully');
            
        }
    });}
 
 
 export default uploadFileToS3;

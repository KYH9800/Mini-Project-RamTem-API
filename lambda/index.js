// lambda 독립적으로 사용할 프로젝트 파일
// 해당 lambda/ 폴더의 프로젝트 자체를 zip으로 압축한 뒤 그대로 lambda에 업로드 할 예정
const AWS = require('aws-sdk');
const sharp = require('sharp'); // 이미지 리사이징 패키지 모듈

const s3 = new AWS.S3(); // 람다 자체가 AWS 에서 돌려준다. 알아서 설정한 나의 정보가 들어간다.

exports.handler = async (event, context, callback) => {
  //
  const Bucket = event.Records[0].s3.bucket.name; // 버킷명
  // original/12312312_abc.png, decodeURIComponent: 한글 깨짐현상 해결
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // 파일명
  console.log('Bucket: ', Bucket, 'Key: ', Key);
  const filename = Key.split('/')[Key.split('/').length - 1]; // 파일명에서 파일이름 추출
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase(); // 파일명에서 확장자 추출.toLowerCase(), 확장자 대문자를 소문자로
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; // sharp에서는 jpg 대신 jpeg를 사용합니다.
  console.log('filename', filename, 'ext', ext);

  try {
    // getObject: s3로부터 이미지를 가져오는 것
    const s3Object = await s3.getObject({ Bucket, Key }).promise(); // 버퍼로 가져오기
    console.log('original', s3Object.Body.length);
    // sharp 이미지 리사이징 관련 공식문서 참고
    // 키워드: sharp documentation
    // https://sharp.pixelplumbing.com/api-resize
    const resizedImage = await sharp(s3Object.Body) // sharp를 통한 리사이징
      .resize(400, 400, { fit: 'inside' }) // 비율 유지하면서 꽉차게
      .toFormat(requiredFormat) // jpg -> jpeg, png는 그대로 png 사용
      .toBuffer(); // 리사이징된 결과물이 Buffer로 나온다.
    await s3 // thumb 폴더에 저장
      .putObject({
        // putObject: s3로 부터 이미지를 넣는것
        Bucket,
        Key: `thumb/${filename}`, // ex> original/test.png (크기: 20mb) -> thumb/test.png (크기: 4mb)
        Body: resizedImage,
      })
      .promise(); // getObject와 putObject는 .promise() 붙여야만 위의 await을 사용 가능하다. 에러 조심
    console.log('put', resizedImage.length);
    // http 요청을 통해서 람다를 호출하는 경우에만 callback이 의미가 있다. (http 요청이 있어야 응답이 있다.)
    // s3를 통해 람다를 호출하는 경우에는 callback이 의미가 없다.
    return callback(null, `thumb/${filename}`); // 2번째 인자: 성공객체
  } catch (error) {
    console.error(error);
    return callback(error); // 첫 번째 인자: 에러
  }
};

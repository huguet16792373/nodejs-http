function greet(name){
  let message='登録なし';
  switch(name){
    case 'taro':
      message='こんにちは';
      break;
    case 'john':
      message='Hello';
      break;
  }
  console.log(message);
  return message;
}

greet('taro');
greet('john');
greet('pochi');
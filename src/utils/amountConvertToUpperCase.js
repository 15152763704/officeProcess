export function amountConvertToUpperCase(money) {
  if (!money) {
    return "";
  }
  //数字的汉字数组
  let numberCNList = [
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖"
  ];
  //数字的基础单位汉字数组
  let numberBaseUnit = ["", "拾", "佰", "仟"];
  //数字的高级单位汉字数组
  let numberHighUnit = ["", "万", "亿", "兆"]; // 一兆等于一万亿
  //小数部分单位汉字数组
  let floatUnit = ["角", "分", "毫", "厘"];
  //整数金额时后面跟的字符
  let integerLastCN = "整";
  //整数后的单位汉字
  let integerLastUnit = "元";
  //最大处理的数字
  let maxNum = 999999999999999.9999;
  //以小数点拆分金额产生的数组
  let decimalPointSplitList;
  //金额整数部分
  let integerNum;
  //金额小数部分
  let decimalNum;
  //返回的大写金额
  let moneyCNString = "";
  money = parseFloat(money); // 转为数字
  if (typeof money !== "number" || isNaN(money)) {
    this.$message("检测到非数字字符");
    return "";
  }
  //超出最大处理数字
  if (money >= maxNum) {
    this.$message("超出最大处理数字");
    return "";
  }
  // 等于0时 返回零元整
  if (money === 0) {
    moneyCNString = numberCNList[0] + integerLastUnit + integerLastCN;
    return moneyCNString;
  }
  //转换为字符串
  money = money.toString();
  /******金额数字的处理，转为字符串，判断有没有小数位，获取整数部分和小数部分*******/
  if (money.indexOf(".") === -1) {
    // 如果没有小数点
    integerNum = money; // money就都等于整数部分，小数部分为空
    decimalNum = "";
  } else {
    // 有小数点
    decimalPointSplitList = money.split("."); // 以小数点拆分数组
    if (decimalPointSplitList[1].length > 4)
      this.$message("金额精确仅支持到厘");
    integerNum = decimalPointSplitList[0]; // 整数部分
    decimalNum = decimalPointSplitList[1].substr(0, 4); // 小数部分只支持4位
  }
  /******整数部分处理*******/
  if (parseInt(integerNum, 10) > 0) {
    // 以十进制转为int类型 大于零
    let zeroCount = 0; // 记录零的个数
    for (let i = 0; i < integerNum.length; i++) {
      let p = integerNum.length - 1 - i; // 当前数字的位数, 比如10000 ，1的位数是4 ， 10001000，第一个1的位数是7，第二个1的位数是3
      console.log(p, integerNum[i]);
      let q = p / 4; // 当前数字位数 除以 4 商0余1，则值为0，控制其高级单位
      let m = p % 4; // 取余,比如1%4 商0余1 ，则值为1， 控制其基础单位
      // 如果当前数字等于零 则++
      if (integerNum[i] === "0") {
        zeroCount++;
      }
      // 否则当前数字不等于零时
      else {
        // 如果记录的零的个数大于0 返回结果中加一个汉字零
        if (zeroCount > 0) {
          moneyCNString += numberCNList[0];
        }
        //把零的个数归零，重新计算零的个数
        zeroCount = 0;
        // 然后把返回结果 加上 当前数字的汉字以及其基础单位
        moneyCNString +=
          numberCNList[parseInt(integerNum[i])] + numberBaseUnit[m];
      }
      // 如果当前数字所在位数取余4等于0时，那么除以4一定是整数，并且记录的零的个数小于4个,则拼接当前位数对应的高级单位
      if (m === 0 && zeroCount < 4) {
        moneyCNString += numberHighUnit[q];
      }
    }
    moneyCNString += integerLastUnit; // 整数部分结束后 拼接上整数部分单位 元
  }
  /******小数部分处理 --- 小数部分只考虑是否有值，以及当前值所在单位，没有零的概念，所以只需拼接当前值对应的汉字，以及当前值的单位即可*******/
  if (decimalNum !== "") {
    for (let i = 0; i < decimalNum.length; i++) {
      if (decimalNum[i] !== "0") {
        // 如果当前数字不等于零 则加上当前数字的汉字 以及 其小数单位
        moneyCNString += numberCNList[Number(decimalNum[i])] + floatUnit[i];
      }
    }
  } else {
    // 如果没有小数部分则加上汉字 整
    moneyCNString += integerLastCN;
  }
  return moneyCNString;
}

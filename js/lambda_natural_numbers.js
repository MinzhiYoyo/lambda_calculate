/**
 * 实现 自然数 natural numbers 的功能
 */

// 0: \lambda s z . z
var Lambda_0 = 
	s => z =>
	z
;
// 1: \lambda s z . s z
var Lambda_1 = 
	s => z =>
	s(z)
;
// 2: \lambda s z . s (s z)
var Lambda_2 = 
	s => z =>
	s(s(z))
;

// 把自然数转换成 lambda 自然数
var intToLambdaInt = n =>{
	if(n == 0) return Lambda_0;
	else return s => z => s(intToLambdaInt(n-1)(s)(z));
}

// 打印将所有的 lambad 自然数转换成自然数
var toInt = n => n(m=>m+1)(0);
// function toint (n){
// 	var s = function(m){
// 		return m + 1;
// 	}
// 	var z = 0;
// 	return n(s)(z);
// }




// 自增函数 ++: \lambda a b c. b (a b c)
// 并且有 a Lambda_Succ b 即为 a + b，但这并不是逆波兰表达式，所以不能当作加法
var Lambda_Succ = 
	a => b => c =>
	b(a(b)(c))
;

// 自减函数 --: \lambda a b c. a b (a b c)
var Lambda_Pred = 
	a => b => c =>
	a(b)(a(b)(c))
;

// 加法函数 +: \lambda d a b c . d b (a b c)
var Lambda_Add = 
	d => a => b => c =>
	d(b)(a(b)(c))
;

// 乘法函数 *: \lambda a b c . a (b c)
var Lambda_Mul = 
	a => b => c =>
	a(b(c))
;

function test_nn(){
	// 简单测试两个自然数
	console.log("打印 0 1 2 的自然数: ");
	console.log("Lambda_0: " + toInt(Lambda_0));
	console.log("Lambda_1: " + toInt(Lambda_1));
	console.log("Lambda_2: " + toInt(Lambda_2));
	console.log("测试一下自然数转换成 lambda 自然数: ");
	console.log("intToLambdaInt(0): " + toInt(intToLambdaInt(0)));
	console.log("intToLambdaInt(10): " + toInt(intToLambdaInt(10)));
	console.log("intToLambdaInt(100): " + toInt(intToLambdaInt(100)));
}

function test_add_1(){
	// 测试自增函数，打印 [0, 100] 的自然数
	console.log("Lambda_Succ 作为自增函数的结果(计算 0-10): ");
	var nn = Lambda_0;
	for(var i = 0; i <= 10; i++){
		console.log("++" + toInt(nn) + "=" + toInt(Lambda_Succ(nn)));
		nn = Lambda_Succ(nn); // nn = ++nn;
	}
	console.log("Lambda_Succ 作为加法函数的结果(计算 1+2=3): " + 
		toInt(Lambda_1) + "+" +
		toInt(Lambda_2) + "=" +
		toInt( Lambda_1(Lambda_Succ)(Lambda_2)));
}

function test_add(){
	console.log("使用加法函数`Lambda_Add`打印加法口诀表:");
	console.log("即，0+0=0, 1+0=1,...,9+9=18");
	var result = "";
	for(var i = 0; i <= 9; ++i){
		var lambda_i = intToLambdaInt(i);
		for(var j = 0; j <= i; ++j){
			var lambda_j = intToLambdaInt(j);
			var lambda_sum = Lambda_Add(lambda_i)(lambda_j);
			// 不换行
			result = result +toInt(lambda_i) + "+" + toInt(lambda_j) + "=" + toInt(lambda_sum) + "\t";
			
		}
		result = result + "\n";
	}
	console.log(result);
}

function test_mul(){
	console.log("使用乘法函数`Lambda_Mul`打印乘法口诀表:");
	console.log("即，1*1=1, 2*1=2,...,9*9=81");
	var result = "";
	for(var i = 1; i <= 9; ++i){
		var lambda_i = intToLambdaInt(i);
		for(var j = 1; j <= i; ++j){
			var lambda_j = intToLambdaInt(j);
			var lambda_mul = Lambda_Mul(lambda_i)(lambda_j);
			// 不换行
			result = result +toInt(lambda_i) + "×" + toInt(lambda_j) + "=" + toInt(lambda_mul) + "\t";
			
		}
		result = result + "\n";
	}
	console.log(result);
}

var lambda__1 =
	s => z =>
	s(z)(s(z))
;

function main(){
	console.log("==========================");
	test_nn();
	console.log("==========================");
	test_add_1();
	console.log("==========================");
	test_add();
	console.log("==========================");
	test_mul();
	console.log("==========================");
	console.log("测试一下-1的定义");

	console.log("Lambda_-1: " + toInt(lambda__1));
	console.log("++Lambda_-1= " + toInt(Lambda_Succ(lambda__1)));
}

main();

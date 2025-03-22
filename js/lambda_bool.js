/**
 * 实现 逻辑值 bool 的功能
 */

// true: \lambda a b . a
var Lambda_True = 
	a => b =>
	a
;

// false: \lambda a b . b
var Lambda_False =
	a => b =>
	b
;

// if (a) b else c: \lambda a b c.a b c
var Lambda_If = 
	a => b => c =>
	a(b)(c)
;

// not !: \lambda a . a false true
var Lambda_Not = 
	a =>
	a(Lambda_False)(Lambda_True)
;

// and &&: \lambda a b . a b false
var Lambda_And = 
	a => b =>
	a(b)(Lambda_False)
;

// or ||: \lambda a b . a true b
var Lambda_Or = 
	a => b =>
	a(Lambda_True)(b)
;

// xor ^: \lambda a b . a (not b) b
var Lambda_Xor = 
	a => b =>
	a(Lambda_Not(b))(b)
;

// eq ==: \lambda a b . not(xor a b)
var Lambda_Eq = 
	a => b =>
	Lambda_Not(Lambda_Xor(a)(b))
;

// neq !=: \lambda a b . not(eq a b)
var Lambda_Neq = 
	a => b =>
	Lambda_Not(Lambda_Eq(a)(b))
;


// function toBool(lambda_bool){
// 	// return lambda_bool(true)(false);
// }
var toBool = lambda_bool => lambda_bool(true)(false);

function main(){
	// 测试 Lambda Bool 的实现
	console.log("Lambda True: " + toBool(Lambda_True));
	console.log("Lambda False: " + toBool(Lambda_False));
	
	// 打印所有的逻辑运算测试
	console.log("Lambda Not True: " + toBool(Lambda_Not(Lambda_True)));
	console.log("Lambda Not False: " + toBool(Lambda_Not(Lambda_False)));
	console.log("Lambda And True True: " + toBool(Lambda_And(Lambda_True)(Lambda_True)));
	console.log("Lambda And True False: " + toBool(Lambda_And(Lambda_True)(Lambda_False)));
	console.log("Lambda And False True: " + toBool(Lambda_And(Lambda_False)(Lambda_True)));
	console.log("Lambda And False False: " + toBool(Lambda_And(Lambda_False)(Lambda_False)));
	console.log("Lambda Or True True: " + toBool(Lambda_Or(Lambda_True)(Lambda_True)));
	console.log("Lambda Or True False: " + toBool(Lambda_Or(Lambda_True)(Lambda_False)));
	console.log("Lambda Or False True: " + toBool(Lambda_Or(Lambda_False)(Lambda_True)));
	console.log("Lambda Or False False: " + toBool(Lambda_Or(Lambda_False)(Lambda_False)));
	console.log("Lambda Xor True True: " + toBool(Lambda_Xor(Lambda_True)(Lambda_True)));
	console.log("Lambda Xor True False: " + toBool(Lambda_Xor(Lambda_True)(Lambda_False)));
	console.log("Lambda Xor False True: " + toBool(Lambda_Xor(Lambda_False)(Lambda_True)));
	console.log("Lambda Xor False False: " + toBool(Lambda_Xor(Lambda_False)(Lambda_False)));
	console.log("Lambda Eq True True: " + toBool(Lambda_Eq(Lambda_True)(Lambda_True)));
	console.log("Lambda Eq True False: " + toBool(Lambda_Eq(Lambda_True)(Lambda_False)));
	console.log("Lambda Eq False True: " + toBool(Lambda_Eq(Lambda_False)(Lambda_True)));
	console.log("Lambda Eq False False: " + toBool(Lambda_Eq(Lambda_False)(Lambda_False)));
	console.log("Lambda Neq True True: " + toBool(Lambda_Neq(Lambda_True)(Lambda_True)));
	console.log("Lambda Neq True False: " + toBool(Lambda_Neq(Lambda_True)(Lambda_False)));
	console.log("Lambda Neq False True: " + toBool(Lambda_Neq(Lambda_False)(Lambda_True)));
	console.log("Lambda Neq False False: " + toBool(Lambda_Neq(Lambda_False)(Lambda_False)));
}

main();

// 运行结果：
/**
Lambda True: true
Lambda False: false
Lambda Not True: false
Lambda Not False: true
Lambda And True True: true
Lambda And True False: false
Lambda And False True: false
Lambda And False False: false
Lambda Or True True: true
Lambda Or True False: true
Lambda Or False True: true
Lambda Or False False: false
Lambda Xor True True: false
Lambda Xor True False: true
Lambda Xor False True: true
Lambda Xor False False: false
Lambda Eq True True: true
Lambda Eq True False: false
Lambda Eq False True: false
Lambda Eq False False: true
Lambda Neq True True: false
Lambda Neq True False: true
Lambda Neq False True: true
Lambda Neq False False: false
*/

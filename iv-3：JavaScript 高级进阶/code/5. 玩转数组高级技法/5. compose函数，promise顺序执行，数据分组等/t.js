function login(...args...args): Promise<any>{

}
function getUserInfo(...args...args): Promise<any>{
}

function getOrders(...args):Promise<any> {

}

function async orders(loginData){
	const loginRes = await login(loginData);
  const userRes = await getUserInfo(loginRes);
  const orderRes = await getOrders(userRes)
}

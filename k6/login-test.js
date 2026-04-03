import http from 'k6/http'
import {check, sleep} from 'k6'

export const options = {
    vus: 5, 
    duration: '20s'
}
export default function () {
    //test login
    const loginRes = http.post('http://localhost:3000/api/v1/auth/login', JSON.stringify({
        email: '123@gmail.com',
        password: '12345678'
    }), {headers: {'Content-Type': 'application/json' } })
    check(loginRes, {'login successful': (r) => r.status === 200})

    const fetchMessages = http.get('http://localhost:3000/api/v1/chat/6933ee7d29d89224151b3ab3')
    check(fetchMessages, {'fetched message': (r) => r.status === 200})

    // const sendMessage = http.post('http://localhost:3000/api/v1/chat/sendMessage', JSON.stringify({
    //     content: 'hi',
    //     to: '6922c86a10a14adadbb2fb4d',
    //     from: '69ce7e10a0e23eca5e0a1506',
    //     isOnline: true

    // }), {headers: { 'Content-Type': 'application/json' }})
    // check(sendMessage, {'send messages': (r) => {
    //     if(r.status !== 200) console.log(r.body)
    //     return r.status === 200 
    // }})
    sleep(1);
}